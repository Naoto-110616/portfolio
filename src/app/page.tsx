import { AboutSection } from "@/components/home/about";
import { ChatSection } from "@/components/home/chat";
import { ContactSection } from "@/components/home/contact-form";
import {
	HomeCmsContent,
	HomeFooterContent,
	HomeServicesContent,
} from "@/components/home/home-cms-content";
import { HomeIntro } from "@/components/home/home-intro";
import { LayoutGuides } from "@/components/ui/layout-guides";
import {
	staticAboutContent,
	staticChatContent,
	staticHeaderContent,
	staticHeroItems,
} from "@/lib/site-content";

export const revalidate = 300;

export default async function HomePage() {
	return (
		<div id="top" className="relative flex flex-col gap-[56px]">
			<LayoutGuides lineClassName="bg-foreground/10" />
			<HomeIntro
				headerLinks={staticHeaderContent.links}
				heroItems={staticHeroItems}
				sinceLabel={staticHeaderContent.sinceLabel}
			/>
			<main className="relative z-20 flex w-full flex-col gap-[96px] md:gap-[240px]">
				<HomeCmsContent />
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
				<HomeServicesContent />
				<ContactSection />
			</main>
			<HomeFooterContent />
		</div>
	);
}
