import { ChatSection } from "@/components/home/chat";
import { ContactSection } from "@/components/home/contact-form";
import {
	HomeAboutContent,
	HomeCmsContent,
	HomeFooterContent,
	HomeServicesContent,
} from "@/components/home/home-cms-content";
import { HomeIntro } from "@/components/home/home-intro";
import { LayoutGuides } from "@/components/ui/layout-guides";
import { getSnsLinks } from "@/lib/contentful/queries";
import { staticChatContent, staticHeaderContent, staticHeroItems } from "@/lib/site-content";

export const revalidate = 300;

export default async function HomePage() {
	const snsLinks = await getSnsLinks();

	return (
		<div id="top" className="relative flex flex-col gap-[28px] md:gap-[56px]">
			<LayoutGuides lineClassName="bg-foreground/10" />
			<HomeIntro
				headerLinks={staticHeaderContent.links}
				heroItems={staticHeroItems}
				sinceLabel={staticHeaderContent.sinceLabel}
			/>
			<main className="relative z-20 flex w-full flex-col gap-[96px] md:gap-[240px]">
				<HomeCmsContent />
				<HomeAboutContent />
				<ChatSection
					description={staticChatContent.description}
					helperText={staticChatContent.helperText}
					placeholder={staticChatContent.placeholder}
					title={staticChatContent.title}
				/>
				<HomeServicesContent />
				<ContactSection />
			</main>
			<HomeFooterContent initialSnsLinks={snsLinks} />
		</div>
	);
}
