"use client";

import Lenis from "lenis";
import { ReactNode, useLayoutEffect, useState } from "react";

import { LenisContext } from "@/components/providers/lenis-context";
import { DESKTOP_MOTION_MEDIA } from "@/hooks/use-desktop-motion";
import { gsap, ScrollTrigger } from "@/lib/gsap";

type SmoothScrollProviderProps = {
	children: ReactNode;
};

type LenisInitializerProps = {
	setLenisInstance: (instance: Lenis | null) => void;
};

/**
 * 先にマウントして Lenis + scrollerProxy を子の ScrollTrigger より前に初期化する。
 * （兄弟ツリー順で、このコンポーネントの layout effect がページより先に走る）
 * Lenis は **768px 以上（PC）** のときのみ有効。
 */
function LenisInitializer({ setLenisInstance }: LenisInitializerProps) {
	useLayoutEffect(() => {
		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
			return;
		}

		const html = document.documentElement;
		const desktopMq = window.matchMedia(DESKTOP_MOTION_MEDIA);
		let lenis: Lenis | null = null;
		let unsubScroll: (() => void) | undefined;

		const onStRefresh = () => {
			lenis?.resize();
		};

		const onTicker = (time: number) => {
			lenis?.raf(time * 1000);
		};

		const teardownLenis = () => {
			if (!lenis) {
				return;
			}

			ScrollTrigger.removeEventListener("refresh", onStRefresh);
			gsap.ticker.remove(onTicker);
			gsap.ticker.lagSmoothing(1000, 33);
			unsubScroll?.();
			lenis.destroy();
			lenis = null;
			setLenisInstance(null);

			ScrollTrigger.scrollerProxy(html, {
				scrollTop(value) {
					if (arguments.length && typeof value === "number") {
						window.scrollTo(0, value);
					}
					return window.scrollY || html.scrollTop;
				},
				getBoundingClientRect() {
					const w = window.innerWidth;
					const h = window.innerHeight;
					return {
						top: 0,
						left: 0,
						right: w,
						bottom: h,
						width: w,
						height: h,
						x: 0,
						y: 0,
						toJSON: () => ({}),
					} as DOMRect;
				},
			});
			ScrollTrigger.refresh();
		};

		const setupLenis = () => {
			if (!desktopMq.matches) {
				teardownLenis();
				return;
			}

			if (lenis) {
				return;
			}

			lenis = new Lenis({
				lerp: 0.07,
				duration: 1.12,
				easing: (t) => 1 - Math.pow(1 - t, 3),
				wheelMultiplier: 0.96,
				touchMultiplier: 0.98,
				smoothWheel: true,
				syncTouch: true,
				syncTouchLerp: 0.08,
				touchInertiaExponent: 1.48,
			});

			setLenisInstance(lenis);

			ScrollTrigger.scrollerProxy(html, {
				scrollTop(value) {
					if (arguments.length && typeof value === "number") {
						lenis?.scrollTo(value, { immediate: true });
					}
					return lenis?.scroll ?? 0;
				},
				getBoundingClientRect() {
					const w = window.innerWidth;
					const h = window.innerHeight;
					return {
						top: 0,
						left: 0,
						right: w,
						bottom: h,
						width: w,
						height: h,
						x: 0,
						y: 0,
						toJSON: () => ({}),
					} as DOMRect;
				},
				pinType: html.style.transform ? "transform" : "fixed",
			});

			unsubScroll = lenis.on("scroll", ScrollTrigger.update);
			gsap.ticker.add(onTicker);
			gsap.ticker.lagSmoothing(0);
			ScrollTrigger.addEventListener("refresh", onStRefresh);
			ScrollTrigger.refresh();
		};

		setupLenis();
		desktopMq.addEventListener("change", setupLenis);

		return () => {
			desktopMq.removeEventListener("change", setupLenis);
			teardownLenis();
		};
	}, [setLenisInstance]);

	return null;
}

export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
	const [lenis, setLenis] = useState<Lenis | null>(null);

	return (
		<LenisContext.Provider value={lenis}>
			<LenisInitializer setLenisInstance={setLenis} />
			{children}
		</LenisContext.Provider>
	);
}
