"use client";

import { ArrowRight, Loader2 } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { useEffect, useMemo, useRef, useState, type SubmitEvent } from "react";

import { HomeMainInner } from "@/components/ui/home-main-inner";
import { SectionTitle } from "@/components/ui/section-title";
import { useDesktopMotion } from "@/hooks/use-desktop-motion";
import { stripMarkdownDecorations } from "@/lib/chat/format-reply";
import { getRandomChatUnavailableReply } from "@/lib/chat/unavailable-replies";

const MAX_PROMPT_LENGTH = 500;

const defaultDescription =
	"プロフィール以外で私について知りたいことがあれば、こちらのAIに聞いてみてください。日々のメモや過去の仕事を学習しているので、技術的な質問から個人的な考え方まで、私の代わりにお答えします。";

const defaultHelperText = "AIが自動で回答するため、時々おかしなことを言うかもしれません。";

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
	const [isLoading, setIsLoading] = useState(false);
	const shouldReduceMotion = useReducedMotion();
	const isDesktop = useDesktopMotion();
	const allowUiMotion = isDesktop && !shouldReduceMotion;
	const chatLogRef = useRef<HTMLDivElement | null>(null);

	const remainingCount = useMemo(() => `${prompt.length}/${MAX_PROMPT_LENGTH}`, [prompt]);

	const showChatLog = messages.length > 0 || isLoading;

	useEffect(() => {
		const chatLog = chatLogRef.current;
		if (!chatLog || !showChatLog) {
			return;
		}

		chatLog.scrollTo({
			top: chatLog.scrollHeight,
			behavior: allowUiMotion ? "smooth" : "auto",
		});
	}, [allowUiMotion, messages, isLoading, showChatLog]);

	async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
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

		setPrompt("");
		setMessages((prev) => [...prev, userMessage]);
		setIsLoading(true);

		const pushUnavailableAssistant = () => {
			setMessages((prev) => [
				...prev,
				{
					id: crypto.randomUUID(),
					role: "assistant",
					content: getRandomChatUnavailableReply(),
				},
			]);
		};

		try {
			const response = await fetch("/api/chat", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ message: trimmed }),
			});

			const data: unknown = await response.json();

			if (!response.ok) {
				pushUnavailableAssistant();
				return;
			}

			if (
				typeof data === "object" &&
				data !== null &&
				"reply" in data &&
				typeof (data as { reply: unknown }).reply === "string"
			) {
				const raw = stripMarkdownDecorations((data as { reply: string }).reply);
				if (!raw.trim()) {
					pushUnavailableAssistant();
					return;
				}
				const assistantMessage: ChatMessage = {
					id: crypto.randomUUID(),
					role: "assistant",
					content: raw,
				};
				setMessages((prev) => [...prev, assistantMessage]);
			} else {
				pushUnavailableAssistant();
			}
		} catch {
			pushUnavailableAssistant();
		} finally {
			setIsLoading(false);
		}
	}

	return (
		<motion.section
			id="chat"
			className="w-full"
			initial={allowUiMotion ? { opacity: 0, y: 24 } : false}
			whileInView={allowUiMotion ? { opacity: 1, y: 0 } : undefined}
			viewport={{ amount: 0.2, once: true }}
			transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
		>
			<HomeMainInner className="gap-block md:gap-block-xl flex flex-col">
				<div className="gap-block flex flex-col">
					<SectionTitle title={title} titleClassName="md:text-section-lg md:font-black" />
					<p className="text-caption text-foreground md:text-section leading-normal md:leading-[1.4] md:font-bold">
						{description}
					</p>
				</div>

				<div className="gap-block md:gap-block-md flex min-h-0 flex-col">
					{showChatLog ? (
						<div
							aria-label="チャット履歴"
							data-lenis-prevent
							data-lenis-prevent-touch
							data-lenis-prevent-wheel
							ref={chatLogRef}
							className="max-h-[min(500px,70vh)] min-h-[200px] w-full touch-pan-y overflow-x-hidden overflow-y-auto overscroll-y-contain shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] md:max-h-[min(560px,65vh)]"
							role="log"
						>
							<div className="flex flex-col gap-3 md:gap-4">
								{messages.map((message) =>
									message.role === "user" ? (
										<div
											key={message.id}
											className="ml-auto flex max-w-[min(85%,420px)] flex-col items-end"
										>
											<div className="border-accent text-caption text-foreground md:text-body rounded-2xl rounded-br-sm border-2 bg-white px-4 py-3 leading-relaxed shadow-sm md:rounded-[20px] md:rounded-br-md md:px-5 md:py-3.5 md:leading-relaxed">
												<p className="whitespace-pre-wrap">{message.content}</p>
											</div>
										</div>
									) : (
										<div
											key={message.id}
											className="mr-auto flex max-w-[min(85%,520px)] flex-col items-start"
										>
											<div className="bg-accent text-caption text-primary md:text-body rounded-2xl rounded-bl-sm px-4 py-3 leading-relaxed shadow-sm md:rounded-[20px] md:rounded-bl-md md:px-5 md:py-3.5 md:leading-relaxed">
												<p className="whitespace-pre-wrap">{message.content}</p>
											</div>
										</div>
									),
								)}

								{isLoading ? (
									<div
										className="bg-accent text-primary mr-auto flex max-w-[min(85%,520px)] rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm md:rounded-[20px] md:rounded-bl-md md:px-5 md:py-3.5"
										role="status"
										aria-live="polite"
									>
										<p className="text-caption md:text-body leading-relaxed md:leading-relaxed">
											...
										</p>
									</div>
								) : null}
							</div>
						</div>
					) : null}

					<form className="flex flex-col gap-1 md:gap-2" noValidate onSubmit={handleSubmit}>
						<label className="sr-only" htmlFor="chat-prompt">
							Ask AI about Naoto
						</label>

						<motion.div
							className="border-primary bg-accent flex items-center gap-3 overflow-hidden rounded-[25px] border-2 px-4 py-3 md:rounded-[30px] md:px-5 md:py-4"
							transition={{ duration: 0.2 }}
							whileHover={allowUiMotion ? { y: -2 } : undefined}
						>
							<input
								id="chat-prompt"
								autoComplete="off"
								className="text-caption-sm text-primary placeholder:text-caption-sm placeholder:text-primary md:text-body md:placeholder:text-body w-full bg-transparent leading-none outline-none disabled:opacity-60 md:leading-normal"
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
								className="bg-primary text-accent flex size-6 shrink-0 items-center justify-center rounded-full transition-opacity hover:opacity-80 disabled:pointer-events-none disabled:opacity-50 md:size-[30px] md:rounded-[16px]"
								disabled={isLoading || prompt.trim().length === 0}
								type="submit"
								whileHover={allowUiMotion && !isLoading ? { scale: 1.06 } : undefined}
								whileTap={allowUiMotion && !isLoading ? { scale: 0.94 } : undefined}
							>
								{isLoading ? (
									<Loader2
										aria-hidden="true"
										className="size-4 md:size-6 md:animate-spin"
										strokeWidth={2}
									/>
								) : (
									<ArrowRight aria-hidden="true" className="size-4 md:size-6" strokeWidth={2} />
								)}
							</motion.button>
						</motion.div>

						<div className="text-caption-sm text-primary md:text-caption flex flex-wrap items-start justify-between gap-x-4 gap-y-1 leading-none">
							<p className="min-w-0 flex-1 md:max-w-[512px]">{helperText}</p>
							<p className="shrink-0 tabular-nums">{remainingCount}</p>
						</div>
					</form>
				</div>
			</HomeMainInner>
		</motion.section>
	);
}
