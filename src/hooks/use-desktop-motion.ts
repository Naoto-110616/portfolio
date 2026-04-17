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
