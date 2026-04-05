"use client";

import { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";

type SectionRevealProps = {
	children: ReactNode;
	className?: string;
	delay?: number;
	y?: number;
	amount?: number;
	once?: boolean;
};

export function SectionReveal({
	children,
	className = "",
	delay = 0,
	y = 32,
	amount = 0.2,
	once = true,
}: SectionRevealProps) {
	const shouldReduceMotion = useReducedMotion();

	return (
		<motion.div
			className={className}
			initial={shouldReduceMotion ? false : { opacity: 0, y }}
			whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
			viewport={{ amount, once }}
			transition={{
				duration: 0.8,
				delay,
				ease: [0.22, 1, 0.36, 1],
			}}
		>
			{children}
		</motion.div>
	);
}
