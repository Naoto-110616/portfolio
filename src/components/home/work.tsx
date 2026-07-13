"use client";

import { useMemo, useState } from "react";

import { ProjectWorkCard, type WorkItem } from "@/components/home/project-work-card";
import { AnimatedSectionTitle } from "@/components/motion/animated-section-title";
import { GsapStaggerGroup } from "@/components/motion/gsap-stagger-group";
import { HomeMainInner } from "@/components/ui/home-main-inner";

export type { WorkItem };

type WorkSectionProps = {
	title?: string;
	items?: WorkItem[];
	initialVisibleCount?: number;
	showMoreLabel?: string;
	showLessLabel?: string;
};

export function WorkSection({
	title = "Work",
	items = [],
	initialVisibleCount = 3,
	showMoreLabel = "もっと見る",
	showLessLabel = "表示を閉じる",
}: WorkSectionProps) {
	const [expanded, setExpanded] = useState(false);
	const visibleCount = Math.max(1, initialVisibleCount);
	const hasHiddenItems = items.length > visibleCount;
	const visibleItems = useMemo(
		() => (expanded || !hasHiddenItems ? items : items.slice(0, visibleCount)),
		[expanded, hasHiddenItems, items, visibleCount],
	);
	const hiddenCount = Math.max(0, items.length - visibleCount);

	return (
		<section id="work" className="w-full">
			<HomeMainInner className="md:gap-section-lg flex flex-col gap-6">
				<AnimatedSectionTitle title={title} titleClassName="md:text-section-lg md:font-black" />

				<GsapStaggerGroup className="gap-block-lg flex flex-col">
					{visibleItems.map((item, index) => (
						<div key={`${item.title}-${index}`} data-gsap-item>
							<ProjectWorkCard {...item} />
						</div>
					))}
				</GsapStaggerGroup>

				{hasHiddenItems ? (
					<div className="flex">
						<button
							type="button"
							className="text-caption text-primary md:text-body decoration-primary/50 inline-flex items-center gap-2 underline underline-offset-4 transition-opacity hover:opacity-80"
							onClick={() => setExpanded((previous) => !previous)}
						>
							{expanded ? showLessLabel : `${showMoreLabel}（追加枠 ${hiddenCount}件）`}
						</button>
					</div>
				) : null}
			</HomeMainInner>
		</section>
	);
}
