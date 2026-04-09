"use client";

import { useCallback, useState } from "react";

import { Header, type HeaderLink } from "@/components/home/header";
import { HeroSection, type HeroItem } from "@/components/home/hero";

type HomeIntroProps = {
	sinceLabel?: string;
	headerLinks?: HeaderLink[];
	heroItems?: HeroItem[];
};

export function HomeIntro({
	sinceLabel,
	headerLinks,
	heroItems,
}: HomeIntroProps) {
	const [isIntroComplete, setIsIntroComplete] = useState(false);

	const handleIntroComplete = useCallback(() => {
		setIsIntroComplete(true);
	}, []);

	return (
		<>
			<Header
				isVisible={isIntroComplete}
				links={headerLinks}
				sinceLabel={sinceLabel}
			/>
			<main className="mx-auto z-20 flex min-h-screen w-full max-w-content flex-col gap-[96px] px-[4.071%] md:gap-[240px] md:px-0">
				<HeroSection
					introComplete={isIntroComplete}
					items={heroItems}
					onIntroComplete={handleIntroComplete}
				/>
			</main>
		</>
	);
}
