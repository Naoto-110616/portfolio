"use client";

import type Lenis from "lenis";
import {
	useCallback,
	useEffect,
	useLayoutEffect,
	useRef,
	useState,
} from "react";

import {
	ProjectWorkCard,
	type ProjectWorkCardExpandableProps,
} from "@/components/home/project-work-card";
import { AnimatedSectionTitle } from "@/components/motion/animated-section-title";
import { StaggerGroup } from "@/components/motion/stagger-group";
import { StaggerItem } from "@/components/motion/stagger-item";
import { useLenis } from "@/components/providers/lenis-context";
import { HomeMainInner } from "@/components/ui/home-main-inner";
import { ScrollTrigger } from "@/lib/gsap";

export type MoreProjectItem = Omit<
	ProjectWorkCardExpandableProps,
	| "variant"
	| "expanded"
	| "onOpenRequest"
	| "onCloseRequest"
	| "showCloseButton"
>;

type MoreProjectsSectionProps = {
	title?: string;
	items?: MoreProjectItem[];
};

/** 中央寄せスクロール完了後に呼ぶ（開いた直後の自動スクロールとユーザー操作を区別する） */
function scrollCardToViewportCenter(
	element: HTMLElement,
	lenis: Lenis | null,
	onScrollAnimationDone?: () => void,
) {
	const reduceMotion = window.matchMedia(
		"(prefers-reduced-motion: reduce)",
	).matches;

	const signalDone = () => {
		onScrollAnimationDone?.();
	};

	if (lenis && !reduceMotion) {
		const rect = element.getBoundingClientRect();
		const delta = rect.top + rect.height / 2 - window.innerHeight / 2;
		lenis.scrollTo(lenis.scroll + delta, {
			duration: 1.15,
			easing: (t) => 1 - Math.pow(1 - t, 3),
			onComplete: signalDone,
		});
		return;
	}

	element.scrollIntoView({
		behavior: reduceMotion ? "auto" : "smooth",
		block: "center",
	});
	setTimeout(signalDone, reduceMotion ? 0 : 550);
}

const SCROLL_CLOSE_ARM_DELAY_MS = 100;

const moreProjectsPreviewImage =
	"https://www.figma.com/api/mcp/asset/a55382d9-c6ac-4dbb-b366-268d7183254a";

const defaultItems: MoreProjectItem[] = [
	{
		title: "Project Alpha",
		description: "コーポレートサイトのリニューアルとデザインシステム整備。",
		partner: "Client A",
		published: "2025",
		role: "Frontend",
		stack: "Next.js, TypeScript",
		tag: "web",
		imageUrl: moreProjectsPreviewImage,
		href: "#",
		closedImageHeight: 85.5,
		imageAlt: "Project preview 1",
	},
	{
		title: "Project Beta",
		description: "ヘッドレスCMSを用いたメディア基盤の構築。",
		partner: "Client B",
		published: "2024",
		role: "Lead Dev",
		stack: "Contentful, React",
		tag: "cms",
		imageUrl: moreProjectsPreviewImage,
		href: "#",
		closedImageHeight: 101.5,
		imageAlt: "Project preview 2",
	},
	{
		title: "Project Gamma",
		description: "EC向けカスタムテーマとパフォーマンス最適化。",
		partner: "Client C",
		published: "2024",
		role: "Shopify",
		stack: "Shopify, Liquid",
		tag: "commerce",
		imageUrl: moreProjectsPreviewImage,
		href: "#",
		closedImageHeight: 101.5,
		imageAlt: "Project preview 3",
	},
	{
		title: "Project Delta",
		description: "インタラクティブなランディングページ。",
		partner: "Client D",
		published: "2023",
		role: "Creative Dev",
		stack: "GSAP, Three.js",
		tag: "interactive",
		imageUrl: moreProjectsPreviewImage,
		href: "#",
		closedImageHeight: 101.5,
		imageAlt: "Project preview 4",
	},
	{
		title: "Project Epsilon",
		description: "管理画面のUI共通化とテーブルコンポーネント。",
		partner: "Client E",
		published: "2023",
		role: "Frontend",
		stack: "TanStack Table, shadcn",
		tag: "admin",
		imageUrl: moreProjectsPreviewImage,
		href: "#",
		closedImageHeight: 101.5,
		imageAlt: "Project preview 5",
	},
	{
		title: "Project Zeta",
		description: "アクセシビリティを意識したコンポーネントライブラリ。",
		partner: "Client F",
		published: "2023",
		role: "UI Engineer",
		stack: "React, Storybook",
		tag: "a11y",
		imageUrl: moreProjectsPreviewImage,
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
	const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
	const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
	const scrollCloseArmedRef = useRef(false);
	const armCloseTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

	const handleOpenCard = useCallback((index: number) => {
		setFocusedIndex(index);
		setAllExpanded(true);
	}, []);

	const handleCloseAll = useCallback(() => {
		setAllExpanded(false);
		setFocusedIndex(null);
		scrollCloseArmedRef.current = false;
		if (armCloseTimerRef.current) {
			clearTimeout(armCloseTimerRef.current);
			armCloseTimerRef.current = null;
		}
	}, []);

	useLayoutEffect(() => {
		scrollCloseArmedRef.current = false;
		if (armCloseTimerRef.current) {
			clearTimeout(armCloseTimerRef.current);
			armCloseTimerRef.current = null;
		}

		if (!allExpanded || focusedIndex === null) return;
		const el = rowRefs.current[focusedIndex];
		if (!el) return;

		ScrollTrigger.refresh();

		const fallbackArm = setTimeout(() => {
			scrollCloseArmedRef.current = true;
		}, 1400);

		const id = requestAnimationFrame(() => {
			requestAnimationFrame(() => {
				scrollCardToViewportCenter(el, lenis, () => {
					if (armCloseTimerRef.current) {
						clearTimeout(armCloseTimerRef.current);
					}
					armCloseTimerRef.current = setTimeout(() => {
						scrollCloseArmedRef.current = true;
						armCloseTimerRef.current = null;
					}, SCROLL_CLOSE_ARM_DELAY_MS);
				});
			});
		});

		return () => {
			cancelAnimationFrame(id);
			clearTimeout(fallbackArm);
			if (armCloseTimerRef.current) {
				clearTimeout(armCloseTimerRef.current);
				armCloseTimerRef.current = null;
			}
		};
	}, [allExpanded, focusedIndex, lenis]);

	useEffect(() => {
		if (!allExpanded) return;

		const onScrollIntentClose = () => {
			if (!scrollCloseArmedRef.current) return;
			handleCloseAll();
		};

		const onKeyDown = (e: KeyboardEvent) => {
			if (!scrollCloseArmedRef.current) return;
			const keys = new Set([
				"ArrowDown",
				"ArrowUp",
				"PageDown",
				"PageUp",
				" ",
				"Home",
				"End",
			]);
			if (keys.has(e.key)) {
				handleCloseAll();
			}
		};
		window.addEventListener("keydown", onKeyDown);

		const wheelOpts: AddEventListenerOptions = { passive: true };
		let unsubVirtualScroll: (() => void) | undefined;

		if (lenis) {
			unsubVirtualScroll = lenis.on(
				"virtual-scroll",
				onScrollIntentClose,
			);
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
			<HomeMainInner className="flex flex-col gap-stack-sm md:gap-section-lg">
				<AnimatedSectionTitle
					title={title}
					titleClassName="text-heading md:text-section-lg md:font-black"
					withDivider
				/>

				<StaggerGroup
					className="flex w-full flex-col gap-stack-sm overflow-hidden md:gap-block-lg"
					delayChildren={0.08}
					staggerChildren={0.1}
				>
					{items.map((item, index) => (
						<StaggerItem key={`${item.title}-${index}`}>
							<div
								className="w-full"
								ref={(node) => {
									rowRefs.current[index] = node;
								}}
							>
								<ProjectWorkCard
									{...item}
									expanded={allExpanded}
									showCloseButton={false}
									variant="expandable"
									onOpenRequest={() => handleOpenCard(index)}
								/>
							</div>
						</StaggerItem>
					))}
				</StaggerGroup>
			</HomeMainInner>
		</section>
	);
}
