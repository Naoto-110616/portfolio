import { AboutSection } from "@/components/home/about";
import { ChatSection } from "@/components/home/chat";
import { Footer } from "@/components/home/footer";
import { Header } from "@/components/home/header";
import { HeroSection } from "@/components/home/hero";
import { MoreProjectsSection } from "@/components/home/more-projects";
import { ServicesSection } from "@/components/home/services";
import { WorkSection } from "@/components/home/work";
import { LayoutGuides } from "@/components/ui/layout-guides";

export const revalidate = 300;

export default async function HomePage() {
	return (
		<div id="top" className="relative flex flex-col gap-[56px]">
			<LayoutGuides lineClassName="bg-foreground/10" />
			<Header />
			<main
				className="mx-auto flex min-h-screen w-full max-w-content flex-col gap-[96px] px-[4.071%] md:px-0 z-20"
			>
				<HeroSection />
				<WorkSection />
				<MoreProjectsSection />
				<AboutSection />
				<ChatSection />
				<ServicesSection />
			</main>
			<Footer />
		</div>
	);
}
