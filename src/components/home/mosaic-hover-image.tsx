"use client";

import { type MouseEvent, useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";

const CURSOR_RADIUS_PX = 60;
const MOSAIC_BLOCK_PX = 8;

type MosaicHoverImageProps = {
	src: string;
	alt: string;
	className?: string;
	/** 親が `relative` で、画像を `absolute inset-0` で敷き詰める場合（例: Work カードのプレビュー） */
	fill?: boolean;
	wrapperClassName?: string;
	onLoad?: () => void;
	width?: number;
	height?: number;
	fetchPriority?: "high" | "low" | "auto";
};

function drawMosaicCircle(
	ctx: CanvasRenderingContext2D,
	octx: CanvasRenderingContext2D,
	off: HTMLCanvasElement,
	cssX: number,
	cssY: number,
	dpr: number,
	opacity: number,
) {
	if (opacity < 0.02) return;

	const mx = cssX * dpr;
	const my = cssY * dpr;
	const r = CURSOR_RADIUS_PX * dpr;
	const block = Math.max(2, Math.round(MOSAIC_BLOCK_PX * dpr));

	const left = Math.max(0, Math.floor(mx - r));
	const top = Math.max(0, Math.floor(my - r));
	const right = Math.min(off.width, Math.ceil(mx + r));
	const bottom = Math.min(off.height, Math.ceil(my + r));
	const w = right - left;
	const h = bottom - top;
	if (w <= 0 || h <= 0) return;

	let data: ImageData;
	try {
		data = octx.getImageData(left, top, w, h);
	} catch {
		return;
	}

	const arr = data.data;
	const cx = mx - left;
	const cy = my - top;
	const r2 = r * r;

	for (let by = 0; by < h; by += block) {
		for (let bx = 0; bx < w; bx += block) {
			let sumR = 0;
			let sumG = 0;
			let sumB = 0;
			let sumA = 0;
			let count = 0;
			const bw = Math.min(block, w - bx);
			const bh = Math.min(block, h - by);
			for (let yy = 0; yy < bh; yy++) {
				for (let xx = 0; xx < bw; xx++) {
					const ix = bx + xx;
					const iy = by + yy;
					const i = (iy * w + ix) * 4;
					sumR += arr[i];
					sumG += arr[i + 1];
					sumB += arr[i + 2];
					sumA += arr[i + 3];
					count++;
				}
			}
			if (!count) continue;
			const ar = Math.round(sumR / count);
			const ag = Math.round(sumG / count);
			const ab = Math.round(sumB / count);
			const aa = Math.round(sumA / count);
			for (let yy = 0; yy < bh; yy++) {
				for (let xx = 0; xx < bw; xx++) {
					const ix = bx + xx;
					const iy = by + yy;
					const ddx = ix + 0.5 - cx;
					const ddy = iy + 0.5 - cy;
					if (ddx * ddx + ddy * ddy > r2) continue;
					const i = (iy * w + ix) * 4;
					arr[i] = ar;
					arr[i + 1] = ag;
					arr[i + 2] = ab;
					arr[i + 3] = aa;
				}
			}
		}
	}

	for (let i = 3; i < arr.length; i += 4) {
		arr[i] = Math.round(arr[i] * opacity);
	}

	ctx.save();
	ctx.beginPath();
	ctx.arc(mx, my, r, 0, Math.PI * 2);
	ctx.clip();
	ctx.putImageData(data, left, top);
	ctx.restore();
}

export function MosaicHoverImage({
	src,
	alt,
	className,
	fill = false,
	wrapperClassName,
	onLoad,
	width,
	height,
	fetchPriority,
}: MosaicHoverImageProps) {
	const wrapRef = useRef<HTMLDivElement>(null);
	const imgRef = useRef<HTMLImageElement>(null);
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const offscreenRef = useRef<HTMLCanvasElement | null>(null);
	const posRef = useRef<{ x: number; y: number } | null>(null);
	const insideRef = useRef(false);
	const [motionOk, setMotionOk] = useState(true);

	useEffect(() => {
		const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
		const update = () => setMotionOk(!mq.matches);
		update();
		mq.addEventListener("change", update);
		return () => mq.removeEventListener("change", update);
	}, []);

	const drawCoverToOffscreen = useCallback(() => {
		const img = imgRef.current;
		const wrap = wrapRef.current;
		if (!img?.complete || !wrap) return;

		const nw = img.naturalWidth;
		const nh = img.naturalHeight;
		if (!nw || !nh) return;

		const cw = wrap.clientWidth;
		const ch = wrap.clientHeight;
		if (!cw || !ch) return;

		const dpr = Math.min(window.devicePixelRatio ?? 1, 2);

		let off = offscreenRef.current;
		if (!off) {
			off = document.createElement("canvas");
			offscreenRef.current = off;
		}
		off.width = Math.round(cw * dpr);
		off.height = Math.round(ch * dpr);
		const octx = off.getContext("2d", { willReadFrequently: true });
		if (!octx) return;

		const imgAspect = nw / nh;
		const boxAspect = cw / ch;
		let sx = 0;
		let sy = 0;
		let sw = nw;
		let sh = nh;
		if (imgAspect > boxAspect) {
			sw = nh * boxAspect;
			sx = (nw - sw) / 2;
		} else {
			sh = nw / boxAspect;
			sy = (nh - sh) / 2;
		}
		octx.setTransform(1, 0, 0, 1, 0, 0);
		octx.drawImage(img, sx, sy, sw, sh, 0, 0, off.width, off.height);
	}, []);

	const paintFrame = useCallback(() => {
		const wrap = wrapRef.current;
		const canvas = canvasRef.current;
		const off = offscreenRef.current;
		if (!wrap || !canvas || !off) return;

		const ctx = canvas.getContext("2d");
		const octx = off.getContext("2d");
		if (!ctx || !octx) return;

		const dpr = Math.min(window.devicePixelRatio ?? 1, 2);
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		if (insideRef.current && posRef.current) {
			drawMosaicCircle(ctx, octx, off, posRef.current.x, posRef.current.y, dpr, 1);
		}
	}, []);

	const handleMove = useCallback(
		(e: MouseEvent<HTMLDivElement>) => {
			if (!motionOk) return;
			const wrap = wrapRef.current;
			if (!wrap) return;
			const rect = wrap.getBoundingClientRect();
			const x = e.clientX - rect.left;
			const y = e.clientY - rect.top;
			posRef.current = { x, y };
			paintFrame();
		},
		[motionOk, paintFrame],
	);

	const handleEnter = useCallback(() => {
		if (!motionOk) return;
		insideRef.current = true;
	}, [motionOk]);

	const handleLeave = useCallback(() => {
		if (!motionOk) return;
		insideRef.current = false;
		posRef.current = null;
		paintFrame();
	}, [motionOk, paintFrame]);

	useLayoutEffect(() => {
		const wrap = wrapRef.current;
		const canvas = canvasRef.current;
		if (!wrap || !canvas || !motionOk) return;

		const syncSize = () => {
			const dpr = Math.min(window.devicePixelRatio ?? 1, 2);
			const w = wrap.clientWidth;
			const h = wrap.clientHeight;
			canvas.width = Math.round(w * dpr);
			canvas.height = Math.round(h * dpr);
			canvas.style.width = `${w}px`;
			canvas.style.height = `${h}px`;
			drawCoverToOffscreen();
			paintFrame();
		};

		syncSize();
		const ro = new ResizeObserver(syncSize);
		ro.observe(wrap);
		return () => {
			ro.disconnect();
		};
	}, [drawCoverToOffscreen, motionOk, paintFrame]);

	const wrapClassName = [
		fill ? "absolute inset-0 isolate h-full w-full" : "relative isolate",
		motionOk ? "cursor-none" : "",
		wrapperClassName,
	]
		.filter(Boolean)
		.join(" ");

	const imgClassName = [fill ? "h-full w-full object-cover" : "", className]
		.filter(Boolean)
		.join(" ");

	return (
		<div
			ref={wrapRef}
			className={wrapClassName}
			onMouseEnter={handleEnter}
			onMouseLeave={handleLeave}
			onMouseMove={handleMove}
		>
			<img
				ref={imgRef}
				alt={alt}
				className={imgClassName || undefined}
				crossOrigin="anonymous"
				decoding="async"
				fetchPriority={fetchPriority}
				height={height}
				src={src}
				width={width}
				onLoad={() => {
					drawCoverToOffscreen();
					paintFrame();
					onLoad?.();
				}}
			/>
			{motionOk ? (
				<canvas
					ref={canvasRef}
					aria-hidden
					className="pointer-events-none absolute inset-0 z-1 h-full w-full"
				/>
			) : null}
		</div>
	);
}
