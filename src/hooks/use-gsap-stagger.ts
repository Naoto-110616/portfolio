"use client";

import { RefObject, useEffect } from "react";

import { gsap } from "@/lib/gsap";

type UseGsapStaggerOptions = {
	selector?: string;
	start?: string;
	stagger?: number;
	y?: number;
	duration?: number;
};

export function useGsapStagger(
	scope: RefObject<HTMLElement | null>,
	{
		selector = "[data-gsap-item]",
		start = "top 80%",
		stagger = 0.14,
		y = 48,
		duration = 0.8,
	}: UseGsapStaggerOptions = {},
) {
	useEffect(() => {
		if (!scope.current) {
			return;
		}

		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
			return;
		}

		const mm = gsap.matchMedia();
		mm.add("(min-width: 768px)", () => {
			const context = gsap.context(() => {
				const elements = gsap.utils.toArray<HTMLElement>(selector);

				if (!elements.length) {
					return;
				}

				gsap.fromTo(
					elements,
					{ autoAlpha: 0, y },
					{
						autoAlpha: 1,
						y: 0,
						duration,
						stagger,
						ease: "power3.out",
						scrollTrigger: {
							trigger: scope.current,
							start,
							once: true,
						},
					},
				);
			}, scope);

			return () => {
				context.revert();
			};
		});

		return () => {
			mm.revert();
		};
	}, [scope, selector, start, stagger, y, duration]);
}
