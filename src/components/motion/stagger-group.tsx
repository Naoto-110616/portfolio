"use client";

import { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";

import { useDesktopMotion } from "@/hooks/use-desktop-motion";

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
	const isDesktop = useDesktopMotion();
	const allowMotion = isDesktop && !shouldReduceMotion;
	const Component = as === "ul" ? motion.ul : motion.div;

	if (!allowMotion) {
		if (as === "ul") {
			return <ul className={className}>{children}</ul>;
		}
		return <div className={className}>{children}</div>;
	}

	return (
		<Component
			className={className}
			initial="hidden"
			whileInView="visible"
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
