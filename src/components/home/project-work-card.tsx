"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import type { CSSProperties } from "react";
import { useId, useLayoutEffect, useState } from "react";

import { ScrollVelocityWorkImage } from "@/components/home/scroll-velocity-work-image";
import { RollingText } from "@/components/ui/rolling-text";
import { ScrollTrigger } from "@/lib/gsap";

export type WorkItem = {
	title: string;
	description: string;
	with: string;
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

export type ProjectWorkCardProps = ProjectWorkCardStaticProps | ProjectWorkCardExpandableProps;

function isExpandable(props: ProjectWorkCardProps): props is ProjectWorkCardExpandableProps {
	return props.variant === "expandable";
}

const expandEase = [0.22, 1, 0.36, 1] as const;
const expandTransition = { duration: 0.45, ease: expandEase };

function WorkCardImageMedia({
	imageUrl,
	previewAlt,
	title,
	tag,
}: {
	imageUrl: string;
	previewAlt: string;
	title: string;
	tag: string;
}) {
	const tagOverlay = (
		<span className="border-primary bg-accent text-caption-sm text-primary border px-1 py-1 leading-none">
			{tag}
		</span>
	);

	return (
		<ScrollVelocityWorkImage
			alt={previewAlt}
			className="absolute inset-0 z-0 h-full w-full"
			imageUrl={imageUrl}
			tiltCaption={title}
			tiltOverlay={tagOverlay}
		/>
	);
}

function WorkCardDetailFields({
	title,
	description,
	with: withName,
	published,
	role,
	stack,
	href,
}: WorkItem) {
	return (
		<div className="flex flex-col gap-4 pt-0 md:min-h-[279px] md:flex-1 md:justify-between">
			<div className="flex flex-col gap-4 md:gap-4">
				<div className="flex items-end justify-between gap-4">
					<h3 className="text-heading text-foreground md:text-[40px] md:leading-none md:font-bold">
						{title}
					</h3>

					<a
						className="group text-caption text-foreground md:text-body inline-flex items-center gap-1 transition-opacity hover:opacity-80 md:leading-normal"
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

				<p className="text-caption text-primary md:text-body leading-normal md:max-w-[256px]">
					{description}
				</p>

				<div className="text-caption md:text-body flex flex-col gap-1 leading-none">
					<p className="text-foreground md:leading-normal">with:</p>
					<p className="text-caption-sm text-primary md:text-caption">{withName}</p>
				</div>

				<div className="grid grid-cols-2 gap-4 md:gap-0">
					<div className="text-caption md:text-body flex flex-col gap-1 leading-none md:w-[256px]">
						<p className="text-foreground md:leading-normal">Published:</p>
						<p className="text-caption-sm text-primary md:text-caption">{published}</p>
					</div>

					<div className="text-caption md:text-body flex flex-col gap-1 leading-none">
						<p className="text-foreground md:leading-normal">Role:</p>
						<p className="text-caption-sm text-primary md:text-caption">{role}</p>
					</div>
				</div>
			</div>

			<p className="text-caption text-foreground md:text-caption leading-normal md:self-start">
				{stack}
			</p>
		</div>
	);
}

export type ProjectWorkStackThumbProps = {
	imageUrl: string;
	imageAlt: string;
};

/** More Projects の Stack 用。装飾なしの静止画像（タグ・ホバー演出なし） */
export function ProjectWorkStackThumb({ imageUrl, imageAlt }: ProjectWorkStackThumbProps) {
	return (
		<div className="border-primary/20 bg-surface pointer-events-auto h-full w-full overflow-hidden rounded-2xl border shadow-lg ring-1 ring-black/10">
			<div className="relative aspect-square h-full w-full">
				<Image
					alt={imageAlt}
					className="pointer-events-none object-cover select-none"
					draggable={false}
					fill
					sizes="220px"
					src={imageUrl}
				/>
			</div>
		</div>
	);
}

export function ProjectWorkCard(props: ProjectWorkCardProps) {
	const expandable = isExpandable(props);
	const controlledExpandable = expandable && props.expanded !== undefined;
	const [internalOpen, setInternalOpen] = useState(false);
	const open = controlledExpandable ? Boolean(props.expanded) : internalOpen;
	const panelId = useId();
	const reduceMotion = useReducedMotion();
	const allowExpandMotion = !reduceMotion;

	const { title, description, with: withName, published, role, stack, tag, imageUrl, href } = props;
	const mediaLayoutId = `project-work-media-${href}`;

	const previewAlt = expandable ? props.imageAlt : `${title} preview`;

	const closedStyle = (
		expandable && !open ? { "--card-height": `${props.closedImageHeight}px` } : undefined
	) as CSSProperties | undefined;

	useLayoutEffect(() => {
		if (!expandable) return;
		const id = requestAnimationFrame(() => {
			ScrollTrigger.refresh();
		});
		return () => cancelAnimationFrame(id);
	}, [expandable, open]);

	const detailBlock = (
		<WorkCardDetailFields
			description={description}
			href={href}
			imageUrl={imageUrl}
			published={published}
			role={role}
			stack={stack}
			tag={tag}
			title={title}
			with={withName}
		/>
	);

	const imageMediaInner = (
		<WorkCardImageMedia imageUrl={imageUrl} previewAlt={previewAlt} tag={tag} title={title} />
	);

	const imageBlock = (
		<div className="bg-surface relative aspect-361/203 w-full overflow-hidden md:aspect-auto md:h-[279px] md:w-[496px] md:shrink-0 md:overflow-visible">
			{imageMediaInner}
		</div>
	);

	const expandableOpenImage = (
		<motion.div
			className="bg-surface relative aspect-361/203 w-full overflow-hidden md:aspect-auto md:h-[279px] md:w-[496px] md:shrink-0 md:overflow-visible"
			layoutId={allowExpandMotion ? mediaLayoutId : undefined}
			transition={{ layout: expandTransition }}
		>
			{imageMediaInner}
		</motion.div>
	);

	const openArticle = (
		<article
			className="flex flex-col gap-6 md:flex-row md:items-center md:gap-4"
			id={expandable ? panelId : undefined}
		>
			{expandable ? expandableOpenImage : imageBlock}
			{expandable ? (
				<motion.div
					className="w-full md:min-w-0 md:flex-1"
					initial={allowExpandMotion ? { opacity: 0, y: 18 } : false}
					animate={{ opacity: 1, y: 0 }}
					transition={allowExpandMotion ? expandTransition : { duration: 0 }}
				>
					{detailBlock}
				</motion.div>
			) : (
				detailBlock
			)}
		</article>
	);

	if (!expandable) {
		return openArticle;
	}

	if (!open) {
		return (
			<motion.div
				className="w-full md:mx-auto md:w-[512px]"
				layout={allowExpandMotion}
				transition={{ layout: expandTransition }}
			>
				<button
					type="button"
					aria-controls={panelId}
					aria-expanded="false"
					className="block w-full cursor-pointer overflow-hidden text-left transition-opacity hover:opacity-90 md:overflow-visible"
					style={closedStyle}
					onClick={() => (controlledExpandable ? props.onOpenRequest?.() : setInternalOpen(true))}
				>
					<motion.div
						className="bg-surface relative h-(--card-height) w-full overflow-hidden md:h-[130px] md:overflow-visible"
						layoutId={allowExpandMotion ? mediaLayoutId : undefined}
						transition={{ layout: expandTransition }}
					>
						{imageMediaInner}
					</motion.div>
					<span className="sr-only">{title}の詳細を開く</span>
				</button>
			</motion.div>
		);
	}

	const showClose = expandable && props.showCloseButton !== false;

	return (
		<motion.div
			className="w-full"
			layout={allowExpandMotion}
			transition={{ layout: expandTransition }}
		>
			{showClose ? (
				<div className="mb-2 flex justify-end md:mb-3">
					<button
						type="button"
						aria-controls={panelId}
						aria-expanded="true"
						className="text-caption text-primary decoration-primary/50 md:text-body underline underline-offset-4 transition-opacity hover:opacity-80"
						onClick={() =>
							controlledExpandable ? props.onCloseRequest?.() : setInternalOpen(false)
						}
					>
						閉じる
					</button>
				</div>
			) : null}
			{openArticle}
		</motion.div>
	);
}
