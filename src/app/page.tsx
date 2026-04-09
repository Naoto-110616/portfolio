import { AboutSection } from "@/components/home/about";
import { ChatSection } from "@/components/home/chat";
import { Footer } from "@/components/home/footer";
import { Header } from "@/components/home/header";
import { HeroSection } from "@/components/home/hero";
import { MoreProjectsSection } from "@/components/home/more-projects";
import { ServicesSection } from "@/components/home/services";
import { WorkSection } from "@/components/home/work";
import { LayoutGuides } from "@/components/ui/layout-guides";
import {
	mapProjectsToMoreProjectItems,
	mapProjectsToWorkItems,
} from "@/lib/contentful/mappers";
import {
	getHomePage,
	getProjects,
	getSiteSettings,
} from "@/lib/contentful/queries";

export const revalidate = 300;

export default async function HomePage() {
	const [siteSettings, homePage, projects] = await Promise.all([
		getSiteSettings(),
		getHomePage(),
		getProjects(),
	]);
	const workItems = mapProjectsToWorkItems(projects.items);
	const moreProjectItems = mapProjectsToMoreProjectItems(projects.items);

	return (
		<div id="top" className="relative flex flex-col gap-[56px]">
			<LayoutGuides lineClassName="bg-foreground/10" />
			<Header
				links={siteSettings.header.links}
				sinceLabel={siteSettings.header.sinceLabel}
			/>
			<main className="mx-auto flex min-h-screen w-full max-w-content flex-col gap-[96px] px-[4.071%] md:px-0 z-20 md:gap-[240px]">
				<HeroSection items={homePage.heroItems} />
				<WorkSection title={homePage.sectionTitles.work} items={workItems} />
				<MoreProjectsSection
					items={moreProjectItems}
					title={homePage.sectionTitles.moreProjects}
				/>
				<AboutSection
					blocks={homePage.about.blocks}
					imageAlt={homePage.about.portraitImageAlt}
					imageUrl={homePage.about.portraitImageUrl}
					leadText={homePage.about.leadText}
					title={homePage.about.title}
				/>
				<ChatSection
					description={homePage.chat.description}
					helperText={homePage.chat.helperText}
					placeholder={homePage.chat.placeholder}
					title={homePage.chat.title}
				/>
				<ServicesSection
					items={homePage.services.items}
					title={homePage.services.title}
				/>
			</main>
			<Footer
				backToTopLabel={siteSettings.footer.backToTopLabel}
				copyright={siteSettings.footer.copyright}
				email={siteSettings.footer.email}
				socialLinks={siteSettings.footer.socialLinks}
			/>
		</div>
	);
}
