"use client";

import { useMemo, useState } from "react";

import {
	type ProjectWorkCardExpandableProps,
	ProjectWorkCard,
	ProjectWorkStackThumb,
	type WorkItem,
} from "@/components/home/project-work-card";
import { AnimatedSectionTitle } from "@/components/motion/animated-section-title";
import { HomeMainInner } from "@/components/ui/home-main-inner";
import Stack from "@/components/ui/stack";

export type MoreProjectItem = Omit<
	ProjectWorkCardExpandableProps,
	"variant" | "expanded" | "onOpenRequest" | "onCloseRequest" | "showCloseButton"
>;

type MoreProjectsSectionProps = {
	title?: string;
	items?: MoreProjectItem[];
};

function toWorkItem(item: MoreProjectItem): WorkItem {
	return {
		title: item.title,
		description: item.description,
		with: item.with,
		published: item.published,
		role: item.role,
		stack: item.stack,
		tag: item.tag,
		imageUrl: item.imageUrl,
		href: item.href,
	};
}

/** `key={stackKey}` でリマウントし、積みと選択 id をデータ変更に合わせて初期化 */
function MoreProjectsStackAndDetail({ items }: { items: MoreProjectItem[] }) {
	const [activeTopId, setActiveTopId] = useState(() => items.length);

	const stackCards = useMemo(
		() =>
			items.map((item, index) => (
				<ProjectWorkStackThumb
					key={`${item.href}-${index}`}
					imageAlt={item.imageAlt}
					imageUrl={item.imageUrl}
				/>
			)),
		[items],
	);

	const activeWorkItem = useMemo((): WorkItem | null => {
		const safeId =
			items.length > 0
				? Math.min(Math.max(1, activeTopId), items.length)
				: 1;
		const item = items[safeId - 1];
		return item ? toWorkItem(item) : null;
	}, [items, activeTopId]);

	return (
		<div className="flex w-full flex-col gap-8 md:gap-10">
			<div className="w-full max-w-[220px] shrink-0 self-start">
				<div className="relative aspect-square w-full">
					<Stack
						animationConfig={{ damping: 20, stiffness: 260 }}
						autoplay
						autoplayDelay={4000}
						cards={stackCards}
						pauseOnHover
						randomRotation={false}
						sendToBackOnClick
						sensitivity={200}
						onTopChange={setActiveTopId}
					/>
				</div>
			</div>

			<div className="w-full shrink-0">
				{activeWorkItem ? (
					<ProjectWorkCard key={activeWorkItem.href} {...activeWorkItem} />
				) : null}
			</div>
		</div>
	);
}

export function MoreProjectsSection({
	title = "More Projects",
	items = [],
}: MoreProjectsSectionProps) {
	const stackKey = useMemo(() => items.map((item) => item.href).join("|"), [items]);

	return (
		<section className="w-full">
			<HomeMainInner className="gap-stack-sm md:gap-section-lg flex flex-col">
				<AnimatedSectionTitle
					title={title}
					titleClassName="text-heading md:text-section-lg md:font-black"
					withDivider
				/>

				{items.length > 0 ? (
					<MoreProjectsStackAndDetail key={stackKey} items={items} />
				) : null}
			</HomeMainInner>
		</section>
	);
}
