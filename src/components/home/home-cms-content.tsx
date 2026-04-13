"use client";

import { useQuery } from "@tanstack/react-query";

import { Footer } from "@/components/home/footer";
import { MoreProjectsSection } from "@/components/home/more-projects";
import { ServicesSection } from "@/components/home/services";
import { WorkSection } from "@/components/home/work";
import { fallbackProjects, fallbackServices, fallbackSnsLinks } from "@/lib/contentful/fallbacks";
import { mapProjectsToMoreProjectItems, mapProjectsToWorkItems } from "@/lib/contentful/mappers";
import type { ProjectsResult, ServicesResult, SnsLinksResult } from "@/lib/contentful/types";
import { staticFooterContent, staticSectionTitles } from "@/lib/site-content";

type HomeFooterContentProps = {
	contactEmail: string;
};

async function fetchContentfulResource<T>(url: string) {
	const response = await fetch(url);

	if (!response.ok) {
		throw new Error(`Failed to load ${url}.`);
	}

	return (await response.json()) as T;
}

export function HomeCmsContent() {
	const { data: projects = fallbackProjects } = useQuery({
		queryKey: ["contentful", "projects"],
		queryFn: () => fetchContentfulResource<ProjectsResult>("/api/contentful/projects"),
		placeholderData: fallbackProjects,
	});

	const workItems = mapProjectsToWorkItems(projects.items);
	const moreProjectItems = mapProjectsToMoreProjectItems(projects.items);

	return (
		<>
			<WorkSection title={staticSectionTitles.work} items={workItems} />
			<MoreProjectsSection items={moreProjectItems} title={staticSectionTitles.moreProjects} />
		</>
	);
}

export function HomeServicesContent() {
	const { data: services = fallbackServices } = useQuery({
		queryKey: ["contentful", "services"],
		queryFn: () => fetchContentfulResource<ServicesResult>("/api/contentful/services"),
		placeholderData: fallbackServices,
	});

	return <ServicesSection items={services.items} title={staticSectionTitles.services} />;
}

export function HomeFooterContent({ contactEmail }: HomeFooterContentProps) {
	const { data: snsLinks = fallbackSnsLinks } = useQuery({
		queryKey: ["contentful", "sns-links"],
		queryFn: () => fetchContentfulResource<SnsLinksResult>("/api/contentful/sns-links"),
		placeholderData: fallbackSnsLinks,
	});

	return (
		<Footer
			backToTopLabel={staticFooterContent.backToTopLabel}
			copyright={staticFooterContent.copyright}
			email={contactEmail}
			socialLinks={snsLinks.items.map((item) => ({ label: item.title, href: item.url }))}
		/>
	);
}
