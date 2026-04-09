"use client";

import gsap from "gsap";
import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

import { Frame } from "@/components/ui/frame";

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

function getTypingDuration(value: string) {
	return Math.max(Math.max(value.length, 1) * 0.06, 0.5);
}

function getHeroRowTimings(items: HeroItem[]) {
	let currentDelay = 0;

	return items.map((item) => {
		const labelDelay = currentDelay;
		const valueDelay = labelDelay + LABEL_REVEAL_DURATION;
		const valueDuration = getTypingDuration(item.value);

		currentDelay = valueDelay + valueDuration + ROW_GAP_DURATION;

		return {
			labelDelay,
			valueDelay,
			valueDuration,
		};
	});
}

function TypingText({
	value,
	delay = 0,
	className = "",
}: {
	value: string;
	delay?: number;
	className?: string;
}) {
	const shouldReduceMotion = useReducedMotion();
	const [displayedLength, setDisplayedLength] = useState(
		shouldReduceMotion ? value.length : 0,
	);

	useEffect(() => {
		if (shouldReduceMotion) {
			return;
		}

		const characterCount = Math.max(value.length, 1);
		const duration = Math.max(characterCount * 0.06, 0.5);
		const counter = { value: 0 };

		const tween = gsap.to(counter, {
			value: characterCount,
			delay,
			duration,
			ease: `steps(${characterCount})`,
			onStart: () => {
				setDisplayedLength(0);
			},
			onUpdate: () => {
				setDisplayedLength(Math.round(counter.value));
			},
		});

		return () => {
			tween.kill();
		};
	}, [delay, shouldReduceMotion, value]);

	if (shouldReduceMotion) {
		return <span className={className}>{value}</span>;
	}

	const displayedValue = value.slice(0, displayedLength);
	const showCaret = displayedLength > 0 && displayedLength < value.length;

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
				<span
					aria-hidden="true"
					className="ml-1 inline-block w-px origin-left scale-x-50"
				/>
			</span>
			<span
				aria-hidden="true"
				className="col-start-1 row-start-1 inline-flex items-center"
			>
				{displayedValue}
				{showCaret ? (
					<span
						aria-hidden="true"
						className="ml-1 inline-block h-[0.9em] w-px origin-left scale-x-50 bg-current opacity-80"
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
}: Pick<HeroItem, "label" | "isHighlighted"> & { delay?: number }) {
	const labelRef = useRef<HTMLDivElement>(null);
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
				/>
			) : null}
		</div>
	);
}

function HeroValue({
	value,
	delay = 0,
}: Pick<HeroItem, "value"> & {
	delay?: number;
}) {
	const { dragRef, dragConstraints } =
		useViewportDragConstraints<HTMLDivElement>();

	return (
		<>
			<p className="w-full max-w-content-sp text-[44px] leading-[1.4] font-bold text-foreground md:hidden">
				<TypingText value={value} delay={delay} />
			</p>
			<motion.div
				ref={dragRef}
				className="hidden w-fit md:block"
				drag
				dragConstraints={dragConstraints}
				dragElastic={0}
				dragMomentum={false}
			>
				<Frame>
					<p className="text-hero-lg leading-none font-black text-foreground">
						<TypingText value={value} delay={delay} />
					</p>
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
}: HeroItem & { labelDelay?: number; valueDelay?: number }) {
	return (
		<div className="flex flex-col">
			<HeroLabel
				label={label}
				isHighlighted={isHighlighted}
				delay={labelDelay}
			/>
			<HeroValue value={value} delay={valueDelay} />
		</div>
	);
}

function ViewMore() {
	const { dragRef, dragConstraints } =
		useViewportDragConstraints<HTMLDivElement>();

	return (
		<div className="w-fit text-primary">
			<a
				className="inline-flex items-center overflow-hidden rounded-[24px] border border-primary bg-accent px-4 py-2 text-caption text-primary transition-opacity hover:opacity-80 md:hidden"
				href="#work"
			>
				Get to know me
			</a>

			<div className="md:hidden flex w-full flex-col items-center justify-center gap-1 text-caption text-primary transition-opacity hover:opacity-80">
				<span>Or scroll down</span>
				<ArrowRight
					aria-hidden="true"
					className="size-3 rotate-90 shrink-0"
					strokeWidth={2}
				/>
			</div>

			<motion.div
				ref={dragRef}
				className="hidden w-fit md:block"
				drag
				dragConstraints={dragConstraints}
				dragElastic={0}
				dragMomentum={false}
			>
				<Frame className="md:flex md:items-end" showBottomIndicator={false}>
					<div className="flex flex-col items-start gap-1">
						<a
							className="inline-flex items-center overflow-hidden rounded-[24px] border border-primary bg-accent px-4 py-2 text-body leading-normal text-primary transition-opacity hover:opacity-80"
							href="#work"
						>
							Get to know me
						</a>

						<div className="flex w-full flex-col items-center justify-center gap-1 text-caption text-primary transition-opacity">
							<span>Or scroll down</span>
							<ArrowRight
								aria-hidden="true"
								className="size-6 rotate-90 shrink-0"
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
			? lastTiming.valueDelay + lastTiming.valueDuration
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
									labelDelay={timings[index]?.labelDelay}
									valueDelay={timings[index]?.valueDelay}
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
				<ViewMore />
			</div>
		</section>
	);
}
