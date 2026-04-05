import { ArrowRight } from "lucide-react";

import { AnimatedSectionTitle } from "@/components/motion/animated-section-title";
import { GsapStaggerGroup } from "@/components/motion/gsap-stagger-group";

type WorkItem = {
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

type WorkSectionProps = {
	items?: WorkItem[];
};

const workPreviewImage =
	"https://www.figma.com/api/mcp/asset/f7b1a698-5cc0-4044-805e-39ed777c4ad0";

const defaultItems: WorkItem[] = Array.from({ length: 3 }, () => ({
	title: "muwmaze",
	description: "ウィキメディア文書の適法ををこと要件改変に方針助け理解しライセン。",
	partner: "KOSÉ",
	published: "2025",
	role: "Frontend Creative",
	stack: "shopify,React",
	tag: "shopify",
	imageUrl: workPreviewImage,
	href: "#",
}));

function WorkCard({
	title,
	description,
	partner,
	published,
	role,
	stack,
	tag,
	imageUrl,
	href,
}: WorkItem) {
	return (
		<article className="flex flex-col gap-6">
			<div className="relative aspect-361/203 w-full overflow-hidden bg-surface">
				<img
					alt={`${title} preview`}
					className="h-full w-full object-cover"
					src={imageUrl}
				/>

				<div className="absolute right-2 top-2 border border-primary bg-accent px-1 py-1 text-caption-sm leading-none text-primary">
					{tag}
				</div>
			</div>

			<div className="flex flex-col gap-4 pt-0">
				<div className="flex items-end justify-between gap-4">
					<h3 className="text-heading text-foreground">{title}</h3>

					<a
						className="inline-flex items-center gap-1 text-caption text-foreground transition-opacity hover:opacity-80"
						href={href}
						target={href.startsWith("http") ? "_blank" : undefined}
						rel={href.startsWith("http") ? "noreferrer" : undefined}
					>
						<span>Visit site</span>
						<ArrowRight
							aria-hidden="true"
							className="size-3 shrink-0 -rotate-45"
							strokeWidth={2}
						/>
					</a>
				</div>

				<p className="max-w-[180.5px] text-caption leading-normal text-primary">
					{description}
				</p>

				<div className="flex flex-col gap-1 text-caption leading-none">
					<p className="text-foreground">with:</p>
					<p className="text-caption-sm text-primary">{partner}</p>
				</div>

				<div className="grid grid-cols-2 gap-4">
					<div className="flex flex-col gap-1 text-caption leading-none">
						<p className="text-foreground">Published:</p>
						<p className="text-caption-sm text-primary">{published}</p>
					</div>

					<div className="flex flex-col gap-1 text-caption leading-none">
						<p className="text-foreground">Role:</p>
						<p className="text-caption-sm text-primary">{role}</p>
					</div>
				</div>

				<p className="text-caption leading-none text-foreground">{stack}</p>
			</div>
		</article>
	);
}

export function WorkSection({ items = defaultItems }: WorkSectionProps) {
	return (
		<section id="work" className="flex w-full flex-col gap-6">
			<AnimatedSectionTitle title="Work" />

			<GsapStaggerGroup className="flex flex-col gap-6">
				{items.map((item, index) => (
					<div key={`${item.title}-${index}`} data-gsap-item>
						<WorkCard {...item} />
					</div>
				))}
			</GsapStaggerGroup>
		</section>
	);
}
