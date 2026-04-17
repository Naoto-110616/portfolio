"use client";

import type { CSSProperties } from "react";
import { useCallback, useEffect, useMemo, useState } from "react";

import { useReducedMotion } from "motion/react";

import { useDesktopMotion } from "@/hooks/use-desktop-motion";

type RollingTextProps = {
	text: string;
	className?: string;
	staggerMs?: number;
	durationMs?: number;
	isActive?: boolean;
};

function getDisplayCharacter(character: string) {
	return character === " " ? "\u00A0" : character;
}

function createStoppedCharacters(count: number) {
	return Array.from({ length: count }, () => false);
}

export function RollingText({
	text,
	className = "",
	staggerMs = 24,
	durationMs = 480,
	isActive,
}: RollingTextProps) {
	const shouldReduceMotion = useReducedMotion();
	const isDesktop = useDesktopMotion();
	const characters = useMemo(() => Array.from(text), [text]);
	const rowHeightEm = 1.2;
	const rowStyle = {
		"--rolling-text-row-height": `${rowHeightEm}em`,
		"--rolling-text-duration": `${Math.max(durationMs, 240)}ms`,
	} as CSSProperties;
	const [isRolling, setIsRolling] = useState(false);
	const [stopAtNextCycle, setStopAtNextCycle] = useState(false);
	const [stoppedCharacters, setStoppedCharacters] = useState<boolean[]>(() =>
		createStoppedCharacters(characters.length),
	);
	const safeStoppedCharacters =
		stoppedCharacters.length === characters.length
			? stoppedCharacters
			: createStoppedCharacters(characters.length);

	const startRolling = useCallback(() => {
		setIsRolling(true);
		setStopAtNextCycle(false);
		setStoppedCharacters(createStoppedCharacters(characters.length));
	}, [characters.length]);

	const requestStopAtNextCycle = useCallback(() => {
		if (!isRolling) {
			return;
		}

		setStopAtNextCycle(true);
	}, [isRolling]);

	useEffect(() => {
		if (isActive === undefined) {
			return;
		}

		const frameId = window.requestAnimationFrame(() => {
			if (isActive) {
				startRolling();
				return;
			}

			requestStopAtNextCycle();
		});

		return () => {
			window.cancelAnimationFrame(frameId);
		};
	}, [isActive, requestStopAtNextCycle, startRolling]);

	const handleCharacterIteration = (index: number) => {
		setStoppedCharacters((current) => {
			const nextState =
				current.length === characters.length ? current : createStoppedCharacters(characters.length);

			if (!stopAtNextCycle || nextState[index]) {
				return nextState;
			}

			const next = [...nextState];
			next[index] = true;

			if (next.every(Boolean)) {
				setIsRolling(false);
				setStopAtNextCycle(false);
			}

			return next;
		});
	};

	if (shouldReduceMotion || !isDesktop) {
		return <span className={className}>{text}</span>;
	}

	return (
		<span
			className={`inline-flex align-baseline whitespace-nowrap ${className}`.trim()}
			onBlur={requestStopAtNextCycle}
			onFocus={startRolling}
			onMouseEnter={startRolling}
			onMouseLeave={requestStopAtNextCycle}
			style={rowStyle}
		>
			<span className="sr-only">{text}</span>
			<span aria-hidden="true" className="inline-flex align-baseline whitespace-pre">
				{characters.map((character, index) => (
					<span
						key={`${character}-${index}`}
						className="relative inline-flex h-(--rolling-text-row-height) overflow-hidden align-baseline"
					>
						<span
							className={`flex flex-col will-change-transform ${
								isRolling && !safeStoppedCharacters[index]
									? "animate-[rolling-text-loop_var(--rolling-text-duration)_linear_infinite]"
									: safeStoppedCharacters[index]
										? "transform-[translate3d(0,calc(var(--rolling-text-row-height)*-1),0)]"
										: "transform-[translate3d(0,0,0)]"
							}`}
							onAnimationIteration={() => {
								handleCharacterIteration(index);
							}}
							style={
								isRolling && !stoppedCharacters[index]
									? {
											animationDelay: `${index * staggerMs}ms`,
										}
									: undefined
							}
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
