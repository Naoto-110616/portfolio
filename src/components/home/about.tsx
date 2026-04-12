"use client";

import { useLayoutEffect, useRef } from "react";

import { MosaicHoverImage } from "@/components/home/mosaic-hover-image";
import { AnimatedSectionTitle } from "@/components/motion/animated-section-title";
import { HomeMainInner } from "@/components/ui/home-main-inner";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { NAME_PORTRAIT_ALT } from "@/constans/const";

export type AboutBlock = {
	id?: string;
	title: string;
	paragraphs: string[];
};

type AboutSectionProps = {
	title?: string;
	leadText?: string;
	imageUrl?: string;
	imageAlt?: string;
	blocks?: AboutBlock[];
};

const aboutImage = "https://www.figma.com/api/mcp/asset/1d9e5c05-e456-414b-9635-956928c1245c";

const defaultLeadText = "モダンなWebに、体験と仕組みをデザインするフロントエンドエンジニア";

/** ピン開始位置（`ScrollTrigger.start` と画像中央の推定に併用） */
const ABOUT_PIN_START_VIEWPORT_PCT = 12;

const defaultBlocks: AboutBlock[] = [
	{
		title: "Hello",
		paragraphs: [
			"使いやすさとつくりやすさを両立させたいフロントエンドエンジニアです。",
			"Next.jsとヘッドレスCMSを中心に、LPやコーポレートサイト、ECまわりを担当しています。",
		],
	},
	{
		title: "Journey",
		paragraphs: [
			"デザインの意図を汲み取った高精度な実装から、運用を見据えた設計まで一気通貫で手がけています。",
			"Next.js を軸に、管理画面開発や Headless CMS、EC構築まで、事業フェーズに応じた技術選定と実装を行っています。",
		],
	},
	{
		title: "Approach",
		paragraphs: [
			"緻密に設計したコンポーネントが、意図したレイアウトにはまる瞬間にいちばんやりがいを感じます。",
			"余白設計と責務分離を大切にし、見た目の美しさと再利用性を両立した、保守しやすいUIを組み立てています。",
		],
	},
	{
		title: "Beyond",
		paragraphs: [
			"休日は本や映画、漫画をのんびり楽しんでいます。",
			"ジャンルはミステリ、歴史、SF、ノンフィクションなど。観たものや読んだものを忘れるのがもったいなくて、アプリに5段階で記録をつけるのが習慣になっています。",
			"静かな場所で一人、コーヒーを淹れたり料理をしたり、時々ゲームをしたり。そんなマイペースに過ごす時間が一番落ち着きます。",
		],
	},
];

function AboutContentBlock({ title, paragraphs }: AboutBlock) {
	return (
		<section className="gap-stack flex flex-col md:grid md:grid-cols-[256px_minmax(0,1fr)] md:gap-0">
			<h3 className="text-heading text-foreground md:text-section md:font-bold">{title}</h3>
			<div className="gap-stack text-caption text-foreground md:text-body flex flex-col leading-normal">
				{paragraphs.map((paragraph, index) => (
					<p key={`${title}-${index}`}>{paragraph}</p>
				))}
			</div>
		</section>
	);
}

export function AboutSection({
	title = "About",
	leadText = defaultLeadText,
	imageUrl = aboutImage,
	imageAlt = NAME_PORTRAIT_ALT,
	blocks = defaultBlocks,
}: AboutSectionProps) {
	const beyondIndex = blocks.findIndex((b) => b.title === "Beyond");
	const unpinPanelIndex = beyondIndex >= 0 ? beyondIndex : Math.max(0, blocks.length - 1);

	const scrollRootRef = useRef<HTMLDivElement>(null);
	const pinRef = useRef<HTMLDivElement>(null);
	const contentRef = useRef<HTMLDivElement>(null);
	const beyondPanelRef = useRef<HTMLDivElement>(null);

	useLayoutEffect(() => {
		const root = scrollRootRef.current;
		const pinEl = pinRef.current;
		const contentEl = contentRef.current;
		const beyondPanelEl = beyondPanelRef.current;

		if (!root || !pinEl || !contentEl) {
			return;
		}

		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
			return;
		}

		const mm = gsap.matchMedia();

		const ctx = gsap.context(() => {
			mm.add("(min-width: 768px)", () => {
				const pinHeight = pinEl.offsetHeight || 491;
				const beyondUnpinEnd = () => {
					const vh = window.innerHeight;
					const imgMidPercent = ABOUT_PIN_START_VIEWPORT_PCT + (pinHeight / 2 / vh) * 100;
					const clamped = Math.min(56, Math.max(20, imgMidPercent));
					return `top ${clamped.toFixed(2)}%`;
				};

				// Beyond ブロック上端が写真の縦中央付近（ビューポート割合）に来たらピン解除
				if (beyondPanelEl) {
					ScrollTrigger.create({
						trigger: root,
						start: `top ${ABOUT_PIN_START_VIEWPORT_PCT}%`,
						endTrigger: beyondPanelEl,
						end: beyondUnpinEnd,
						pin: pinEl,
						pinSpacing: true,
						anticipatePin: 1,
						invalidateOnRefresh: true,
					});
				} else {
					ScrollTrigger.create({
						trigger: root,
						start: `top ${ABOUT_PIN_START_VIEWPORT_PCT}%`,
						endTrigger: contentEl,
						end: "bottom bottom",
						pin: pinEl,
						pinSpacing: true,
						anticipatePin: 1,
						invalidateOnRefresh: true,
					});
				}
			});

			const panels = gsap.utils.toArray<HTMLElement>("[data-about-scroll-panel]", root);

			panels.forEach((panel) => {
				gsap.fromTo(
					panel,
					{ autoAlpha: 0, y: 28 },
					{
						autoAlpha: 1,
						y: 0,
						duration: 0.85,
						ease: "power3.out",
						scrollTrigger: {
							trigger: panel,
							start: "top 88%",
							toggleActions: "play none none none",
						},
					},
				);
			});
		}, root);

		const refresh = () => {
			ScrollTrigger.refresh();
		};
		requestAnimationFrame(refresh);

		return () => {
			mm.revert();
			ctx.revert();
		};
	}, [blocks.length, imageUrl, leadText, unpinPanelIndex]);

	return (
		<section id="about" className="md:pb-block-xl w-full">
			<HomeMainInner className="gap-block md:gap-section-lg flex flex-col">
				<AnimatedSectionTitle title={title} titleClassName="md:text-section-lg md:font-black" />

				<div
					ref={scrollRootRef}
					className="gap-block flex flex-col md:grid md:grid-cols-[368px_minmax(0,1fr)] md:items-start md:gap-4"
				>
					<div ref={pinRef} className="md:self-start">
						<MosaicHoverImage
							alt={imageAlt}
							className="aspect-1536/2048 w-full object-cover md:aspect-auto md:h-[491px] md:w-[368px]"
							src={imageUrl}
							onLoad={() => {
								ScrollTrigger.refresh();
							}}
						/>
					</div>

					<div ref={contentRef} className="flex flex-col gap-[48px] md:gap-[480px]">
						<div data-about-scroll-panel>
							<p className="text-section text-foreground md:max-w-[512px] md:text-[40px] md:leading-[1.4] md:font-black">
								{leadText}
							</p>
						</div>

						{blocks.map((block, index) => (
							<div
								key={block.id ?? `${block.title}-${index}`}
								ref={index === unpinPanelIndex ? beyondPanelRef : undefined}
								data-about-scroll-panel
							>
								<AboutContentBlock {...block} />
							</div>
						))}
					</div>
				</div>
			</HomeMainInner>
		</section>
	);
}
