import { ProjectWorkCard, type WorkItem } from "@/components/home/project-work-card";
import { AnimatedSectionTitle } from "@/components/motion/animated-section-title";
import { GsapStaggerGroup } from "@/components/motion/gsap-stagger-group";
import { HomeMainInner } from "@/components/ui/home-main-inner";

export type { WorkItem };

type WorkSectionProps = {
	title?: string;
	items?: WorkItem[];
};

const workPreviewImage = "https://www.figma.com/api/mcp/asset/f7b1a698-5cc0-4044-805e-39ed777c4ad0";

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

export function WorkSection({ title = "Work", items = defaultItems }: WorkSectionProps) {
	return (
		<section id="work" className="w-full">
			<HomeMainInner className="md:gap-section-lg flex flex-col gap-6">
				<AnimatedSectionTitle title={title} titleClassName="md:text-section-lg md:font-black" />

				<GsapStaggerGroup className="md:gap-block-lg flex flex-col gap-6">
					{items.map((item, index) => (
						<div key={`${item.title}-${index}`} data-gsap-item>
							<ProjectWorkCard {...item} />
						</div>
					))}
				</GsapStaggerGroup>
			</HomeMainInner>
		</section>
	);
}
