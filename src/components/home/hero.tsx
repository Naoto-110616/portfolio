"use client";

import gsap from "gsap";
import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

import { NAME, NAME_JA } from "@/constans/const";
import { Frame } from "@/components/ui/frame";
import { HashLink } from "@/components/ui/hash-link";
import { RollingText } from "@/components/ui/rolling-text";

export type HeroItem = {
	label: string;
	value: string;
	isHighlighted?: boolean;
};

type HeroSectionProps = {
	items?: HeroItem[];
	introComplete?: boolean;
	onIntroComplete?: () => void;
};

const defaultItems: HeroItem[] = [
	{ label: "Name:", value: NAME },
	{ label: "Title:", value: "Frontend Engineer" },
	{ label: "Dislikes:", value: "Work", isHighlighted: true },
];

const LABEL_REVEAL_DURATION = 0.45;
const ROW_GAP_DURATION = 0.2;
const CARET_BLINK_COUNT = 3;
const CARET_BLINK_STEP_DURATION = 0.5;
const HIGHLIGHT_REVEAL_DURATION = 0.7;
const HIGHLIGHT_REVEAL_OFFSET = 1;
const HIGHLIGHT_LOOP_HOLD_DURATION = 2.4;
const HIGHLIGHT_COLLAPSE_DURATION = 1.2;
const HIGHLIGHT_ZERO_HOLD_DURATION = 0.2;
const HIGHLIGHT_BOUNCE_DURATION = 2;
const TYPING_FRAME_DURATION = 0.06;
const FRONTEND_TYPING_CORRECTION_HOLD_DURATION = 0.3;
const FRONTEND_TYPING_CORRECTION_BLINK_COUNT = 1;
const FRONTEND_TYPING_DELETE_FRAME_DURATION = 0.4;
const SCRAMBLE_CHARACTERS = `普段からメイクしない君が 薄化粧した朝
始まりと終わりの狭間で
忘れぬ約束した

花束を君に贈ろう
愛おしい人 愛おしい人
どんな言葉並べても
真実にはならないから
今日は贈ろう 涙色の花束を君に

毎日の 人知れぬ苦労や淋しみも無く ただ
楽しいこと ばかりだったら
愛なんて 知らずに済んだのにな

花束を君に贈ろう
言いたいこと 言いたいこと
きっと山ほどあるけど
神様しか知らないまま
今日は贈ろう 涙色の花束を君に

両手でも抱えきれない
眩い風景の数々を ありがとう

世界中が雨の日も
君の笑顔が僕の太陽だったよ
今は伝わらなくても
真実には変わりないさ
抱きしめてよ たった一度 さよならの前に
You might also like
COLORS (2024 Mix)
宇多田ヒカル (Hikaru Utada)
Prisoner of Love (2024 Mix)
宇多田ヒカル (Hikaru Utada)
光 (Hikari) (Re-Recording)
宇多田ヒカル (Hikaru Utada)
花束を君に贈ろう
愛おしい人 愛おしい人
どんな言葉並べても
君を讃えるには 足りないから
今日は贈ろう 涙色の花束を君に

君に 君に
君に 君に
君に 君に
君に 君に`;
const SCRAMBLE_DURATION = 0.8;
type TypingPhase = {
	text: string;
	holdDuration?: number;
	blinkCaretCountAfter?: number;
	deleteFrameDuration?: number;
};

type TypingStep = {
	text: string;
	duration: number;
	caretVisible: boolean;
};

const SPECIAL_TYPING_PHASES: Record<string, TypingPhase[]> = {
	"Frontend Engineer": [
		{
			text: "Frontend Enginner",
			blinkCaretCountAfter: FRONTEND_TYPING_CORRECTION_BLINK_COUNT,
			holdDuration: FRONTEND_TYPING_CORRECTION_HOLD_DURATION,
		},
		{
			text: "Frontend Engin",
			deleteFrameDuration: FRONTEND_TYPING_DELETE_FRAME_DURATION,
		},
		{ text: "Frontend Engineer" },
	],
};
const localizedHeroValues: Record<string, string> = {
	[NAME]: NAME_JA,
	"Frontend Engineer": "フロントエンドエンジニア",
	Work: "仕事",
};

function shouldBlinkCaretBeforeTyping(value: string) {
	return value === NAME;
}

function getTypingPhases(value: string) {
	return SPECIAL_TYPING_PHASES[value] ?? [{ text: value }];
}

function buildTypingSteps(phases: TypingPhase[]) {
	const steps: TypingStep[] = [];
	let currentValue = "";
	const pushStep = (text: string, duration = TYPING_FRAME_DURATION, caretVisible = true) => {
		steps.push({
			text,
			duration,
			caretVisible,
		});
	};

	for (const phase of phases) {
		const nextValue = phase.text;

		if (nextValue === currentValue) {
			continue;
		}

		if (nextValue.startsWith(currentValue)) {
			for (let length = currentValue.length + 1; length <= nextValue.length; length += 1) {
				pushStep(nextValue.slice(0, length));
			}
		} else if (currentValue.startsWith(nextValue)) {
			for (let length = currentValue.length - 1; length >= nextValue.length; length -= 1) {
				pushStep(currentValue.slice(0, length), phase.deleteFrameDuration ?? TYPING_FRAME_DURATION);
			}
		} else {
			let sharedPrefixLength = 0;

			while (
				sharedPrefixLength < currentValue.length &&
				sharedPrefixLength < nextValue.length &&
				currentValue[sharedPrefixLength] === nextValue[sharedPrefixLength]
			) {
				sharedPrefixLength += 1;
			}

			for (let length = currentValue.length - 1; length >= sharedPrefixLength; length -= 1) {
				pushStep(currentValue.slice(0, length), phase.deleteFrameDuration ?? TYPING_FRAME_DURATION);
			}

			for (let length = sharedPrefixLength + 1; length <= nextValue.length; length += 1) {
				pushStep(nextValue.slice(0, length));
			}
		}

		currentValue = nextValue;

		for (let blinkIndex = 0; blinkIndex < (phase.blinkCaretCountAfter ?? 0); blinkIndex += 1) {
			pushStep(nextValue, CARET_BLINK_STEP_DURATION, false);
			pushStep(nextValue, CARET_BLINK_STEP_DURATION, true);
		}

		if ((phase.holdDuration ?? 0) > 0) {
			pushStep(nextValue, phase.holdDuration, true);
		}
	}

	return steps.length > 0
		? steps
		: [
				{
					text: phases.at(-1)?.text ?? "",
					duration: TYPING_FRAME_DURATION,
					caretVisible: true,
				},
			];
}

function getTypingDuration(value: string) {
	const blinkLeadDuration = shouldBlinkCaretBeforeTyping(value)
		? CARET_BLINK_COUNT * CARET_BLINK_STEP_DURATION * 2
		: 0;
	const steps = buildTypingSteps(getTypingPhases(value));

	return (
		blinkLeadDuration +
		Math.max(
			steps.reduce((total, step) => total + step.duration, 0),
			0.5,
		)
	);
}

function getHeroRowTimings(items: HeroItem[]) {
	let currentDelay = 0.5;

	return items.map((item) => {
		const labelDelay = currentDelay;
		const valueDelay = labelDelay + LABEL_REVEAL_DURATION;
		const valueDuration = getTypingDuration(item.value);

		currentDelay = valueDelay + valueDuration + ROW_GAP_DURATION;

		return {
			labelDelay,
			valueDelay,
			valueDuration,
			highlightDelay: valueDelay + valueDuration + HIGHLIGHT_REVEAL_OFFSET,
		};
	});
}

function getLocalizedHeroValue(value: string, isSwitchedOn: boolean) {
	if (!isSwitchedOn) {
		return value;
	}

	return localizedHeroValues[value] ?? value;
}

function getScrambleCharacter() {
	return SCRAMBLE_CHARACTERS[Math.floor(Math.random() * SCRAMBLE_CHARACTERS.length)];
}

function TypingText({
	value,
	delay = 0,
	className = "",
	shouldBlinkBeforeTyping = false,
	animateOnValueChange = true,
	scrambleOnValueChange = false,
	onScrambleStateChange,
}: {
	value: string;
	delay?: number;
	className?: string;
	shouldBlinkBeforeTyping?: boolean;
	animateOnValueChange?: boolean;
	scrambleOnValueChange?: boolean;
	onScrambleStateChange?: (isScrambling: boolean) => void;
}) {
	const shouldReduceMotion = useReducedMotion();
	const [displayedText, setDisplayedText] = useState(shouldReduceMotion ? value : "");
	const [isCaretVisible, setIsCaretVisible] = useState(false);
	const [hasAnimatedOnce, setHasAnimatedOnce] = useState(false);
	const [scrambledValue, setScrambledValue] = useState(value);
	const [isScrambling, setIsScrambling] = useState(false);
	const previousValueRef = useRef(value);

	useEffect(() => {
		if (shouldReduceMotion) {
			return;
		}

		if (hasAnimatedOnce && !animateOnValueChange) {
			return;
		}

		const steps = buildTypingSteps(getTypingPhases(value));
		const timeline = gsap.timeline({
			delay,
			onStart: () => {
				setDisplayedText("");
				setIsCaretVisible(shouldBlinkBeforeTyping);
			},
		});

		if (shouldBlinkBeforeTyping) {
			for (let blinkIndex = 0; blinkIndex < CARET_BLINK_COUNT; blinkIndex += 1) {
				timeline.to(
					{},
					{
						duration: CARET_BLINK_STEP_DURATION,
						onStart: () => {
							setIsCaretVisible(false);
						},
					},
				);
				timeline.to(
					{},
					{
						duration: CARET_BLINK_STEP_DURATION,
						onStart: () => {
							setIsCaretVisible(true);
						},
					},
				);
			}
		}

		for (const step of steps) {
			timeline.to(
				{},
				{
					duration: step.duration,
					onStart: () => {
						setDisplayedText(step.text);
						setIsCaretVisible(step.caretVisible);
					},
				},
			);
		}

		timeline.call(() => {
			setDisplayedText(value);
			setHasAnimatedOnce(true);
			setIsCaretVisible(false);
		});

		return () => {
			timeline.kill();
		};
	}, [
		animateOnValueChange,
		delay,
		hasAnimatedOnce,
		shouldBlinkBeforeTyping,
		shouldReduceMotion,
		value,
	]);

	useEffect(() => {
		if (
			shouldReduceMotion ||
			!hasAnimatedOnce ||
			animateOnValueChange ||
			!scrambleOnValueChange ||
			previousValueRef.current === value
		) {
			previousValueRef.current = value;
			onScrambleStateChange?.(false);
			return;
		}

		const previousValue = previousValueRef.current;
		const maxLength = Math.max(previousValue.length, value.length, 1);
		const progress = { revealedCount: 0 };

		const tween = gsap.to(progress, {
			revealedCount: maxLength,
			duration: SCRAMBLE_DURATION,
			ease: "none",
			onStart: () => {
				setIsScrambling(true);
				onScrambleStateChange?.(true);
			},
			onUpdate: () => {
				const revealedCount = Math.floor(progress.revealedCount);
				const nextValue = Array.from({ length: maxLength }, (_, index) => {
					if (index < revealedCount) {
						return value[index] ?? "";
					}

					if (index >= value.length) {
						return "";
					}

					const targetCharacter = value[index];
					return targetCharacter === " " ? " " : getScrambleCharacter();
				}).join("");

				setScrambledValue(nextValue);
			},
			onComplete: () => {
				previousValueRef.current = value;
				setScrambledValue(value);
				setIsScrambling(false);
				onScrambleStateChange?.(false);
			},
		});

		return () => {
			tween.kill();
			onScrambleStateChange?.(false);
		};
	}, [
		animateOnValueChange,
		hasAnimatedOnce,
		onScrambleStateChange,
		scrambleOnValueChange,
		shouldReduceMotion,
		value,
	]);

	if (shouldReduceMotion) {
		return <span className={className}>{value}</span>;
	}

	const shouldRenderStaticValue = hasAnimatedOnce && !animateOnValueChange;
	const displayedValue = shouldRenderStaticValue
		? isScrambling
			? scrambledValue
			: value
		: displayedText;
	const showCaret = !shouldRenderStaticValue && isCaretVisible;

	return (
		<span aria-label={value} className={`inline-grid whitespace-nowrap ${className}`.trim()}>
			<span
				aria-hidden="true"
				className="invisible col-start-1 row-start-1 inline-flex items-center"
			>
				{value}
			</span>
			<span aria-hidden="true" className="col-start-1 row-start-1 inline-flex items-center">
				{displayedValue}
				{showCaret ? (
					<span
						aria-hidden="true"
						className="ml-1 inline-block h-[0.9em] w-px origin-left scale-x-20 bg-current opacity-80"
					/>
				) : null}
			</span>
		</span>
	);
}

function useViewportDragConstraints<T extends HTMLDivElement>() {
	const dragRef = useRef<T>(null);
	const [dragConstraints, setDragConstraints] = useState({
		top: 0,
		right: 0,
		bottom: 0,
		left: 0,
	});

	useEffect(() => {
		const updateDragConstraints = () => {
			const element = dragRef.current;

			if (!element) {
				return;
			}

			const rect = element.getBoundingClientRect();

			setDragConstraints({
				top: -rect.top,
				right: window.innerWidth - rect.right,
				bottom: window.innerHeight - rect.bottom,
				left: -rect.left,
			});
		};

		updateDragConstraints();
		window.addEventListener("resize", updateDragConstraints);

		return () => {
			window.removeEventListener("resize", updateDragConstraints);
		};
	}, []);

	return { dragRef, dragConstraints };
}

function HeroLabel({
	label,
	isHighlighted = false,
	delay = 0,
	highlightDelay = 0,
}: Pick<HeroItem, "label" | "isHighlighted"> & {
	delay?: number;
	highlightDelay?: number;
}) {
	const labelRef = useRef<HTMLDivElement>(null);
	const highlightRef = useRef<HTMLSpanElement>(null);
	const shouldReduceMotion = useReducedMotion();

	useEffect(() => {
		const element = labelRef.current;

		if (!element || shouldReduceMotion) {
			return;
		}

		const tween = gsap.fromTo(
			element,
			{
				autoAlpha: 0,
				y: 16,
			},
			{
				autoAlpha: 1,
				y: 0,
				delay,
				duration: LABEL_REVEAL_DURATION,
				ease: "power2.out",
			},
		);

		return () => {
			tween.kill();
		};
	}, [delay, shouldReduceMotion]);

	useEffect(() => {
		const element = highlightRef.current;

		if (!element || !isHighlighted || shouldReduceMotion) {
			return;
		}

		gsap.set(element, {
			scaleX: 0,
			transformOrigin: "left center",
		});

		const loopTimeline = gsap
			.timeline({
				paused: true,
				repeat: -1,
			})
			.to({}, { duration: HIGHLIGHT_LOOP_HOLD_DURATION })
			.to(element, {
				scaleX: 0,
				duration: HIGHLIGHT_COLLAPSE_DURATION,
				ease: "power2.in",
			})
			.to({}, { duration: HIGHLIGHT_ZERO_HOLD_DURATION })
			.to(element, {
				scaleX: 1,
				duration: HIGHLIGHT_BOUNCE_DURATION,
				ease: "elastic.out(2, 0.28)",
			});

		const revealTween = gsap.to(element, {
			scaleX: 1,
			delay: highlightDelay,
			duration: HIGHLIGHT_REVEAL_DURATION,
			ease: "back.out(2.2)",
			onComplete: () => {
				loopTimeline.play(0);
			},
		});

		return () => {
			revealTween.kill();
			loopTimeline.kill();
		};
	}, [highlightDelay, isHighlighted, shouldReduceMotion]);

	return (
		<div
			className="max-w-content-sp relative w-full"
			ref={labelRef}
			style={shouldReduceMotion ? undefined : { opacity: 0 }}
		>
			<p className="text-hero-sub text-foreground md:text-hero-sub-lg md:leading-none">{label}</p>
			{isHighlighted ? (
				<span
					aria-hidden="true"
					className="bg-accent absolute top-[24px] left-0 h-[6px] w-[45px] md:top-[36px] md:h-2 md:w-[84px]"
					ref={highlightRef}
					style={
						shouldReduceMotion
							? undefined
							: { transform: "scaleX(0)", transformOrigin: "left center" }
					}
				/>
			) : null}
		</div>
	);
}

function HeroValue({
	value,
	delay = 0,
	isInteractive = true,
}: Pick<HeroItem, "value"> & {
	delay?: number;
	isInteractive?: boolean;
}) {
	const { dragRef, dragConstraints } = useViewportDragConstraints<HTMLDivElement>();

	return (
		<>
			<p className="max-w-content-sp text-foreground w-full text-[44px] leading-[1.4] font-bold md:hidden">
				<TypingText
					value={value}
					delay={delay}
					shouldBlinkBeforeTyping={shouldBlinkCaretBeforeTyping(value)}
				/>
			</p>
			<motion.div
				ref={dragRef}
				className={`hidden w-fit md:block ${isInteractive ? "" : "pointer-events-none"}`}
				drag={isInteractive}
				dragConstraints={dragConstraints}
				dragElastic={0}
				dragMomentum={false}
			>
				<Frame isInteractive={isInteractive}>
					{({ isSwitchedOn, setIsSwitchDisabled }) => {
						const displayValue = getLocalizedHeroValue(value, isSwitchedOn);

						return (
							<p className="text-hero-lg text-foreground leading-none font-black">
								<TypingText
									value={displayValue}
									delay={delay}
									animateOnValueChange={false}
									onScrambleStateChange={setIsSwitchDisabled}
									scrambleOnValueChange
									shouldBlinkBeforeTyping={shouldBlinkCaretBeforeTyping(value)}
								/>
							</p>
						);
					}}
				</Frame>
			</motion.div>
		</>
	);
}

function HeroRow({
	label,
	value,
	isHighlighted = false,
	labelDelay = 0,
	valueDelay = 0,
	highlightDelay = 0,
	isInteractive = true,
}: HeroItem & {
	labelDelay?: number;
	valueDelay?: number;
	highlightDelay?: number;
	isInteractive?: boolean;
}) {
	return (
		<div className="flex flex-col">
			<HeroLabel
				label={label}
				isHighlighted={isHighlighted}
				delay={labelDelay}
				highlightDelay={highlightDelay}
			/>
			<HeroValue value={value} delay={valueDelay} isInteractive={isInteractive} />
		</div>
	);
}

function ViewMore({ isInteractive = true }: { isInteractive?: boolean }) {
	const { dragRef, dragConstraints } = useViewportDragConstraints<HTMLDivElement>();

	return (
		<div className="text-primary w-fit">
			<HashLink
				className="group border-primary bg-accent text-caption text-primary inline-flex items-center overflow-hidden rounded-[24px] border px-4 py-2 transition-opacity hover:opacity-80 md:hidden"
				href="#work"
			>
				<RollingText text="Get to know me" />
			</HashLink>

			<div className="text-caption text-primary flex w-full flex-col items-center justify-center gap-1 transition-opacity hover:opacity-80 md:hidden">
				<span>Or scroll down</span>
				<ArrowRight
					aria-hidden="true"
					className="animate-scroll-cue-bounce size-3 shrink-0"
					strokeWidth={2}
				/>
			</div>

			<motion.div
				ref={dragRef}
				className={`hidden w-fit md:block ${isInteractive ? "" : "pointer-events-none"}`}
				drag={isInteractive}
				dragConstraints={dragConstraints}
				dragElastic={0}
				dragMomentum={false}
			>
				<Frame
					className="md:flex md:items-end"
					isInteractive={isInteractive}
					showBottomIndicator={false}
					text="Group"
				>
					<div className="flex flex-col items-start gap-1">
						<HashLink
							className="group border-primary bg-accent text-body text-primary inline-flex items-center overflow-hidden rounded-[24px] border px-4 py-2 leading-normal transition-opacity hover:opacity-80"
							href="#work"
						>
							<RollingText text="Get to know me" />
						</HashLink>

						<div className="text-caption text-primary flex w-full flex-col items-center justify-center gap-1 transition-opacity">
							<span>Or scroll down</span>
							<ArrowRight
								aria-hidden="true"
								className="animate-scroll-cue-bounce size-6 shrink-0"
								strokeWidth={1.75}
							/>
						</div>
					</div>
				</Frame>
			</motion.div>
		</div>
	);
}

export function HeroSection({
	items = defaultItems,
	introComplete = false,
	onIntroComplete,
}: HeroSectionProps) {
	const shouldReduceMotion = useReducedMotion();
	const timings = getHeroRowTimings(items);

	useEffect(() => {
		if (!onIntroComplete || introComplete) {
			return;
		}

		if (shouldReduceMotion) {
			onIntroComplete();
			return;
		}

		const lastTiming = timings.at(-1);
		const totalDuration = lastTiming
			? Math.max(
					lastTiming.valueDelay + lastTiming.valueDuration,
					lastTiming.highlightDelay + HIGHLIGHT_REVEAL_DURATION,
				)
			: 0;
		const delayedCall = gsap.delayedCall(totalDuration, onIntroComplete);

		return () => {
			delayedCall.kill();
		};
	}, [introComplete, onIntroComplete, shouldReduceMotion, timings]);

	return (
		<section className="flex w-full flex-col items-center gap-[56px] md:gap-[20px]">
			<div className="w-full">
				<div className="grid grid-cols-8">
					<div className="gap-block col-span-8 flex flex-col md:col-span-8 md:gap-10">
						{items.map((item, index) => (
							<div key={`${item.label}-${item.value}-${index}`}>
								<HeroRow
									{...item}
									isInteractive={introComplete}
									labelDelay={timings[index]?.labelDelay}
									valueDelay={timings[index]?.valueDelay}
									highlightDelay={timings[index]?.highlightDelay}
								/>
							</div>
						))}
					</div>
				</div>
			</div>

			<div
				className={
					introComplete
						? "translate-y-0 opacity-100 transition-all delay-300 duration-500 ease-out"
						: "pointer-events-none translate-y-2 opacity-0 transition-all duration-500 ease-out"
				}
			>
				<ViewMore isInteractive={introComplete} />
			</div>
		</section>
	);
}
