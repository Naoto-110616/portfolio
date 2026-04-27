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
	/** placeholder 表示中（取得完了までスケルトンで高さを確保） */
	isPlaceholder?: boolean;
};

/** 実コンテンツと同じ段組・寸法を目安にしたスケルトン（取得後のレイアウトジャンプを抑える） */
function MoreProjectsSkeleton() {
	return (
		<div aria-busy="true" aria-hidden className="flex w-full flex-col gap-8 md:gap-10">
			<div className="w-full max-w-[110px] shrink-0 self-start md:max-w-[220px]">
				<div className="border-primary/10 bg-surface aspect-square w-full animate-pulse rounded-2xl border ring-1 ring-black/5" />
			</div>

			<div className="w-full shrink-0">
				<div className="flex flex-col gap-6 md:flex-row md:items-center md:gap-4">
					<div className="bg-surface aspect-361/203 w-full animate-pulse md:h-[279px] md:w-[496px] md:shrink-0" />
					<div className="flex w-full flex-col gap-4 md:min-h-[279px] md:flex-1 md:justify-between">
						<div className="flex flex-col gap-4 md:gap-4">
							<div className="flex items-end justify-between gap-4">
								<div className="bg-surface h-8 w-[min(280px,70%)] animate-pulse rounded" />
								<div className="bg-surface h-4 w-16 animate-pulse rounded md:h-5 md:w-20" />
							</div>
							<div className="bg-surface h-4 w-full max-w-[256px] animate-pulse rounded" />
							<div className="bg-surface h-4 w-full max-w-[200px] animate-pulse rounded" />
							<div className="grid grid-cols-2 gap-4 md:gap-0">
								<div className="bg-surface h-14 max-w-[256px] animate-pulse rounded" />
								<div className="bg-surface h-14 animate-pulse rounded" />
							</div>
						</div>
						<div className="bg-surface h-4 w-full max-w-[280px] animate-pulse rounded" />
					</div>
				</div>
			</div>
		</div>
	);
}

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
		const safeId = items.length > 0 ? Math.min(Math.max(1, activeTopId), items.length) : 1;
		const item = items[safeId - 1];
		return item ? toWorkItem(item) : null;
	}, [items, activeTopId]);

	return (
		<div className="flex w-full flex-col gap-8 md:gap-10">
			<div className="w-full max-w-[110px] shrink-0 self-start md:max-w-[220px]">
				<div className="relative aspect-square w-full">
					<Stack
						animationConfig={{ damping: 20, stiffness: 260 }}
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
				{activeWorkItem ? <ProjectWorkCard key={activeWorkItem.href} {...activeWorkItem} /> : null}
			</div>
		</div>
	);
}

export function MoreProjectsSection({
	title = "More Projects",
	items = [],
	isPlaceholder = false,
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

				{isPlaceholder ? (
					<MoreProjectsSkeleton />
				) : items.length > 0 ? (
					<MoreProjectsStackAndDetail key={stackKey} items={items} />
				) : null}
			</HomeMainInner>
		</section>
	);
}
