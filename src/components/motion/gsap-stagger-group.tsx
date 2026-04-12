"use client";

import { ReactNode, useRef } from "react";

import { useGsapStagger } from "@/hooks/use-gsap-stagger";

type GsapStaggerGroupProps = {
	children: ReactNode;
	className?: string;
	selector?: string;
};

export function GsapStaggerGroup({ children, className = "", selector }: GsapStaggerGroupProps) {
	const scopeRef = useRef<HTMLDivElement>(null);

	useGsapStagger(scopeRef, { selector });

	return (
		<div ref={scopeRef} className={className}>
			{children}
		</div>
	);
}
