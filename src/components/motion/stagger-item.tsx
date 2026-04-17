"use client";

import { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";

import { useDesktopMotion } from "@/hooks/use-desktop-motion";

type StaggerItemProps = {
	children: ReactNode;
	className?: string;
	y?: number;
};

export function StaggerItem({ children, className = "", y = 24 }: StaggerItemProps) {
	const shouldReduceMotion = useReducedMotion();
	const isDesktop = useDesktopMotion();
	const allowMotion = isDesktop && !shouldReduceMotion;

	if (!allowMotion) {
		return <div className={className}>{children}</div>;
	}

	return (
		<motion.div
			className={className}
			variants={{
				hidden: { opacity: 0, y },
				visible: {
					opacity: 1,
					y: 0,
					transition: {
						duration: 0.7,
						ease: [0.22, 1, 0.36, 1],
					},
				},
			}}
		>
			{children}
		</motion.div>
	);
}
