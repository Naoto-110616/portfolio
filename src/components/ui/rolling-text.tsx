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
	const rowHeightEm = 1.2;
	const rowStyle = {
		"--rolling-text-row-height": `${rowHeightEm}em`,
		"--rolling-text-duration": `${Math.max(durationMs, 240)}ms`,
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
							className="flex flex-col transform-[translate3d(0,0,0)] will-change-transform group-hover:animate-[rolling-text-loop_var(--rolling-text-duration)_linear_infinite] group-focus-visible:animate-[rolling-text-loop_var(--rolling-text-duration)_linear_infinite]"
							style={{
								animationDelay: `${index * staggerMs}ms`,
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
