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

		const desktopMq = window.matchMedia(DESKTOP_MOTION_MEDIA);
		let lenis: Lenis | null = null;
		let unsubScroll: (() => void) | undefined;

		// ScrollTrigger が refresh 時に各トリガー位置を計測するとき、本来は
		// スクロールを 0 に戻して計測する必要がある。しかし Lenis 駆動下では
		// ST がスクロールを 0 へ戻せず、復元スクロール位置のまま計測してしまい、
		// ピン開始位置が「現在のスクロール位置付近」に誤算出される
		// （リロード時に About 画像が直前セクションへ被る真因）。
		// そこで計測直前（refreshInit）に手動で最上部へ戻し、計測後（refresh）に
		// 元のスクロール位置へ復元することで、開始位置を必ず正しく算出させる。
		let scrollBeforeRefresh = 0;

		const onStRefreshInit = () => {
			scrollBeforeRefresh = window.scrollY;
			lenis?.stop();
			window.scrollTo(0, 0);
		};

		const onStRefresh = () => {
			lenis?.resize();
			lenis?.start();
			window.scrollTo(0, scrollBeforeRefresh);
			lenis?.scrollTo(scrollBeforeRefresh, { immediate: true, force: true });
		};

		/**
		 * ページ途中でのリロード対策。
		 * リロード時、ブラウザのスクロール位置復元はロード完了の前後まで
		 * 保留され、その間に ScrollTrigger が計測すると、計測用に最上部へ
		 * 動かしてもレイアウト参照時に復元位置へ引き戻され、ピン開始位置が
		 * 「現在のスクロール位置付近」に誤算出される（About 画像が直前
		 * セクションに被る真因）。復元がいつ確定するかは環境で前後する
		 * （レース）ため、ロード後しばらくの間 複数回 計測し直し、最後の
		 * 1 回が必ず復元確定後になるようにしてピンを正しく確定させる。
		 * 各 refresh は refreshInit のゼロ化計測により正しい開始位置を得る。
		 */
		const refreshTimers: number[] = [];
		const refreshAfterLoad = () => {
			if (!lenis) {
				return;
			}
			lenis.resize();
			ScrollTrigger.refresh();
		};
		const scheduleRefreshAfterLoad = () => {
			requestAnimationFrame(refreshAfterLoad);
			for (const delay of [100, 300, 600, 1000]) {
				refreshTimers.push(window.setTimeout(refreshAfterLoad, delay));
			}
		};

		const onTicker = (time: number) => {
			lenis?.raf(time * 1000);
		};

		const teardownLenis = () => {
			window.removeEventListener("load", scheduleRefreshAfterLoad);

			if (!lenis) {
				return;
			}

			ScrollTrigger.removeEventListener("refresh", onStRefresh);
			ScrollTrigger.removeEventListener("refreshInit", onStRefreshInit);
			gsap.ticker.remove(onTicker);
			gsap.ticker.lagSmoothing(1000, 33);
			unsubScroll?.();
			lenis.destroy();
			lenis = null;
			setLenisInstance(null);

			// ネイティブ window スクローラーに戻して計測し直す。
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

			// Lenis はラッパー無し＝ネイティブ window スクロール駆動。
			// ScrollTrigger は標準の window スクローラーをそのまま使えばよく、
			// scrollerProxy は不要。むしろ proxy を挟むと refresh 時の計測が
			// 実スクロール位置とズレ、リロード時にピン開始位置が誤算出されて
			// About 画像が直前セクションに被る原因になっていた（公式の Lenis +
			// GSAP 連携でもラッパー無しなら proxy は不要）。
			unsubScroll = lenis.on("scroll", ScrollTrigger.update);
			gsap.ticker.add(onTicker);
			gsap.ticker.lagSmoothing(0);
			ScrollTrigger.addEventListener("refreshInit", onStRefreshInit);
			ScrollTrigger.addEventListener("refresh", onStRefresh);
			ScrollTrigger.refresh();

			// ブラウザのスクロール復元が確定するのを待ってから基準を取り直す。
			if (document.readyState === "complete") {
				scheduleRefreshAfterLoad();
			} else {
				window.addEventListener("load", scheduleRefreshAfterLoad, { once: true });
			}
		};

		setupLenis();
		desktopMq.addEventListener("change", setupLenis);

		return () => {
			desktopMq.removeEventListener("change", setupLenis);
			window.removeEventListener("load", scheduleRefreshAfterLoad);
			for (const timer of refreshTimers) {
				clearTimeout(timer);
			}
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
