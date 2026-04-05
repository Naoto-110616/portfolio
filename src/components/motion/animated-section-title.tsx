"use client";

import {
	SectionTitle,
	type SectionTitleProps,
} from "@/components/ui/section-title";

import { SectionReveal } from "./section-reveal";

export function AnimatedSectionTitle(props: SectionTitleProps) {
	return (
		<SectionReveal y={20}>
			<SectionTitle {...props} />
		</SectionReveal>
	);
}
