"use client";

import { gsap, ScrollTrigger } from "@/lib/gsap";

/** 全 Work シェーダーで共有するスクロール速度（Jan Kohlbach / Codrops 系デモと同様） */
export const velocityProxy = { v: 0, s: 0 };

let triggerRefCount = 0;
let scrollTriggerInstance: ScrollTrigger | null = null;

const clamp = gsap.utils.clamp(-2000, 2000);

/**
 * マウント時に呼び、返したクリーンアップで参照カウントを減らす。
 * 最後のインスタンスが外れたら ScrollTrigger を破棄する。
 */
export function subscribeScrollVelocityForShaders(): () => void {
	triggerRefCount += 1;
	if (triggerRefCount === 1) {
		scrollTriggerInstance = ScrollTrigger.create({
			start: 0,
			end: () =>
				document.documentElement.scrollHeight - window.innerHeight,
			onUpdate(self) {
				const raw = clamp(self.getVelocity());
				const norm = raw / 1000;
				const strength = Math.min(1, Math.abs(norm));
				if (Math.abs(strength) > Math.abs(velocityProxy.s)) {
					velocityProxy.v = norm;
					velocityProxy.s = strength;
					gsap.to(velocityProxy, {
						v: 0,
						s: 0,
						duration: 0.8,
						ease: "sine.inOut",
						overwrite: true,
					});
				}
			},
		});
	}
	return () => {
		triggerRefCount -= 1;
		if (triggerRefCount <= 0) {
			scrollTriggerInstance?.kill();
			scrollTriggerInstance = null;
			triggerRefCount = 0;
			velocityProxy.v = 0;
			velocityProxy.s = 0;
		}
	};
}
