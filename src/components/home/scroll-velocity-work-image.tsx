"use client";

import { useId, useLayoutEffect, useRef } from "react";

import { MosaicHoverImage } from "@/components/home/mosaic-hover-image";
import { gsap, ScrollTrigger } from "@/lib/gsap";

type ScrollVelocityWorkImageProps = {
	imageUrl: string;
	alt: string;
	className?: string;
};

const BASE_FREQUENCY_X = 0.006;
const BASE_FREQUENCY_Y = 0.018;
const MAX_FREQUENCY_X = 0.014;
const MAX_FREQUENCY_Y = 0.05;
const MAX_DISPLACEMENT = 26;
const MAX_IMAGE_SHIFT = 1.8;
const MAX_SKEW = 1.6;

export function ScrollVelocityWorkImage({
	imageUrl,
	alt,
	className,
}: ScrollVelocityWorkImageProps) {
	const rootRef = useRef<HTMLDivElement>(null);
	const imageWrapRef = useRef<HTMLDivElement>(null);
	const turbulenceRef = useRef<SVGFETurbulenceElement>(null);
	const displacementRef = useRef<SVGFEDisplacementMapElement>(null);
	const filterId = useId().replace(/:/g, "");

	useLayoutEffect(() => {
		const root = rootRef.current;
		const imageWrap = imageWrapRef.current;
		const turbulence = turbulenceRef.current;
		const displacement = displacementRef.current;

		if (!root || !imageWrap || !turbulence || !displacement) {
			return;
		}

		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
			return;
		}

		const state = {
			frequencyX: BASE_FREQUENCY_X,
			frequencyY: BASE_FREQUENCY_Y,
			displacement: 0,
			yPercent: 0,
			skewY: 0,
		};

		const render = () => {
			turbulence.setAttribute(
				"baseFrequency",
				`${state.frequencyX.toFixed(4)} ${state.frequencyY.toFixed(4)}`,
			);
			displacement.setAttribute("scale", state.displacement.toFixed(2));
			imageWrap.style.transform =
				`translate3d(0, ${state.yPercent.toFixed(2)}%, 0) scale(1.04) skewY(${state.skewY.toFixed(2)}deg)`;
		};

		const relax = () => {
			gsap.to(state, {
				frequencyX: BASE_FREQUENCY_X,
				frequencyY: BASE_FREQUENCY_Y,
				displacement: 0,
				yPercent: 0,
				skewY: 0,
				duration: 0.85,
				ease: "power3.out",
				overwrite: true,
				onUpdate: render,
			});
		};

		render();

		const trigger = ScrollTrigger.create({
			trigger: root,
			start: "top bottom",
			end: "bottom top",
			onUpdate(self) {
				const velocity = self.getVelocity();
				const intensity = gsap.utils.clamp(0, 1, Math.abs(velocity) / 2200);
				const direction = velocity < 0 ? -1 : 1;

				gsap.to(state, {
					frequencyX: gsap.utils.interpolate(
						BASE_FREQUENCY_X,
						MAX_FREQUENCY_X,
						intensity,
					),
					frequencyY: gsap.utils.interpolate(
						BASE_FREQUENCY_Y,
						MAX_FREQUENCY_Y,
						intensity,
					),
					displacement: gsap.utils.interpolate(0, MAX_DISPLACEMENT, intensity),
					yPercent: direction * MAX_IMAGE_SHIFT * intensity,
					skewY: direction * MAX_SKEW * intensity,
					duration: 0.18,
					ease: "power2.out",
					overwrite: true,
					onUpdate: render,
					onComplete: relax,
				});
			},
		});

		return () => {
			gsap.killTweensOf(state);
			trigger.kill();
			turbulence.setAttribute(
				"baseFrequency",
				`${BASE_FREQUENCY_X} ${BASE_FREQUENCY_Y}`,
			);
			displacement.setAttribute("scale", "0");
			imageWrap.style.transform = "translate3d(0, 0, 0) scale(1.04)";
		};
	}, [filterId]);

	return (
		<div
			ref={rootRef}
			className={`relative overflow-hidden bg-surface ${className ?? ""}`}
		>
			<svg
				aria-hidden="true"
				className="pointer-events-none absolute h-0 w-0 overflow-hidden"
			>
				<filter
					id={filterId}
					x="-20%"
					y="-20%"
					width="140%"
					height="140%"
					colorInterpolationFilters="sRGB"
				>
					<feTurbulence
						ref={turbulenceRef}
						baseFrequency={`${BASE_FREQUENCY_X} ${BASE_FREQUENCY_Y}`}
						numOctaves="2"
						result="noise"
						seed="2"
						type="fractalNoise"
					/>
					<feDisplacementMap
						ref={displacementRef}
						in="SourceGraphic"
						in2="noise"
						scale="0"
						xChannelSelector="R"
						yChannelSelector="B"
					/>
				</filter>
			</svg>

			<div
				ref={imageWrapRef}
				className="absolute inset-0 will-change-transform"
				style={{
					filter: `url(#${filterId})`,
					transform: "translate3d(0, 0, 0) scale(1.04)",
				}}
			>
				<MosaicHoverImage
					fill
					alt={alt}
					className="object-cover"
					src={imageUrl}
				/>
			</div>
		</div>
	);
}
