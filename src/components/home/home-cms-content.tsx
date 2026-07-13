"use client";

import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";

import { Footer } from "@/components/home/footer";
import { MoreProjectsSection } from "@/components/home/more-projects";
import { ServicesSection } from "@/components/home/services";
import { WorkSection } from "@/components/home/work";
import { fallbackProjects, fallbackServices } from "@/lib/contentful/fallbacks";
import { mapProjectsToMoreProjectItems, mapProjectsToWorkItems } from "@/lib/contentful/mappers";
import type { ProjectsResult, ServicesResult, SiteSettings } from "@/lib/contentful/types";
import { staticFooterContent, staticSectionTitles } from "@/lib/site-content";

async function fetchContentfulResource<T>(url: string) {
	const response = await fetch(url);

	if (!response.ok) {
		throw new Error(`Failed to load ${url}.`);
	}

	return (await response.json()) as T;
}

export function HomeCmsContent() {
	const { data: projects = fallbackProjects, isPlaceholderData } = useQuery({
		queryKey: ["contentful", "projects"],
		queryFn: () => fetchContentfulResource<ProjectsResult>("/api/contentful/projects"),
		placeholderData: fallbackProjects,
	});

	const workItems = mapProjectsToWorkItems(projects.items);
	const moreProjectItems = useMemo(
		() => mapProjectsToMoreProjectItems(projects.items),
		[projects.items],
	);

	return (
		<>
			<WorkSection title={staticSectionTitles.work} items={workItems} />
			<MoreProjectsSection
				isPlaceholder={isPlaceholderData}
				items={moreProjectItems}
				title={staticSectionTitles.moreProjects}
			/>
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

type HomeFooterContentProps = {
	initialSiteSettings: SiteSettings;
};

export function HomeFooterContent({ initialSiteSettings }: HomeFooterContentProps) {
	const { data: siteSettings = initialSiteSettings } = useQuery({
		queryKey: ["contentful", "site-settings"],
		queryFn: () => fetchContentfulResource<SiteSettings>("/api/contentful/site-settings"),
		initialData: initialSiteSettings,
	});

	return (
		<Footer
			backToTopLabel={siteSettings.footerBackToTopLabel ?? staticFooterContent.backToTopLabel}
			copyright={siteSettings.footerCopyright ?? staticFooterContent.copyright}
			email={siteSettings.footerEmail ?? staticFooterContent.email}
			socialLinks={siteSettings.socialLinks.map((item) => ({ label: item.title, href: item.url }))}
		/>
	);
}
