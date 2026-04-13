"use client";

import { useCallback, useEffect, useState } from "react";

import {
	ProjectWorkCard,
	type ProjectWorkCardExpandableProps,
} from "@/components/home/project-work-card";
import { AnimatedSectionTitle } from "@/components/motion/animated-section-title";
import { StaggerGroup } from "@/components/motion/stagger-group";
import { StaggerItem } from "@/components/motion/stagger-item";
import { useLenis } from "@/components/providers/lenis-context";
import { HomeMainInner } from "@/components/ui/home-main-inner";
import { WORK_CARD_IMAGE_URL } from "@/constans/const";

export type MoreProjectItem = Omit<
	ProjectWorkCardExpandableProps,
	"variant" | "expanded" | "onOpenRequest" | "onCloseRequest" | "showCloseButton"
>;

type MoreProjectsSectionProps = {
	title?: string;
	items?: MoreProjectItem[];
};

const defaultItems: MoreProjectItem[] = [
	{
		title: "Project Alpha",
		description: "コーポレートサイトのリニューアルとデザインシステム整備。",
		with: "Client A",
		published: "2025",
		role: "Frontend",
		stack: "Next.js, TypeScript",
		tag: "web",
		imageUrl: WORK_CARD_IMAGE_URL,
		href: "#",
		closedImageHeight: 85.5,
		imageAlt: "Project preview 1",
	},
	{
		title: "Project Beta",
		description: "ヘッドレスCMSを用いたメディア基盤の構築。",
		with: "Client B",
		published: "2024",
		role: "Lead Dev",
		stack: "Contentful, React",
		tag: "cms",
		imageUrl: WORK_CARD_IMAGE_URL,
		href: "#",
		closedImageHeight: 101.5,
		imageAlt: "Project preview 2",
	},
	{
		title: "Project Gamma",
		description: "EC向けカスタムテーマとパフォーマンス最適化。",
		with: "Client C",
		published: "2024",
		role: "Shopify",
		stack: "Shopify, Liquid",
		tag: "commerce",
		imageUrl: WORK_CARD_IMAGE_URL,
		href: "#",
		closedImageHeight: 101.5,
		imageAlt: "Project preview 3",
	},
	{
		title: "Project Delta",
		description: "インタラクティブなランディングページ。",
		with: "Client D",
		published: "2023",
		role: "Creative Dev",
		stack: "GSAP, Three.js",
		tag: "interactive",
		imageUrl: WORK_CARD_IMAGE_URL,
		href: "#",
		closedImageHeight: 101.5,
		imageAlt: "Project preview 4",
	},
	{
		title: "Project Epsilon",
		description: "管理画面のUI共通化とテーブルコンポーネント。",
		with: "Client E",
		published: "2023",
		role: "Frontend",
		stack: "TanStack Table, shadcn",
		tag: "admin",
		imageUrl: WORK_CARD_IMAGE_URL,
		href: "#",
		closedImageHeight: 101.5,
		imageAlt: "Project preview 5",
	},
	{
		title: "Project Zeta",
		description: "アクセシビリティを意識したコンポーネントライブラリ。",
		with: "Client F",
		published: "2023",
		role: "UI Engineer",
		stack: "React, Storybook",
		tag: "a11y",
		imageUrl: WORK_CARD_IMAGE_URL,
		href: "#",
		closedImageHeight: 101.5,
		imageAlt: "Project preview 6",
	},
];

export function MoreProjectsSection({
	title = "More Projects",
	items = defaultItems,
}: MoreProjectsSectionProps) {
	const lenis = useLenis();
	const [allExpanded, setAllExpanded] = useState(false);

	const handleOpenCard = useCallback(() => {
		setAllExpanded(true);
	}, []);

	const handleCloseAll = useCallback(() => {
		setAllExpanded(false);
	}, []);

	useEffect(() => {
		if (!allExpanded) return;

		const onScrollIntentClose = () => {
			handleCloseAll();
		};

		const onKeyDown = (e: KeyboardEvent) => {
			const keys = new Set(["ArrowDown", "ArrowUp", "PageDown", "PageUp", " ", "Home", "End"]);
			if (keys.has(e.key)) {
				handleCloseAll();
			}
		};
		window.addEventListener("keydown", onKeyDown);

		const wheelOpts: AddEventListenerOptions = { passive: true };
		let unsubVirtualScroll: (() => void) | undefined;

		if (lenis) {
			unsubVirtualScroll = lenis.on("virtual-scroll", onScrollIntentClose);
		} else {
			window.addEventListener("wheel", onScrollIntentClose, wheelOpts);
			window.addEventListener("touchmove", onScrollIntentClose, wheelOpts);
		}

		return () => {
			window.removeEventListener("keydown", onKeyDown);
			unsubVirtualScroll?.();
			window.removeEventListener("wheel", onScrollIntentClose);
			window.removeEventListener("touchmove", onScrollIntentClose);
		};
	}, [allExpanded, lenis, handleCloseAll]);

	return (
		<section className="w-full">
			<HomeMainInner className="gap-stack-sm md:gap-section-lg flex flex-col">
				<AnimatedSectionTitle
					title={title}
					titleClassName="text-heading md:text-section-lg md:font-black"
					withDivider
				/>

				<StaggerGroup
					className="gap-stack-sm md:gap-block-lg flex w-full flex-col overflow-hidden"
					delayChildren={0.08}
					staggerChildren={0.1}
				>
					{items.map((item, index) => (
						<StaggerItem key={`${item.title}-${index}`}>
							<div className="w-full">
								<ProjectWorkCard
									{...item}
									expanded={allExpanded}
									showCloseButton={false}
									variant="expandable"
									onOpenRequest={handleOpenCard}
								/>
							</div>
						</StaggerItem>
					))}
				</StaggerGroup>
			</HomeMainInner>
		</section>
	);
}
