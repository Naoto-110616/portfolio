"use client";

import type { SpringOptions } from "motion/react";
import type { ReactNode } from "react";
import { useLayoutEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

const springValues: SpringOptions = {
	damping: 30,
	stiffness: 100,
	mass: 2,
};

const figcaptionSpring: SpringOptions = {
	stiffness: 350,
	damping: 30,
	mass: 1,
};

type TiltWorkImageFrameProps = {
	children: ReactNode;
	overlay: ReactNode;
	caption: string;
	rotateAmplitude?: number;
	scaleOnHover?: number;
};

export function TiltWorkImageFrame({
	children,
	overlay,
	caption,
	rotateAmplitude = 12,
	scaleOnHover = 1.05,
}: TiltWorkImageFrameProps) {
	const ref = useRef<HTMLDivElement>(null);
	const x = useMotionValue(0);
	const y = useMotionValue(0);
	const rotateX = useSpring(useMotionValue(0), springValues);
	const rotateY = useSpring(useMotionValue(0), springValues);
	const scale = useSpring(1, springValues);
	const opacity = useSpring(0);
	const rotateFigcaption = useSpring(0, figcaptionSpring);
	const [lastY, setLastY] = useState(0);
	const [tiltEnabled, setTiltEnabled] = useState(false);

	useLayoutEffect(() => {
		const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
		const coarse = window.matchMedia("(pointer: coarse)");
		const update = () => setTiltEnabled(!reduce.matches && !coarse.matches);
		update();
		reduce.addEventListener("change", update);
		coarse.addEventListener("change", update);
		return () => {
			reduce.removeEventListener("change", update);
			coarse.removeEventListener("change", update);
		};
	}, []);

	function handleMouse(e: React.MouseEvent<HTMLDivElement>) {
		if (!tiltEnabled || !ref.current) return;

		const rect = ref.current.getBoundingClientRect();
		const offsetX = e.clientX - rect.left - rect.width / 2;
		const offsetY = e.clientY - rect.top - rect.height / 2;

		const rotationX = (offsetY / (rect.height / 2)) * -rotateAmplitude;
		const rotationY = (offsetX / (rect.width / 2)) * rotateAmplitude;

		rotateX.set(rotationX);
		rotateY.set(rotationY);

		x.set(e.clientX - rect.left);
		y.set(e.clientY - rect.top);

		const velocityY = offsetY - lastY;
		rotateFigcaption.set(-velocityY * 0.6);
		setLastY(offsetY);
	}

	function handleMouseEnter() {
		if (!tiltEnabled) return;
		scale.set(scaleOnHover);
		opacity.set(1);
	}

	function handleMouseLeave() {
		opacity.set(0);
		scale.set(1);
		rotateX.set(0);
		rotateY.set(0);
		rotateFigcaption.set(0);
	}

	if (!tiltEnabled) {
		return (
			<div className="absolute inset-0">
				{children}
				<div className="pointer-events-none absolute top-2 right-2 z-2">{overlay}</div>
			</div>
		);
	}

	return (
		<div
			ref={ref}
			className="perspective-midrange absolute inset-0 flex flex-col items-center justify-center"
			onMouseMove={handleMouse}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
		>
			<motion.div
				className="transform-3d relative h-full w-full"
				style={{
					rotateX,
					rotateY,
					scale,
				}}
			>
				{children}

				<motion.div className="pointer-events-none absolute top-2 right-2 z-2 transform-[translateZ(30px)] will-change-transform">
					{overlay}
				</motion.div>
			</motion.div>

			{caption ? (
				<motion.figcaption
					className="text-caption-sm text-foreground pointer-events-none absolute top-0 left-0 z-3 hidden rounded-sm border border-primary bg-accent px-2.5 py-1 leading-none opacity-0 md:block"
					style={{
						x,
						y,
						opacity,
						rotate: rotateFigcaption,
					}}
				>
					{caption}
				</motion.figcaption>
			) : null}
		</div>
	);
}
