"use client";

import { motion, useMotionValue, useTransform, type PanInfo } from "motion/react";
import { type ReactNode, useEffect, useState } from "react";

type CardRotateProps = {
	children: ReactNode;
	onSendToBack: () => void;
	sensitivity: number;
	disableDrag?: boolean;
};

function CardRotate({ children, onSendToBack, sensitivity, disableDrag = false }: CardRotateProps) {
	const x = useMotionValue(0);
	const y = useMotionValue(0);
	const rotateX = useTransform(y, [-100, 100], [60, -60]);
	const rotateY = useTransform(x, [-100, 100], [-60, 60]);

	function handleDragEnd(_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) {
		if (Math.abs(info.offset.x) > sensitivity || Math.abs(info.offset.y) > sensitivity) {
			onSendToBack();
		} else {
			x.set(0);
			y.set(0);
		}
	}

	if (disableDrag) {
		return (
			<motion.div className="absolute inset-0 cursor-pointer" style={{ x: 0, y: 0 }}>
				{children}
			</motion.div>
		);
	}

	return (
		<motion.div
			className="absolute inset-0 cursor-grab"
			style={{ x, y, rotateX, rotateY }}
			drag
			dragConstraints={{ top: 0, right: 0, bottom: 0, left: 0 }}
			dragElastic={0.6}
			whileTap={{ cursor: "grabbing" }}
			onDragEnd={handleDragEnd}
		>
			{children}
		</motion.div>
	);
}

export type StackProps = {
	randomRotation?: boolean;
	sensitivity?: number;
	sendToBackOnClick?: boolean;
	cards?: ReactNode[];
	animationConfig?: { stiffness: number; damping: number };
	autoplay?: boolean;
	autoplayDelay?: number;
	pauseOnHover?: boolean;
	mobileClickOnly?: boolean;
	mobileBreakpoint?: number;
	/** 積みの最前面カードが変わったとき（id は初期順の 1..n） */
	onTopChange?: (topCardId: number) => void;
};

export default function Stack({
	randomRotation = false,
	sensitivity = 200,
	cards = [],
	animationConfig = { stiffness: 260, damping: 20 },
	sendToBackOnClick = false,
	autoplay = false,
	autoplayDelay = 3000,
	pauseOnHover = false,
	mobileClickOnly = false,
	mobileBreakpoint = 768,
	onTopChange,
}: StackProps) {
	const [isMobile, setIsMobile] = useState(false);
	const [isPaused, setIsPaused] = useState(false);

	useEffect(() => {
		const checkMobile = () => {
			setIsMobile(window.innerWidth < mobileBreakpoint);
		};

		checkMobile();
		window.addEventListener("resize", checkMobile);
		return () => window.removeEventListener("resize", checkMobile);
	}, [mobileBreakpoint]);

	const shouldDisableDrag = mobileClickOnly && isMobile;
	const shouldEnableClick = sendToBackOnClick || shouldDisableDrag;

	const [stack, setStack] = useState<{ id: number; content: ReactNode }[]>(() =>
		cards.length > 0 ? cards.map((content, index) => ({ id: index + 1, content })) : [],
	);

	const sendToBack = (id: number) => {
		setStack((prev) => {
			const newStack = [...prev];
			const index = newStack.findIndex((card) => card.id === id);
			if (index === -1) return prev;
			const [card] = newStack.splice(index, 1);
			newStack.unshift(card);
			return newStack;
		});
	};

	useEffect(() => {
		if (!autoplay || stack.length <= 1 || isPaused) return;

		const interval = setInterval(() => {
			setStack((prev) => {
				if (prev.length <= 1) return prev;
				const topId = prev[prev.length - 1].id;
				const next = [...prev];
				const index = next.findIndex((card) => card.id === topId);
				if (index === -1) return prev;
				const [card] = next.splice(index, 1);
				next.unshift(card);
				return next;
			});
		}, autoplayDelay);

		return () => clearInterval(interval);
	}, [autoplay, autoplayDelay, stack.length, isPaused]);

	useEffect(() => {
		if (stack.length === 0 || !onTopChange) return;
		const topId = stack[stack.length - 1].id;
		onTopChange(topId);
	}, [stack, onTopChange]);

	return (
		<div
			className="relative h-full w-full"
			style={{ perspective: 600 }}
			onMouseEnter={() => pauseOnHover && setIsPaused(true)}
			onMouseLeave={() => pauseOnHover && setIsPaused(false)}
		>
			{stack.map((card, index) => {
				const randomRotate = randomRotation ? ((card.id * 7) % 11) - 5 : 0;
				return (
					<CardRotate
						key={card.id}
						disableDrag={shouldDisableDrag}
						sensitivity={sensitivity}
						onSendToBack={() => sendToBack(card.id)}
					>
						<motion.div
							className="flex h-full w-full items-center justify-center overflow-visible rounded-2xl"
							animate={{
								rotateZ: (stack.length - index - 1) * 4 + randomRotate,
								scale: 1 + index * 0.06 - stack.length * 0.06,
								transformOrigin: "90% 90%",
							}}
							initial={false}
							transition={{
								type: "spring",
								stiffness: animationConfig.stiffness,
								damping: animationConfig.damping,
							}}
							onClick={() => shouldEnableClick && sendToBack(card.id)}
						>
							{card.content}
						</motion.div>
					</CardRotate>
				);
			})}
		</div>
	);
}
