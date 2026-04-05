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
		<article className="flex flex-col gap-6 md:flex-row md:items-center md:gap-4">
			<div className="relative aspect-361/203 w-full overflow-hidden bg-surface md:h-[279px] md:w-[496px] md:shrink-0 md:aspect-auto">
				<img
					alt={`${title} preview`}
					className="h-full w-full object-cover"
					src={imageUrl}
				/>

				<div className="absolute right-2 top-2 border border-primary bg-accent px-1 py-1 text-caption-sm leading-none text-primary">
					{tag}
				</div>
			</div>

			<div className="flex flex-col gap-4 pt-0 md:min-h-[279px] md:flex-1 md:justify-between">
				<div className="flex flex-col gap-4 md:gap-4">
					<div className="flex items-end justify-between gap-4">
						<h3 className="text-heading text-foreground md:text-[40px] md:font-bold md:leading-none">
							{title}
						</h3>

						<a
							className="inline-flex items-center gap-1 text-caption text-foreground transition-opacity hover:opacity-80 md:text-body md:leading-normal"
							href={href}
							target={href.startsWith("http") ? "_blank" : undefined}
							rel={href.startsWith("http") ? "noreferrer" : undefined}
						>
							<span>Visit site</span>
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
		</article>
	);
}

export function WorkSection({ items = defaultItems }: WorkSectionProps) {
	return (
		<section id="work" className="flex w-full flex-col gap-6 md:gap-section-lg">
			<AnimatedSectionTitle
				title="Work"
				titleClassName="md:text-section-lg md:font-black"
			/>

			<GsapStaggerGroup className="flex flex-col gap-6 md:gap-block-lg">
				{items.map((item, index) => (
					<div key={`${item.title}-${index}`} data-gsap-item>
						<WorkCard {...item} />
					</div>
				))}
			</GsapStaggerGroup>
		</section>
	);
}
