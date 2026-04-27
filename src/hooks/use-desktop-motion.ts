"use client";

import { useSyncExternalStore } from "react";

/** Tailwind `md` と揃えた「PC」判定（ビューポート幅） */
export const DESKTOP_MOTION_MEDIA = "(min-width: 768px)";

function subscribe(onStoreChange: () => void) {
	const mq = window.matchMedia(DESKTOP_MOTION_MEDIA);
	mq.addEventListener("change", onStoreChange);
	return () => mq.removeEventListener("change", onStoreChange);
}

function getSnapshot() {
	return window.matchMedia(DESKTOP_MOTION_MEDIA).matches;
}

function getServerSnapshot() {
	return false;
}

/**
 * スクロール連動・チルト・Lenis など「PC 向けモーション」を出し分けるときに使う。
 * SSR 時は false（ハイドレーション後に実幅で更新）。
 */
export function useDesktopMotion(): boolean {
	return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

/** 768px 未満。`useDesktopMotion` の逆に近いが、イントロ完了など用に SSR では常に false。 */
const SP_MOTION_MEDIA = "(max-width: 767.98px)";

function subscribeSpViewport(onStoreChange: () => void) {
	const mq = window.matchMedia(SP_MOTION_MEDIA);
	mq.addEventListener("change", onStoreChange);
	return () => mq.removeEventListener("change", onStoreChange);
}

function getSpViewportSnapshot() {
	return window.matchMedia(SP_MOTION_MEDIA).matches;
}

function getSpViewportServerSnapshot() {
	return false;
}

/**
 * ヒーローイントロの「即完了」など SP 専用分岐用。
 * SSR では false のまま初回表示を揃え、クライアントで実幅に合わせる。
 */
export function useSpViewportForIntro(): boolean {
	return useSyncExternalStore(
		subscribeSpViewport,
		getSpViewportSnapshot,
		getSpViewportServerSnapshot,
	);
}
