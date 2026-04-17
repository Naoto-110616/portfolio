"use client";

import { motion, useReducedMotion } from "motion/react";

import { useDesktopMotion } from "@/hooks/use-desktop-motion";

type LayoutGuidesProps = {
	lineClassName?: string;
};

const mobileGuideOffsets = [
	"4.071%",
	"15.267%",
	"26.972%",
	"38.422%",
	"49.873%",
	"61.323%",
	"72.774%",
	"84.224%",
	"95.674%",
] as const;

const desktopGuideOffsets = [
	"0%",
	"12.5%",
	"25%",
	"37.5%",
	"50%",
	"62.5%",
	"75%",
	"87.5%",
] as const;

/**
 * Reusable page guides matching the mobile and desktop grid system.
 */
export function LayoutGuides({ lineClassName = "bg-foreground/10" }: LayoutGuidesProps) {
	const lineClasses = ["absolute top-0 bottom-0 block w-px", lineClassName]
		.filter(Boolean)
		.join(" ");
	const shouldReduceMotion = useReducedMotion();
	const isDesktop = useDesktopMotion();
	const allowLineMotion = isDesktop && !shouldReduceMotion;
	const animationDuration = 0.7;
	const animationDelayStep = 0.08;

	const renderGuideLine = (offset: string, index: number, key: string) => {
		if (!allowLineMotion) {
			return <span key={key} className={lineClasses} style={{ left: offset, transformOrigin: "0 0" }} />;
		}

		return (
			<motion.span
				key={key}
				animate={{
					scaleY: 1,
					opacity: 1,
				}}
				className={lineClasses}
				initial={{
					scaleY: 0,
					opacity: 0,
				}}
				style={{ left: offset, originY: 0 }}
				transition={{
					duration: animationDuration,
					delay: index * animationDelayStep,
					ease: [0.22, 1, 0.36, 1],
				}}
			/>
		);
	};

	return (
		<div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-full">
			<div className="md:hidden">
				{mobileGuideOffsets.map((offset, index) =>
					renderGuideLine(offset, index, `mobile-${offset}`),
				)}
			</div>

			<div className="max-w-content absolute inset-x-0 inset-y-0 z-10 mx-auto hidden w-full md:block">
				{desktopGuideOffsets.map((offset, index) =>
					renderGuideLine(offset, index, `desktop-${offset}`),
				)}
				{renderGuideLine("100%", desktopGuideOffsets.length, "desktop-100")}
			</div>
		</div>
	);
}
