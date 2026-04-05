import type { CSSProperties } from "react";

import { AnimatedSectionTitle } from "@/components/motion/animated-section-title";
import { StaggerGroup } from "@/components/motion/stagger-group";
import { StaggerItem } from "@/components/motion/stagger-item";

type MoreProjectItem = {
	imageUrl: string;
	height: number;
	href: string;
	alt: string;
};

type MoreProjectsSectionProps = {
	items?: MoreProjectItem[];
};

const moreProjectsPreviewImage =
	"https://www.figma.com/api/mcp/asset/a55382d9-c6ac-4dbb-b366-268d7183254a";

const defaultItems: MoreProjectItem[] = [
	{
		imageUrl: moreProjectsPreviewImage,
		height: 85.5,
		href: "#",
		alt: "Project preview 1",
	},
	{
		imageUrl: moreProjectsPreviewImage,
		height: 101.5,
		href: "#",
		alt: "Project preview 2",
	},
	{
		imageUrl: moreProjectsPreviewImage,
		height: 101.5,
		href: "#",
		alt: "Project preview 3",
	},
	{
		imageUrl: moreProjectsPreviewImage,
		height: 101.5,
		href: "#",
		alt: "Project preview 4",
	},
	{
		imageUrl: moreProjectsPreviewImage,
		height: 101.5,
		href: "#",
		alt: "Project preview 5",
	},
	{
		imageUrl: moreProjectsPreviewImage,
		height: 101.5,
		href: "#",
		alt: "Project preview 6",
	},
];

function MoreProjectCard({ imageUrl, height, href, alt }: MoreProjectItem) {
	const style = {
		"--card-height": `${height}px`,
	} as CSSProperties;

	return (
		<a
			className="block w-full overflow-hidden transition-opacity hover:opacity-90 md:mx-auto md:w-[512px]"
			href={href}
			style={style}
		>
			<img
				alt={alt}
				className="h-(--card-height) w-full object-cover md:h-[130px]"
				src={imageUrl}
			/>
		</a>
	);
}

export function MoreProjectsSection({
	items = defaultItems,
}: MoreProjectsSectionProps) {
	return (
		<section className="flex w-full flex-col gap-stack-sm md:gap-section-lg">
			<AnimatedSectionTitle
				title="More Projects"
				titleClassName="text-heading md:text-section-lg md:font-black"
				withDivider
			/>

			<StaggerGroup
				className="flex w-full flex-col gap-stack-sm overflow-hidden md:gap-block-lg"
				delayChildren={0.08}
				staggerChildren={0.1}
			>
				{items.map((item, index) => (
					<StaggerItem key={`${item.alt}-${index}`}>
						<MoreProjectCard {...item} />
					</StaggerItem>
				))}
			</StaggerGroup>
		</section>
	);
}
