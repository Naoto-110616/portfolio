"use client";

import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { useMemo, useState } from "react";

import { SectionTitle } from "@/components/ui/section-title";

const MAX_PROMPT_LENGTH = 500;

const defaultDescription =
	"プロフィール以外で私について知りたいことがあれば、こちらのAIに聞いてみてください。日々のメモや過去の仕事を学習しているので、技術的な質問から個人的な考え方まで、私の代わりにお答えします。";

const defaultHelperText =
	"AIが自動で回答するため、時々おかしなことを言うかもしれません。";

type ChatSectionProps = {
	title?: string;
	description?: string;
	helperText?: string;
	placeholder?: string;
};

export function ChatSection({
	title = "Pick My Brain!",
	description = defaultDescription,
	helperText = defaultHelperText,
	placeholder = "人生で一番好きな映画は？",
}: ChatSectionProps) {
	const [prompt, setPrompt] = useState("");
	const shouldReduceMotion = useReducedMotion();

	const remainingCount = useMemo(
		() => `${prompt.length}/${MAX_PROMPT_LENGTH}`,
		[prompt],
	);

	return (
		<motion.section
			id="chat"
			className="flex w-full flex-col gap-block md:gap-block-xl"
			initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
			whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
			viewport={{ amount: 0.2, once: true }}
			transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
		>
			<div className="flex flex-col gap-block">
				<SectionTitle
					title={title}
					titleClassName="md:text-section-lg md:font-black"
				/>
				<p className="text-caption leading-normal text-foreground md:text-section md:font-bold md:leading-[1.4]">
					{description}
				</p>
			</div>

			<div className="flex flex-col gap-1 md:gap-2">
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
						className="w-full bg-transparent text-caption-sm leading-none text-primary outline-none placeholder:text-caption-sm placeholder:text-primary md:text-body md:leading-normal md:placeholder:text-body"
						maxLength={MAX_PROMPT_LENGTH}
						placeholder={placeholder}
						type="text"
						value={prompt}
						onChange={(event) => setPrompt(event.target.value)}
					/>

					<motion.button
						aria-label="Send question"
						className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary text-accent transition-opacity hover:opacity-80 md:size-[30px] md:rounded-[16px]"
						type="button"
						whileHover={shouldReduceMotion ? undefined : { scale: 1.06 }}
						whileTap={shouldReduceMotion ? undefined : { scale: 0.94 }}
					>
						<ArrowRight
							aria-hidden="true"
							className="size-4 md:size-6"
							strokeWidth={2}
						/>
					</motion.button>
				</motion.div>

				<div className="grid grid-cols-8 justify-between text-caption-sm leading-none text-primary md:text-caption">
					<p className="col-span-6 md:max-w-[512px]">{helperText}</p>
					<span className="col-span-1" />
					<p className="col-span-1">{remainingCount}</p>
				</div>
			</div>
		</motion.section>
	);
}
