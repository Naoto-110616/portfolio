"use client";

import { useQuery } from "@tanstack/react-query";
import { ArrowRight, Check, ChevronDown } from "lucide-react";
import { ChangeEvent, type FormEventHandler, ReactNode, useMemo, useState } from "react";

import { AnimatedSectionTitle } from "@/components/motion/animated-section-title";
import { SectionReveal } from "@/components/motion/section-reveal";
import { HomeMainInner } from "@/components/ui/home-main-inner";
import { RollingText } from "@/components/ui/rolling-text";
import { contactSchema, type ContactFormValues } from "@/lib/contact/schema";
import { fallbackContactFormSettings } from "@/lib/contentful/fallbacks";
import type { ContactFormSettings } from "@/lib/contentful/types";

type ContactFormState = Omit<ContactFormValues, "topic"> & {
	topic: ContactFormValues["topic"] | "";
};

const initialValues: ContactFormState = {
	name: "",
	topic: "",
	contact: "",
};

type FieldErrors = Partial<Record<keyof ContactFormValues, string>>;

type ContactFieldProps = {
	label: string;
	error?: string;
	children: ReactNode;
};

function FieldErrorMessage({ error, className = "" }: { error?: string; className?: string }) {
	return (
		<span
			aria-live="polite"
			className={`text-caption text-primary mt-2 min-h-6 leading-tight md:mt-0 md:min-h-0 ${className}`.trim()}
		>
			{error ?? "\u00A0"}
		</span>
	);
}

function ContactField({ label, error, children }: ContactFieldProps) {
	return (
		<label className="flex w-full flex-col md:gap-4">
			<span className="text-heading text-foreground md:text-[72px] md:leading-none md:font-bold">
				{label}
			</span>
			<div className="after:bg-primary hover:before:bg-primary focus-within:before:bg-foreground relative before:pointer-events-none before:absolute before:inset-x-0 before:bottom-0 before:h-0.5 before:bg-transparent before:transition-colors before:content-[''] after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-px after:content-[''] focus-within:after:opacity-0 hover:after:opacity-0">
				{children}
			</div>
			<FieldErrorMessage error={error} />
		</label>
	);
}

async function fetchContactFormSettings() {
	const response = await fetch("/api/contentful/contact-form-settings");

	if (!response.ok) {
		throw new Error("Failed to load contact form settings.");
	}

	return (await response.json()) as ContactFormSettings;
}

export function ContactSection() {
	const [values, setValues] = useState<ContactFormState>(initialValues);
	const [errors, setErrors] = useState<FieldErrors>({});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [isSubmitHovered, setIsSubmitHovered] = useState(false);
	const [isSubmitSuccess, setIsSubmitSuccess] = useState(false);
	const { data: contactFormSettings = fallbackContactFormSettings } = useQuery({
		queryKey: ["contentful", "contact-form-settings"],
		queryFn: fetchContactFormSettings,
		placeholderData: fallbackContactFormSettings,
	});

	const fields = useMemo(
		() =>
			[
				{
					key: "name",
					label: "My name is",
					placeholder: "Your name",
					type: "text",
				},
				{
					key: "contact",
					label: "My contact",
					placeholder: "Comfort way to contact you",
					type: "text",
				},
			] as const,
		[],
	);
	const [nameField, contactField] = fields;

	function handleChange(event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
		const { name, value } = event.target;
		setIsSubmitSuccess(false);

		setValues((current) => ({
			...current,
			[name]: value,
		}));
	}

	const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
		event.preventDefault();
		setIsSubmitSuccess(false);

		const parsed = contactSchema.safeParse(values);

		if (!parsed.success) {
			const fieldErrors = parsed.error.flatten().fieldErrors;

			setErrors({
				name: fieldErrors.name?.[0],
				topic: fieldErrors.topic?.[0],
				contact: fieldErrors.contact?.[0],
			});
			return;
		}

		setErrors({});
		setIsSubmitting(true);

		try {
			const response = await fetch("/api/contact", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(parsed.data),
			});
			const data = (await response.json()) as { message?: string };

			if (!response.ok) {
				throw new Error(data.message ?? "送信に失敗しました。");
			}

			setIsSubmitSuccess(true);
			setValues(initialValues);
		} catch (error) {
			setIsSubmitSuccess(false);
			console.error(error instanceof Error ? error.message : "送信に失敗しました。");
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<section id="contact" className="w-full">
			<HomeMainInner className="gap-block flex flex-col md:gap-[120px]">
				<AnimatedSectionTitle title="Contact" titleClassName="md:text-section-lg md:font-black" />

				<SectionReveal className="flex flex-col gap-6" y={24}>
					<form
						className="flex flex-col gap-10 md:grid md:grid-cols-2 md:gap-y-[120px]"
						onSubmit={handleSubmit}
					>
						<div className="md:col-start-2 md:row-start-1 md:w-[384px] md:justify-self-end">
							<ContactField error={errors[nameField.key]} label={nameField.label}>
								<input
									className="text-body text-primary placeholder:text-primary md:text-heading block w-full bg-transparent py-2 pr-8 transition-all duration-300 outline-none"
									name={nameField.key}
									type={nameField.type}
									value={values[nameField.key]}
									onChange={handleChange}
									placeholder={nameField.placeholder}
								/>
							</ContactField>
						</div>

						<div className="md:col-start-1 md:row-start-2 md:w-[512px]">
							<ContactField error={errors.topic} label="Let's talk about">
								<div className="relative">
									<select
										className={[
											"text-body block w-full appearance-none bg-transparent py-2 pr-8 font-normal transition-all duration-300 outline-none",
											"text-primary",
										].join(" ")}
										name="topic"
										value={values.topic}
										onChange={handleChange}
									>
										<option value="">Select</option>
										{contactFormSettings.topicOptions.map((option) => (
											<option key={option} value={option}>
												{option}
											</option>
										))}
									</select>
									<ChevronDown
										aria-hidden="true"
										className="text-primary pointer-events-none absolute top-1/2 right-0 size-5 -translate-y-1/2 md:size-6"
										strokeWidth={1.75}
									/>
								</div>
							</ContactField>
						</div>

						<div className="flex flex-col gap-12 md:col-start-2 md:row-start-3 md:grid md:w-[512px] md:grid-cols-[384px_minmax(0,1fr)] md:grid-rows-[auto_auto] md:gap-6 md:gap-x-0 md:gap-y-3 md:justify-self-end">
							<div className="flex flex-col gap-0 md:contents">
								<label className="flex w-full flex-col md:col-start-1 md:row-start-1 md:gap-4">
									<span className="text-heading text-foreground md:text-[72px] md:leading-none md:font-bold">
										{contactField.label}
									</span>
									<div className="after:bg-primary hover:before:bg-primary focus-within:before:bg-foreground relative before:pointer-events-none before:absolute before:inset-x-0 before:bottom-0 before:h-0.5 before:bg-transparent before:transition-colors before:content-[''] after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-px after:content-[''] focus-within:after:opacity-0 hover:after:opacity-0">
										<input
											className="text-body text-primary placeholder:text-primary md:text-heading block w-full bg-transparent py-2 pr-8 outline-none"
											name={contactField.key}
											type={contactField.type}
											value={values[contactField.key]}
											onChange={handleChange}
											placeholder={contactField.placeholder}
										/>
									</div>
								</label>

								<FieldErrorMessage
									className="md:col-start-1 md:row-start-2"
									error={errors[contactField.key]}
								/>
							</div>

							<div className="flex flex-col gap-4 md:col-start-2 md:row-start-1 md:min-w-0 md:gap-3 md:self-end">
								<button
									className={[
										"group border-primary bg-accent text-body text-primary md:text-heading inline-flex h-10 cursor-pointer items-center overflow-hidden border transition-[width,border-radius,padding,opacity,transform] duration-300 ease-out hover:opacity-80 disabled:cursor-not-allowed md:h-10 md:leading-none",
										isSubmitSuccess
											? "w-10 justify-center rounded-full px-0 md:w-10"
											: "w-fit gap-2 rounded-[22px] px-4 py-1.5 md:w-full md:justify-between md:px-6 md:py-2",
									].join(" ")}
									type="submit"
									disabled={isSubmitting || isSubmitSuccess}
									onMouseEnter={() => setIsSubmitHovered(true)}
									onMouseLeave={() => setIsSubmitHovered(false)}
									onFocus={() => setIsSubmitHovered(true)}
									onBlur={() => setIsSubmitHovered(false)}
								>
									{isSubmitSuccess ? (
										<Check
											aria-hidden="true"
											className="size-4 transition-all duration-300 ease-out md:size-6"
											strokeWidth={1.75}
										/>
									) : (
										<>
											<RollingText
												text={isSubmitting ? "Sending..." : "Submit"}
												isActive={isSubmitHovered}
												className="font-medium"
											/>
											<ArrowRight
												aria-hidden="true"
												className="size-4 transition-transform duration-500 md:size-6"
												strokeWidth={1.75}
											/>
										</>
									)}
								</button>
							</div>
						</div>
					</form>
				</SectionReveal>
			</HomeMainInner>
		</section>
	);
}
