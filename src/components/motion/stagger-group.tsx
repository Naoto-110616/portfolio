"use client";

import { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";

type StaggerGroupProps = {
	children: ReactNode;
	className?: string;
	staggerChildren?: number;
	delayChildren?: number;
	amount?: number;
	once?: boolean;
	as?: "div" | "ul";
};

export function StaggerGroup({
	children,
	className = "",
	staggerChildren = 0.12,
	delayChildren = 0,
	amount = 0.2,
	once = true,
	as = "div",
}: StaggerGroupProps) {
	const shouldReduceMotion = useReducedMotion();
	const Component = as === "ul" ? motion.ul : motion.div;

	return (
		<Component
			className={className}
			initial={shouldReduceMotion ? false : "hidden"}
			whileInView={shouldReduceMotion ? undefined : "visible"}
			viewport={{ amount, once }}
			variants={{
				hidden: {},
				visible: {
					transition: {
						delayChildren,
						staggerChildren,
					},
				},
			}}
		>
			{children}
		</Component>
	);
}
