"use client";

import gsap from "gsap";
import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

import { SectionReveal } from "@/components/motion/section-reveal";
import { StaggerGroup } from "@/components/motion/stagger-group";
import { StaggerItem } from "@/components/motion/stagger-item";
import { Frame } from "@/components/ui/frame";

export type HeroItem = {
	label: string;
	value: string;
	isHighlighted?: boolean;
};

type HeroSectionProps = {
	items?: HeroItem[];
};

const defaultItems: HeroItem[] = [
	{ label: "Name:", value: "Naoto Okawa" },
	{ label: "Title:", value: "Frontend Engineer" },
	{ label: "Dislikes:", value: "Work", isHighlighted: true },
];

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
	const showCaret = displayedLength < value.length;

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
				<span aria-hidden="true" className="ml-1 inline-block w-[2px]" />
			</span>
			<span
				aria-hidden="true"
				className="col-start-1 row-start-1 inline-flex items-center"
			>
				{displayedValue}
				{showCaret ? (
					<span
						aria-hidden="true"
						className="ml-1 inline-block h-[0.9em] w-[2px] bg-current"
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
}: Pick<HeroItem, "label" | "isHighlighted">) {
	return (
		<div className="relative w-full max-w-content-sp">
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
	index,
}: Pick<HeroItem, "value"> & {
	index: number;
}) {
	const { dragRef, dragConstraints } = useViewportDragConstraints<HTMLDivElement>();
	const typingDelay = 0.15 + index * 0.35;

	return (
		<>
			<p className="w-full max-w-content-sp text-[44px] leading-[1.4] font-bold text-foreground md:hidden">
				<TypingText value={value} delay={typingDelay} />
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
						<TypingText value={value} delay={typingDelay} />
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
	index,
}: HeroItem & { index: number }) {
	return (
		<div className="flex flex-col">
			<HeroLabel label={label} isHighlighted={isHighlighted} />
			<HeroValue value={value} index={index} />
		</div>
	);
}

function ViewMore() {
	const { dragRef, dragConstraints } = useViewportDragConstraints<HTMLDivElement>();

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

export function HeroSection({ items = defaultItems }: HeroSectionProps) {
	return (
		<section className="flex w-full flex-col items-center gap-[56px] md:gap-[20px]">
			<StaggerGroup
				className="w-full"
				delayChildren={0.08}
				staggerChildren={0.14}
			>
				<div className="grid grid-cols-8">
					<div className="col-span-8 flex flex-col gap-block md:col-span-8 md:gap-10">
						{items.map((item, index) => (
							<StaggerItem key={`${item.label}-${item.value}-${index}`}>
								<HeroRow {...item} index={index} />
							</StaggerItem>
						))}
					</div>
				</div>
			</StaggerGroup>

			<SectionReveal y={16}>
				<ViewMore />
			</SectionReveal>
		</section>
	);
}
