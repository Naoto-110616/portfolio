"use client";

import { useCallback, useState } from "react";

import { Header, type HeaderLink } from "@/components/home/header";
import { HeroSection, type HeroItem } from "@/components/home/hero";

type HomeIntroProps = {
	sinceLabel?: string;
	headerLinks?: HeaderLink[];
	heroItems?: HeroItem[];
};

export function HomeIntro({ sinceLabel, headerLinks, heroItems }: HomeIntroProps) {
	const [isIntroComplete, setIsIntroComplete] = useState(false);

	const handleIntroComplete = useCallback(() => {
		setIsIntroComplete(true);
	}, []);

	return (
		<>
			<Header isVisible={isIntroComplete} links={headerLinks} sinceLabel={sinceLabel} />
			<main className="max-w-content z-20 mx-auto flex min-h-screen w-full flex-col gap-[96px] px-[4.071%] md:gap-[240px] md:px-0">
				<HeroSection
					introComplete={isIntroComplete}
					items={heroItems}
					onIntroComplete={handleIntroComplete}
				/>
			</main>
		</>
	);
}
