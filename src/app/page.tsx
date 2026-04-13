import { AboutSection } from "@/components/home/about";
import { ChatSection } from "@/components/home/chat";
import { Footer } from "@/components/home/footer";
import { HomeIntro } from "@/components/home/home-intro";
import { MoreProjectsSection } from "@/components/home/more-projects";
import { ServicesSection } from "@/components/home/services";
import { WorkSection } from "@/components/home/work";
import { LayoutGuides } from "@/components/ui/layout-guides";
import { mapProjectsToMoreProjectItems, mapProjectsToWorkItems } from "@/lib/contentful/mappers";
import { getContact, getProjects, getServices, getSnsLinks } from "@/lib/contentful/queries";
import {
	staticAboutContent,
	staticChatContent,
	staticFooterContent,
	staticHeaderContent,
	staticHeroItems,
	staticSectionTitles,
} from "@/lib/site-content";

export const revalidate = 300;

export default async function HomePage() {
	const [projects, services, snsLinks, contact] = await Promise.all([
		getProjects(),
		getServices(),
		getSnsLinks(),
		getContact(),
	]);
	const workItems = mapProjectsToWorkItems(projects.items);
	const moreProjectItems = mapProjectsToMoreProjectItems(projects.items);

	return (
		<div id="top" className="relative flex flex-col gap-[56px]">
			<LayoutGuides lineClassName="bg-foreground/10" />
			<HomeIntro
				headerLinks={staticHeaderContent.links}
				heroItems={staticHeroItems}
				sinceLabel={staticHeaderContent.sinceLabel}
			/>
			<main className="relative z-20 flex w-full flex-col gap-[96px] md:gap-[240px]">
				<WorkSection title={staticSectionTitles.work} items={workItems} />
				<MoreProjectsSection items={moreProjectItems} title={staticSectionTitles.moreProjects} />
				<AboutSection
					blocks={staticAboutContent.blocks}
					imageAlt={staticAboutContent.portraitImageAlt}
					imageUrl={staticAboutContent.portraitImageUrl}
					leadText={staticAboutContent.leadText}
					title={staticAboutContent.title}
				/>
				<ChatSection
					description={staticChatContent.description}
					helperText={staticChatContent.helperText}
					placeholder={staticChatContent.placeholder}
					title={staticChatContent.title}
				/>
				<ServicesSection items={services.items} title={staticSectionTitles.services} />
			</main>
			<Footer
				backToTopLabel={staticFooterContent.backToTopLabel}
				copyright={staticFooterContent.copyright}
				email={contact.email}
				socialLinks={snsLinks.items.map((item) => ({ label: item.title, href: item.url }))}
			/>
		</div>
	);
}
