"use client";

import { useCallback, useEffect, useState } from "react";

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

	useEffect(() => {
		if (isIntroComplete) {
			return;
		}

		const html = document.documentElement;
		const body = document.body;
		const previousHtmlOverflow = html.style.overflow;
		const previousBodyOverflow = body.style.overflow;
		const previousBodyTouchAction = body.style.touchAction;

		html.style.overflow = "hidden";
		body.style.overflow = "hidden";
		body.style.touchAction = "none";

		return () => {
			html.style.overflow = previousHtmlOverflow;
			body.style.overflow = previousBodyOverflow;
			body.style.touchAction = previousBodyTouchAction;
		};
	}, [isIntroComplete]);

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
