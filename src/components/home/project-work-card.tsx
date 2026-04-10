"use client";

import { ArrowRight } from "lucide-react";
import type { CSSProperties } from "react";
import { useId, useLayoutEffect, useState } from "react";

import { ScrollVelocityWorkImage } from "@/components/home/scroll-velocity-work-image";
import { RollingText } from "@/components/ui/rolling-text";
import { ScrollTrigger } from "@/lib/gsap";

export type WorkItem = {
	title: string;
	description: string;
	partner: string;
	published: string;
	role: string;
	stack: string;
	tag: string;
	imageUrl: string;
	href: string;
};

type ProjectWorkCardStaticProps = WorkItem & {
	variant?: "static";
};

export type ProjectWorkCardExpandableProps = WorkItem & {
	variant: "expandable";
	closedImageHeight: number;
	imageAlt: string;
	/** 指定時は親が開閉を管理（More Projects の一斉展開など） */
	expanded?: boolean;
	onOpenRequest?: () => void;
	onCloseRequest?: () => void;
	/** false のとき開いた状態でも閉じるボタンを出さない（親が別手段で閉じる） */
	showCloseButton?: boolean;
};

export type ProjectWorkCardProps =
	| ProjectWorkCardStaticProps
	| ProjectWorkCardExpandableProps;

function isExpandable(
	props: ProjectWorkCardProps,
): props is ProjectWorkCardExpandableProps {
	return props.variant === "expandable";
}

export function ProjectWorkCard(props: ProjectWorkCardProps) {
	const expandable = isExpandable(props);
	const controlledExpandable =
		expandable && props.expanded !== undefined;
	const [internalOpen, setInternalOpen] = useState(false);
	const open = controlledExpandable
		? Boolean(props.expanded)
		: internalOpen;
	const panelId = useId();

	const {
		title,
		description,
		partner,
		published,
		role,
		stack,
		tag,
		imageUrl,
		href,
	} = props;

	const previewAlt = expandable ? props.imageAlt : `${title} preview`;

	const closedStyle = (
		expandable && !open
			? { "--card-height": `${props.closedImageHeight}px` }
			: undefined
	) as CSSProperties | undefined;

	useLayoutEffect(() => {
		if (!expandable) return;
		const id = requestAnimationFrame(() => {
			ScrollTrigger.refresh();
		});
		return () => cancelAnimationFrame(id);
	}, [expandable, open]);

	const detailBlock = (
		<div className="flex flex-col gap-4 pt-0 md:min-h-[279px] md:flex-1 md:justify-between">
			<div className="flex flex-col gap-4 md:gap-4">
				<div className="flex items-end justify-between gap-4">
					<h3 className="text-heading text-foreground md:text-[40px] md:font-bold md:leading-none">
						{title}
					</h3>

					<a
						className="group inline-flex items-center gap-1 text-caption text-foreground transition-opacity hover:opacity-80 md:text-body md:leading-normal"
						href={href}
						target={href.startsWith("http") ? "_blank" : undefined}
						rel={href.startsWith("http") ? "noreferrer" : undefined}
					>
						<RollingText text="Visit site" />
						<ArrowRight
							aria-hidden="true"
							className="size-3 shrink-0 -rotate-45 md:size-4"
							strokeWidth={2}
						/>
					</a>
				</div>

				<p className="max-w-[180.5px] text-caption leading-normal text-primary md:max-w-[256px] md:text-body">
					{description}
				</p>

				<div className="flex flex-col gap-1 text-caption leading-none md:text-body">
					<p className="text-foreground md:leading-normal">with:</p>
					<p className="text-caption-sm text-primary md:text-caption">
						{partner}
					</p>
				</div>

				<div className="grid grid-cols-2 gap-4 md:gap-0">
					<div className="flex flex-col gap-1 text-caption leading-none md:w-[256px] md:text-body">
						<p className="text-foreground md:leading-normal">Published:</p>
						<p className="text-caption-sm text-primary md:text-caption">
							{published}
						</p>
					</div>

					<div className="flex flex-col gap-1 text-caption leading-none md:text-body">
						<p className="text-foreground md:leading-normal">Role:</p>
						<p className="text-caption-sm text-primary md:text-caption">
							{role}
						</p>
					</div>
				</div>
			</div>

			<p className="text-caption leading-none text-foreground md:text-caption md:self-start">
				{stack}
			</p>
		</div>
	);

	const imageBlock = (
		<div className="relative aspect-361/203 w-full overflow-hidden bg-surface md:h-[279px] md:w-[496px] md:shrink-0 md:aspect-auto">
			<ScrollVelocityWorkImage
				alt={previewAlt}
				className="absolute inset-0 z-0 h-full w-full"
				imageUrl={imageUrl}
			/>

			<div className="absolute right-2 top-2 z-10 border border-primary bg-accent px-1 py-1 text-caption-sm leading-none text-primary">
				{tag}
			</div>
		</div>
	);

	const openArticle = (
		<article
			className="flex flex-col gap-6 md:flex-row md:items-center md:gap-4"
			id={expandable ? panelId : undefined}
		>
			{imageBlock}
			{detailBlock}
		</article>
	);

	if (!expandable) {
		return openArticle;
	}

	if (!open) {
		return (
			<div className="w-full md:mx-auto md:w-[512px]">
				<button
					type="button"
					aria-controls={panelId}
					aria-expanded="false"
					className="block w-full cursor-pointer overflow-hidden text-left transition-opacity hover:opacity-90"
					style={closedStyle}
					onClick={() =>
						controlledExpandable
							? props.onOpenRequest?.()
							: setInternalOpen(true)
					}
				>
					<div className="relative h-(--card-height) w-full overflow-hidden bg-surface md:h-[130px]">
						<ScrollVelocityWorkImage
							alt={previewAlt}
							className="absolute inset-0 z-0 h-full w-full"
							imageUrl={imageUrl}
						/>

						<div className="absolute right-2 top-2 z-10 border border-primary bg-accent px-1 py-1 text-caption-sm leading-none text-primary">
							{tag}
						</div>
					</div>
					<span className="sr-only">
						{title}の詳細を開く
					</span>
				</button>
			</div>
		);
	}

	const showClose =
		expandable && (props.showCloseButton !== false);

	return (
		<div className="w-full">
			{showClose ? (
				<div className="mb-2 flex justify-end md:mb-3">
					<button
						type="button"
						aria-controls={panelId}
						aria-expanded="true"
						className="text-caption text-primary underline decoration-primary/50 underline-offset-4 transition-opacity hover:opacity-80 md:text-body"
						onClick={() =>
							controlledExpandable
								? props.onCloseRequest?.()
								: setInternalOpen(false)
						}
					>
						閉じる
					</button>
				</div>
			) : null}
			{openArticle}
		</div>
	);
}
