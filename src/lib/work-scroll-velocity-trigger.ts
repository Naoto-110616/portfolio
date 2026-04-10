"use client";

import type Lenis from "lenis";

import { gsap, ScrollTrigger } from "@/lib/gsap";

/** 全 Work シェーダーで共有するスクロール速度（視覚用。実スクロールより遅れて追従） */
export const velocityProxy = { v: 0, s: 0 };

let triggerRefCount = 0;
let scrollTriggerInstance: ScrollTrigger | null = null;
let lenisForShaderVelocity: Lenis | null = null;

const clamp = gsap.utils.clamp(-2000, 2000);

/** Lenis の 1 フレームあたりの移動量を、従来の px/s 系に近いスケールへ */
const LENIS_VELOCITY_SCALE = 52;

/** シェーダーが実スクロール速度に追いつく速さ（小さいほど重く、止めたあとに残りやすい） */
const SHADER_VELOCITY_FOLLOW = 0.085;

/** 慣性が止まりかけたときの余韻（ふわっと収束） */
const SHADER_IDLE_DECAY_V = 0.978;
const SHADER_IDLE_DECAY_S = 0.98;
const LENIS_IDLE_EPS = 0.007;

function createVelocityScrollTrigger() {
	if (scrollTriggerInstance) return;
	scrollTriggerInstance = ScrollTrigger.create({
		start: 0,
		end: () =>
			document.documentElement.scrollHeight - window.innerHeight,
		onUpdate(self) {
			const raw = clamp(self.getVelocity());
			const norm = raw / 1000;
			const strength = Math.min(1, Math.abs(norm));
			if (Math.abs(strength) > Math.abs(velocityProxy.s) * 0.9) {
				velocityProxy.v = norm;
				velocityProxy.s = strength;
				gsap.to(velocityProxy, {
					v: 0,
					s: 0,
					duration: 0.95,
					ease: "power2.out",
					overwrite: true,
				});
			}
		},
	});
}

/**
 * Lenis 初期化時に呼ぶ。存在中は ScrollTrigger 由来の速度計測は使わず、
 * `tickLenisShaderVelocity` でふわっと追従させる。
 */
export function setLenisForShaderVelocity(lenis: Lenis | null) {
	lenisForShaderVelocity = lenis;
	if (lenis) {
		scrollTriggerInstance?.kill();
		scrollTriggerInstance = null;
	} else if (triggerRefCount > 0) {
		createVelocityScrollTrigger();
	}
}

/**
 * Lenis の `raf` の直後に GSAP ティッカーから呼ぶ。
 * スクロールを止めた瞬間も、シェーダーだけが少し遅れて追従・減衰する。
 */
export function tickLenisShaderVelocity() {
	if (!lenisForShaderVelocity || triggerRefCount <= 0) return;

	const raw = clamp(lenisForShaderVelocity.velocity * LENIS_VELOCITY_SCALE);
	const norm = raw / 1000;
	const targetS = Math.min(1, Math.abs(norm));

	velocityProxy.v += (norm - velocityProxy.v) * SHADER_VELOCITY_FOLLOW;
	velocityProxy.s += (targetS - velocityProxy.s) * SHADER_VELOCITY_FOLLOW;

	if (Math.abs(lenisForShaderVelocity.velocity) < LENIS_IDLE_EPS) {
		velocityProxy.v *= SHADER_IDLE_DECAY_V;
		velocityProxy.s *= SHADER_IDLE_DECAY_S;
	}
}

/**
 * マウント時に呼び、返したクリーンアップで参照カウントを減らす。
 * Lenis 非使用時は ScrollTrigger で速度を取る。
 */
export function subscribeScrollVelocityForShaders(): () => void {
	triggerRefCount += 1;
	if (triggerRefCount === 1 && !lenisForShaderVelocity) {
		createVelocityScrollTrigger();
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
