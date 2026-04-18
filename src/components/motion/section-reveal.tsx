"use client";

import { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";

import { useDesktopMotion } from "@/hooks/use-desktop-motion";

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
	const isDesktop = useDesktopMotion();
	const allowMotion = isDesktop && !shouldReduceMotion;

	if (!allowMotion) {
		return <div className={className}>{children}</div>;
	}

	return (
		<motion.div
			className={className}
			initial={{ opacity: 0, y }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{
				amount,
				once,
				// スクロール復元で下端から表示されるときも交差判定が安定するよう余白を付ける
				margin: "160px 0px",
			}}
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
