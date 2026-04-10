"use client";

import { useEffect, useId, useRef } from "react";
import * as THREE from "three";

import { gsap } from "@/lib/gsap";
import { subscribeScrollVelocityForShaders, velocityProxy } from "@/lib/work-scroll-velocity-trigger";

const VERT = /* glsl */ `
out vec2 vUv;
out vec2 vUvCover;
uniform vec2 uTextureSize;
uniform vec2 uQuadSize;

void main() {
  vUv = uv;
  float texR = uTextureSize.x / uTextureSize.y;
  float quadR = uQuadSize.x / uQuadSize.y;
  vec2 s = vec2(1.0);
  if (quadR > texR) { s.y = texR / quadR; } else { s.x = quadR / texR; }
  vUvCover = vUv * s + (1.0 - s) * 0.5;
  gl_Position = vec4(position, 1.0);
}
`;

const FRAG = /* glsl */ `
precision highp float;
precision highp sampler2D;

uniform sampler2D uTexture;
uniform vec2 uTextureSize;
uniform vec2 uQuadSize;
uniform float uTime;
uniform float uScrollVelocity;
uniform float uVelocityStrength;

in vec2 vUv;
in vec2 vUvCover;
out vec4 fragColor;

void main() {
  vec2 texCoords = vUvCover;
  float amt = 0.03 * uVelocityStrength;
  float t = uTime * 0.8;
  texCoords.y += sin((texCoords.x * 8.0) + t) * amt;
  texCoords.x += cos((texCoords.y * 6.0) - t * 0.8) * amt * 0.6;
  float dir = sign(uScrollVelocity);
  vec2 tc = texCoords;
  float r = texture(uTexture, tc + vec2(amt * 0.50 * dir, 0.0)).r;
  float g = texture(uTexture, tc + vec2(amt * 0.25 * dir, 0.0)).g;
  float b = texture(uTexture, tc + vec2(-amt * 0.35 * dir, 0.0)).b;
  fragColor = vec4(r, g, b, 1.0);
}
`;

type ScrollVelocityWorkImageProps = {
	imageUrl: string;
	alt: string;
	className?: string;
};

/**
 * 各カードごとに WebGL キャンバスを持ち、ページ全体で共有したスクロール速度で
 * ディストーションをかける（Real World Shader / Codrops 系アプローチ）。
 */
export function ScrollVelocityWorkImage({
	imageUrl,
	alt,
	className,
}: ScrollVelocityWorkImageProps) {
	const containerRef = useRef<HTMLDivElement>(null);
	const labelId = useId();

	useEffect(() => {
		const container = containerRef.current;
		if (!container) return;

		const unsubscribeVelocity = subscribeScrollVelocityForShaders();

		const renderer = new THREE.WebGLRenderer({
			antialias: true,
			alpha: false,
		});
		renderer.outputColorSpace = THREE.SRGBColorSpace;
		renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
		renderer.domElement.className =
			"pointer-events-none absolute inset-0 block h-full w-full";
		renderer.domElement.setAttribute("aria-hidden", "true");
		container.appendChild(renderer.domElement);

		const scene = new THREE.Scene();
		const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
		const geom = new THREE.PlaneGeometry(2, 2);

		const uniforms = {
			uTexture: { value: null as THREE.Texture | null },
			uTextureSize: { value: new THREE.Vector2(1, 1) },
			uQuadSize: { value: new THREE.Vector2(1, 1) },
			uTime: { value: 0 },
			uScrollVelocity: { value: 0 },
			uVelocityStrength: { value: 0 },
		};

		const mat = new THREE.ShaderMaterial({
			uniforms,
			vertexShader: VERT,
			fragmentShader: FRAG,
			glslVersion: THREE.GLSL3,
		});

		const mesh = new THREE.Mesh(geom, mat);
		scene.add(mesh);

		let alive = true;
		let texture: THREE.Texture | null = null;

		const layout = () => {
			const w = container.clientWidth;
			const h = container.clientHeight;
			if (w < 1 || h < 1) return;
			renderer.setSize(w, h, false);
			uniforms.uQuadSize.value.set(w, h);
		};

		const loader = new THREE.TextureLoader();
		loader.setCrossOrigin("anonymous");
		loader.load(
			imageUrl,
			(tex) => {
				if (!alive) {
					tex.dispose();
					return;
				}
				texture = tex;
				tex.colorSpace = THREE.SRGBColorSpace;
				uniforms.uTexture.value = tex;
				uniforms.uTextureSize.value.set(tex.image.width, tex.image.height);
				layout();
			},
			undefined,
			() => {
				// 読み込み失敗時は背景色のまま（コンテナの bg-surface が見える）
			},
		);

		const ro = new ResizeObserver(() => {
			layout();
		});
		ro.observe(container);
		layout();

		let last = performance.now();
		const tick = (now: number) => {
			if (!alive) return;
			const dt = (now - last) * 0.001;
			last = now;
			uniforms.uTime.value += dt;
			uniforms.uScrollVelocity.value = velocityProxy.v;
			uniforms.uVelocityStrength.value = velocityProxy.s;
			renderer.render(scene, camera);
		};
		gsap.ticker.add(tick);

		return () => {
			alive = false;
			gsap.ticker.remove(tick);
			ro.disconnect();
			unsubscribeVelocity();
			geom.dispose();
			mat.dispose();
			texture?.dispose();
			renderer.dispose();
			if (renderer.domElement.parentNode === container) {
				container.removeChild(renderer.domElement);
			}
		};
	}, [imageUrl]);

	return (
		<div
			ref={containerRef}
			aria-labelledby={labelId}
			className={className}
			role="img"
		>
			<span className="sr-only" id={labelId}>
				{alt}
			</span>
		</div>
	);
}
