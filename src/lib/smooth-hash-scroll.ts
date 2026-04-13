import type Lenis from "lenis";

export const SMOOTH_SCROLL_TO_DURATION = 1.12;

export const SMOOTH_SCROLL_TO_EASING = (t: number) => 1 - Math.pow(1 - t, 3);

export function isPrimaryUnmodifiedClick(
	e: Pick<MouseEvent, "button" | "metaKey" | "ctrlKey" | "shiftKey" | "altKey">,
): boolean {
	return e.button === 0 && !e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey;
}

/**
 * 同一ページ内の `#id` へ Lenis またはネイティブでスムーズスクロールする。
 * @returns スクロールを開始したら true
 */
export function scrollToHashAnchor(href: string, lenis: Lenis | null): boolean {
	if (!href.startsWith("#")) return false;
	const raw = href.slice(1);
	if (!raw) return false;

	let id: string;
	try {
		id = decodeURIComponent(raw);
	} catch {
		id = raw;
	}

	const el = document.getElementById(id);
	if (!el) return false;

	const reducedMotion =
		typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

	if (lenis) {
		lenis.scrollTo(el, {
			offset: 0,
			immediate: reducedMotion,
			duration: reducedMotion ? 0 : SMOOTH_SCROLL_TO_DURATION,
			easing: SMOOTH_SCROLL_TO_EASING,
		});
	} else {
		el.scrollIntoView({ behavior: reducedMotion ? "instant" : "smooth" });
	}

	window.history.pushState(null, "", href);
	return true;
}
