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

export type MoreProjectItem = Omit<
	ProjectWorkCardExpandableProps,
	"variant" | "expanded" | "onOpenRequest" | "onCloseRequest" | "showCloseButton"
>;

type MoreProjectsSectionProps = {
	title?: string;
	items?: MoreProjectItem[];
};

export function MoreProjectsSection({
	title = "More Projects",
	items = [],
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
