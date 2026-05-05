import { describe, expect, it } from "vitest";

import {
	mapProjectEntry,
	mapProjects,
	mapProjectsToMoreProjectItems,
} from "@/lib/contentful/mappers/project";
import type { ContentfulEntry } from "@/lib/contentful/mappers/shared";

function projectEntry(overrides: Partial<ContentfulEntry["fields"]> = {}): ContentfulEntry {
	return {
		sys: { id: "project-1" },
		fields: {
			title: " Portfolio ",
			description: "Personal site",
			with: "Solo",
			published: "2026-05-05T00:00:00.000Z",
			role: "Frontend",
			stack: ["Next.js", "TypeScript"],
			tag: "Web",
			url: "example.com",
			displaySections: ["work", "ignored-section"],
			img: {
				fields: {
					title: "Preview image",
					file: {
						url: "//images.ctfassets.net/project.png",
					},
				},
			},
			...overrides,
		},
	};
}

describe("project mappers", () => {
	it("maps a Contentful project entry into display-safe project data", () => {
		expect(mapProjectEntry(projectEntry())).toMatchObject({
			id: "project-1",
			title: "Portfolio",
			published: "2026.05.05",
			href: "https://example.com",
			imageUrl: "https://images.ctfassets.net/project.png",
			imageAlt: "Preview image",
			displaySections: ["work"],
		});
	});

	it("falls back to work display section when Contentful sections are absent", () => {
		expect(mapProjectEntry(projectEntry({ displaySections: [] }))).toMatchObject({
			displaySections: ["work"],
		});
	});

	it("sorts projects by published date descending", () => {
		const latest = projectEntry({
			title: "Latest",
			published: "2026-06-01T00:00:00.000Z",
		});
		const older = projectEntry({
			title: "Older",
			published: "2026-01-01T00:00:00.000Z",
		});

		expect(mapProjects([older, latest]).items.map((item) => item.title)).toEqual([
			"Latest",
			"Older",
		]);
	});

	it("maps more project items with their image metadata", () => {
		const project = mapProjectEntry(projectEntry({ displaySections: ["moreProjects"] }));

		expect(project).not.toBeNull();
		if (!project) {
			return;
		}

		expect(mapProjectsToMoreProjectItems([project])).toEqual([
			expect.objectContaining({
				title: "Portfolio",
				closedImageHeight: 85,
				imageAlt: "Preview image",
				stack: "Next.js, TypeScript",
			}),
		]);
	});
});
