"use client";

import { ArrowRight, Loader2 } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { useEffect, useMemo, useRef, useState } from "react";

import { HomeMainInner } from "@/components/ui/home-main-inner";
import { SectionTitle } from "@/components/ui/section-title";
import { stripMarkdownDecorations } from "@/lib/chat/format-reply";

const MAX_PROMPT_LENGTH = 500;

const defaultDescription =
	"プロフィール以外で私について知りたいことがあれば、こちらのAIに聞いてみてください。日々のメモや過去の仕事を学習しているので、技術的な質問から個人的な考え方まで、私の代わりにお答えします。";

const defaultHelperText =
	"AIが自動で回答するため、時々おかしなことを言うかもしれません。";

type ChatMessage = {
	id: string;
	role: "user" | "assistant";
	content: string;
};

type ChatSectionProps = {
	title?: string;
	description?: string;
	helperText?: string;
	placeholder?: string;
};

export function ChatSection({
	title = "Pick my brain!",
	description = defaultDescription,
	helperText = defaultHelperText,
	placeholder = "人生で一番好きな映画は？",
}: ChatSectionProps) {
	const [prompt, setPrompt] = useState("");
	const [messages, setMessages] = useState<ChatMessage[]>([]);
	const [error, setError] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const shouldReduceMotion = useReducedMotion();
	const scrollEndRef = useRef<HTMLDivElement>(null);

	const remainingCount = useMemo(
		() => `${prompt.length}/${MAX_PROMPT_LENGTH}`,
		[prompt],
	);

	const showChatLog = messages.length > 0 || isLoading;

	useEffect(() => {
		const el = scrollEndRef.current;
		if (!el) {
			return;
		}
		el.scrollIntoView({
			behavior: shouldReduceMotion ? "auto" : "smooth",
			block: "end",
		});
	}, [messages, isLoading, shouldReduceMotion]);

	async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		const trimmed = prompt.trim();
		if (!trimmed || isLoading) {
			return;
		}

		const userMessage: ChatMessage = {
			id: crypto.randomUUID(),
			role: "user",
			content: trimmed,
		};

		setError(null);
		setPrompt("");
		setMessages((prev) => [...prev, userMessage]);
		setIsLoading(true);

		try {
			const response = await fetch("/api/chat", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ message: trimmed }),
			});

			const data: unknown = await response.json();

			if (!response.ok) {
				const message =
					typeof data === "object" &&
					data !== null &&
					"message" in data &&
					typeof (data as { message: unknown }).message === "string"
						? (data as { message: string }).message
						: "回答を取得できませんでした。";
				setError(message);
				return;
			}

			if (
				typeof data === "object" &&
				data !== null &&
				"reply" in data &&
				typeof (data as { reply: unknown }).reply === "string"
			) {
				const assistantMessage: ChatMessage = {
					id: crypto.randomUUID(),
					role: "assistant",
					content: stripMarkdownDecorations((data as { reply: string }).reply),
				};
				setMessages((prev) => [...prev, assistantMessage]);
			} else {
				setError("回答の形式が正しくありませんでした。");
			}
		} catch {
			setError("通信に失敗しました。ネットワークを確認してください。");
		} finally {
			setIsLoading(false);
		}
	}

	return (
		<motion.section
			id="chat"
			className="w-full"
			initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
			whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
			viewport={{ amount: 0.2, once: true }}
			transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
		>
			<HomeMainInner className="flex flex-col gap-block md:gap-block-xl">
				<div className="flex flex-col gap-block">
					<SectionTitle
						title={title}
						titleClassName="md:text-section-lg md:font-black"
					/>
					<p className="text-caption leading-normal text-foreground md:text-section md:font-bold md:leading-[1.4]">
						{description}
					</p>
				</div>

				<div className="flex flex-col gap-block md:gap-block-md">
					{showChatLog ? (
						<div
							aria-label="チャット履歴"
							className="flex max-h-[min(500px,70vh)] min-h-[200px] flex-col gap-3 overflow-y-auto overscroll-y-contain rounded-[20px] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] md:max-h-[min(560px,65vh)] md:gap-4"
							role="log"
						>
							{messages.map((message) =>
								message.role === "user" ? (
									<div
										key={message.id}
										className="ml-auto flex max-w-[min(85%,420px)] flex-col items-end"
									>
										<div className="rounded-2xl rounded-br-sm border-2 border-accent bg-white px-4 py-3 text-caption leading-relaxed text-foreground shadow-sm md:rounded-[20px] md:rounded-br-md md:px-5 md:py-3.5 md:text-body md:leading-relaxed">
											<p className="whitespace-pre-wrap">{message.content}</p>
										</div>
									</div>
								) : (
									<div
										key={message.id}
										className="mr-auto flex max-w-[min(85%,520px)] flex-col items-start"
									>
										<div className="rounded-2xl rounded-bl-sm bg-accent px-4 py-3 text-caption leading-relaxed text-primary shadow-sm md:rounded-[20px] md:rounded-bl-md md:px-5 md:py-3.5 md:text-body md:leading-relaxed">
											<p className="whitespace-pre-wrap">{message.content}</p>
										</div>
									</div>
								),
							)}

							{isLoading ? (
								<div className="mr-auto flex max-w-[min(85%,520px)] items-center gap-2 rounded-2xl rounded-bl-sm bg-accent px-4 py-3 text-primary shadow-sm md:rounded-[20px] md:rounded-bl-md md:px-5 md:py-3.5">
									<Loader2
										aria-hidden="true"
										className="size-5 shrink-0 animate-spin"
										strokeWidth={2}
									/>
									<span className="text-caption md:text-body">…</span>
								</div>
							) : null}

							<div
								ref={scrollEndRef}
								aria-hidden="true"
								className="h-px w-full shrink-0"
							/>
						</div>
					) : null}

					<form
						className="flex flex-col gap-1 md:gap-2"
						noValidate
						onSubmit={handleSubmit}
					>
						<label className="sr-only" htmlFor="chat-prompt">
							Ask AI about Naoto
						</label>

						<motion.div
							className="flex items-center gap-3 overflow-hidden rounded-[25px] border-2 border-primary bg-accent px-4 py-3 md:rounded-[30px] md:px-5 md:py-4"
							transition={{ duration: 0.2 }}
							whileHover={shouldReduceMotion ? undefined : { y: -2 }}
						>
							<input
								id="chat-prompt"
								autoComplete="off"
								className="w-full bg-transparent text-caption-sm leading-none text-primary outline-none placeholder:text-caption-sm placeholder:text-primary disabled:opacity-60 md:text-body md:leading-normal md:placeholder:text-body"
								disabled={isLoading}
								maxLength={MAX_PROMPT_LENGTH}
								placeholder={placeholder}
								type="text"
								value={prompt}
								onChange={(event) => setPrompt(event.target.value)}
							/>

							<motion.button
								aria-busy={isLoading}
								aria-label="Send question"
								className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary text-accent transition-opacity hover:opacity-80 disabled:pointer-events-none disabled:opacity-50 md:size-[30px] md:rounded-[16px]"
								disabled={isLoading || prompt.trim().length === 0}
								type="submit"
								whileHover={
									shouldReduceMotion || isLoading ? undefined : { scale: 1.06 }
								}
								whileTap={
									shouldReduceMotion || isLoading ? undefined : { scale: 0.94 }
								}
							>
								{isLoading ? (
									<Loader2
										aria-hidden="true"
										className="size-4 animate-spin md:size-6"
										strokeWidth={2}
									/>
								) : (
									<ArrowRight
										aria-hidden="true"
										className="size-4 md:size-6"
										strokeWidth={2}
									/>
								)}
							</motion.button>
						</motion.div>

						<div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-1 text-caption-sm leading-none text-primary md:text-caption">
							<p className="min-w-0 flex-1 md:max-w-[512px]">{helperText}</p>
							<p className="shrink-0 tabular-nums">{remainingCount}</p>
						</div>

						{error ? (
							<p
								className="rounded-[16px] border border-red-500/35 bg-red-500/10 px-4 py-3 text-caption leading-normal text-red-900 md:text-body"
								role="alert"
							>
								{error}
							</p>
						) : null}
					</form>
				</div>
			</HomeMainInner>
		</motion.section>
	);
}
