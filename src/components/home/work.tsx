import { ProjectWorkCard, type WorkItem } from "@/components/home/project-work-card";
import { AnimatedSectionTitle } from "@/components/motion/animated-section-title";
import { GsapStaggerGroup } from "@/components/motion/gsap-stagger-group";
import { HomeMainInner } from "@/components/ui/home-main-inner";

export type { WorkItem };

type WorkSectionProps = {
	title?: string;
	items?: WorkItem[];
};

export function WorkSection({ title = "Work", items = [] }: WorkSectionProps) {
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
