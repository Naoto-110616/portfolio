"use client";

import gsap from "gsap";
import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

import { Frame } from "@/components/ui/frame";
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
	{ label: "Name:", value: "Naoto Okawa" },
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
const localizedHeroValues: Record<string, string> = {
	"Naoto Okawa": "大川 尚斗",
	"Frontend Engineer": "フロントエンドエンジニア",
	Work: "仕事",
};

function shouldBlinkCaretBeforeTyping(value: string) {
	return value === "Naoto Okawa";
}

function getTypingDuration(value: string) {
	const blinkLeadDuration = shouldBlinkCaretBeforeTyping(value)
		? CARET_BLINK_COUNT * CARET_BLINK_STEP_DURATION * 2
		: 0;

	return blinkLeadDuration + Math.max(Math.max(value.length, 1) * 0.1, 0.3);
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

function TypingText({
	value,
	delay = 0,
	className = "",
	shouldBlinkBeforeTyping = false,
	animateOnValueChange = true,
}: {
	value: string;
	delay?: number;
	className?: string;
	shouldBlinkBeforeTyping?: boolean;
	animateOnValueChange?: boolean;
}) {
	const shouldReduceMotion = useReducedMotion();
	const [displayedLength, setDisplayedLength] = useState(
		shouldReduceMotion ? value.length : 0,
	);
	const [isCaretVisible, setIsCaretVisible] = useState(false);
	const [hasAnimatedOnce, setHasAnimatedOnce] = useState(false);

	useEffect(() => {
		if (shouldReduceMotion) {
			return;
		}

		if (hasAnimatedOnce && !animateOnValueChange) {
			return;
		}

		const characterCount = Math.max(value.length, 1);
		const duration = Math.max(characterCount * 0.06, 0.5);
		const counter = { value: 0 };
		const timeline = gsap.timeline({
			delay,
			onStart: () => {
				setDisplayedLength(0);
				setIsCaretVisible(shouldBlinkBeforeTyping);
			},
		});

		if (shouldBlinkBeforeTyping) {
			for (
				let blinkIndex = 0;
				blinkIndex < CARET_BLINK_COUNT;
				blinkIndex += 1
			) {
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

		timeline.to(counter, {
			value: characterCount,
			duration,
			ease: `steps(${characterCount})`,
			onStart: () => {
				setIsCaretVisible(true);
			},
			onUpdate: () => {
				setDisplayedLength(Math.round(counter.value));
			},
			onComplete: () => {
				setHasAnimatedOnce(true);
				setIsCaretVisible(false);
			},
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

	if (shouldReduceMotion) {
		return <span className={className}>{value}</span>;
	}

	const shouldRenderStaticValue = hasAnimatedOnce && !animateOnValueChange;
	const displayedValue = shouldRenderStaticValue
		? value
		: value.slice(0, displayedLength);
	const showCaret =
		!shouldRenderStaticValue && isCaretVisible && displayedLength < value.length;

	return (
		<span
			aria-label={value}
			className={`inline-grid whitespace-nowrap ${className}`.trim()}
		>
			<span
				aria-hidden="true"
				className="invisible col-start-1 row-start-1 inline-flex items-center"
			>
				{value}
			</span>
			<span
				aria-hidden="true"
				className="col-start-1 row-start-1 inline-flex items-center"
			>
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
			className="relative w-full max-w-content-sp"
			ref={labelRef}
			style={shouldReduceMotion ? undefined : { opacity: 0 }}
		>
			<p className="text-hero-sub text-foreground md:text-hero-sub-lg md:leading-none">
				{label}
			</p>
			{isHighlighted ? (
				<span
					aria-hidden="true"
					className="absolute left-0 top-[24px] h-[6px] w-[45px] bg-accent md:top-[36px] md:w-[84px] md:h-2"
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
	const { dragRef, dragConstraints } =
		useViewportDragConstraints<HTMLDivElement>();

	return (
		<>
			<p className="w-full max-w-content-sp text-[44px] leading-[1.4] font-bold text-foreground md:hidden">
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
					{({ isSwitchedOn }) => {
						const displayValue = getLocalizedHeroValue(value, isSwitchedOn);

						return (
							<p className="text-hero-lg leading-none font-black text-foreground">
								<TypingText
									value={displayValue}
									delay={delay}
									animateOnValueChange={false}
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
			<HeroValue
				value={value}
				delay={valueDelay}
				isInteractive={isInteractive}
			/>
		</div>
	);
}

function ViewMore({ isInteractive = true }: { isInteractive?: boolean }) {
	const { dragRef, dragConstraints } =
		useViewportDragConstraints<HTMLDivElement>();

	return (
		<div className="w-fit text-primary">
			<a
				className="group inline-flex items-center overflow-hidden rounded-[24px] border border-primary bg-accent px-4 py-2 text-caption text-primary transition-opacity hover:opacity-80 md:hidden"
				href="#work"
			>
				<RollingText text="Get to know me" />
			</a>

			<div className="md:hidden flex w-full flex-col items-center justify-center gap-1 text-caption text-primary transition-opacity hover:opacity-80">
				<span>Or scroll down</span>
				<ArrowRight
					aria-hidden="true"
					className="size-3 shrink-0 animate-scroll-cue-bounce"
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
						<a
							className="group inline-flex items-center overflow-hidden rounded-[24px] border border-primary bg-accent px-4 py-2 text-body leading-normal text-primary transition-opacity hover:opacity-80"
							href="#work"
						>
							<RollingText text="Get to know me" />
						</a>

						<div className="flex w-full flex-col items-center justify-center gap-1 text-caption text-primary transition-opacity">
							<span>Or scroll down</span>
							<ArrowRight
								aria-hidden="true"
								className="size-6 shrink-0 animate-scroll-cue-bounce"
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
					<div className="col-span-8 flex flex-col gap-block md:col-span-8 md:gap-10">
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
						? "translate-y-0 opacity-100 transition-all duration-500 delay-300 ease-out"
						: "pointer-events-none translate-y-2 opacity-0 transition-all duration-500 ease-out"
				}
			>
				<ViewMore isInteractive={introComplete} />
			</div>
		</section>
	);
}
