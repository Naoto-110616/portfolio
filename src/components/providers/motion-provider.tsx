"use client";

import { LazyMotion, MotionConfig, domAnimation } from "motion/react";
import { ReactNode } from "react";

type MotionProviderProps = {
	children: ReactNode;
};

export function MotionProvider({ children }: MotionProviderProps) {
	return (
		<LazyMotion features={domAnimation}>
			<MotionConfig reducedMotion="user">{children}</MotionConfig>
		</LazyMotion>
	);
}
