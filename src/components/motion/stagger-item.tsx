"use client";

import { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";

type StaggerItemProps = {
	children: ReactNode;
	className?: string;
	y?: number;
};

export function StaggerItem({
	children,
	className = "",
	y = 24,
}: StaggerItemProps) {
	const shouldReduceMotion = useReducedMotion();

	return (
		<motion.div
			className={className}
			variants={
				shouldReduceMotion
					? undefined
					: {
							hidden: { opacity: 0, y },
							visible: {
								opacity: 1,
								y: 0,
								transition: {
									duration: 0.7,
									ease: [0.22, 1, 0.36, 1],
								},
							},
						}
			}
		>
			{children}
		</motion.div>
	);
}
