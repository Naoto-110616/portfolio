"use client";

import type { CSSProperties } from "react";

import { useReducedMotion } from "motion/react";

type RollingTextProps = {
	text: string;
	className?: string;
	staggerMs?: number;
	durationMs?: number;
};

function getDisplayCharacter(character: string) {
	return character === " " ? "\u00A0" : character;
}

export function RollingText({
	text,
	className = "",
	staggerMs = 24,
	durationMs = 480,
}: RollingTextProps) {
	const shouldReduceMotion = useReducedMotion();
	const rowHeightEm = 1.15;
	const rowStyle = {
		"--rolling-text-row-height": `${rowHeightEm}em`,
	} as CSSProperties;

	if (shouldReduceMotion) {
		return <span className={className}>{text}</span>;
	}

	return (
		<span
			className={`inline-flex whitespace-nowrap align-baseline ${className}`.trim()}
			style={rowStyle}
		>
			<span className="sr-only">{text}</span>
			<span
				aria-hidden="true"
				className="inline-flex whitespace-pre align-baseline"
			>
				{Array.from(text).map((character, index) => (
					<span
						key={`${character}-${index}`}
						className="relative inline-flex h-(--rolling-text-row-height) overflow-hidden align-baseline"
					>
						<span
							className="flex flex-col transform-[translate3d(0,0,0)] transition-transform will-change-transform ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:transform-[translate3d(0,calc(var(--rolling-text-row-height)*-1),0)] group-focus-visible:transform-[translate3d(0,calc(var(--rolling-text-row-height)*-1),0)]"
							style={{
								transitionDelay: `${index * staggerMs}ms`,
								transitionDuration: `${durationMs}ms`,
							}}
						>
							<span className="block h-(--rolling-text-row-height) leading-[1.15]">
								{getDisplayCharacter(character)}
							</span>
							<span className="block h-(--rolling-text-row-height) leading-[1.15]">
								{getDisplayCharacter(character)}
							</span>
						</span>
					</span>
				))}
			</span>
		</span>
	);
}
