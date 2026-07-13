import { AnimatedSectionTitle } from "@/components/motion/animated-section-title";
import { SectionReveal } from "@/components/motion/section-reveal";
import { HomeMainInner } from "@/components/ui/home-main-inner";

export type ServiceItem = {
	id?: string;
	title: string;
	points: string[];
};

type ServicesSectionProps = {
	title?: string;
	items?: ServiceItem[];
};

function ServiceGroup({ title, points }: ServiceItem) {
	return (
		<section className="flex flex-col gap-8 md:gap-[72px]">
			<h3 className="text-section text-foreground md:w-full md:text-right md:text-[72px] md:leading-none md:font-bold">
				{title}
			</h3>
			<ul className="text-caption text-foreground md:text-body flex flex-col gap-16 leading-normal md:flex-row md:flex-wrap md:gap-4">
				{points.map((point, index) => (
					<li key={`${title}-${index}`} className="list-none md:w-[240px]">
						{point}
					</li>
				))}
			</ul>
		</section>
	);
}

export function ServicesSection({ title = "Services", items = [] }: ServicesSectionProps) {
	return (
		<section id="services" className="w-full">
			<HomeMainInner className="gap-block md:gap-section-lg flex flex-col">
				<AnimatedSectionTitle title={title} titleClassName="md:text-section-lg md:font-black" />

				{items.length > 0 ? (
					<div className="gap-block-lg md:gap-section-lg flex flex-col">
						{items.map((item, index) => (
							<SectionReveal key={item.id ?? `${item.title}-${index}`} delay={index * 0.06} y={24}>
								<ServiceGroup {...item} />
							</SectionReveal>
						))}
					</div>
				) : (
					<SectionReveal delay={0.06} y={24}>
						<p className="text-caption text-foreground/80 md:text-body max-w-[680px] leading-relaxed">
							サービス内容は現在更新中です。Contentful の Services エントリー公開後に、こちらへ最新の提供内容を表示します。
						</p>
					</SectionReveal>
				)}
			</HomeMainInner>
		</section>
	);
}
