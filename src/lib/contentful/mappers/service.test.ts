import { describe, expect, it } from "vitest";

import { mapServiceEntry, mapServices } from "@/lib/contentful/mappers/service";
import type { ContentfulEntry } from "@/lib/contentful/mappers/shared";

function serviceEntry(overrides: Partial<ContentfulEntry["fields"]> = {}): ContentfulEntry {
	return {
		sys: { id: "service-1" },
		fields: {
			title: " Website Development ",
			point: ["Build modern websites", "Improve performance"],
			...overrides,
		},
	};
}

describe("service mappers", () => {
	it("maps a Contentful services entry into display-safe service data", () => {
		expect(mapServiceEntry(serviceEntry())).toEqual({
			id: "service-1",
			title: "Website Development",
			points: ["Build modern websites", "Improve performance"],
		});
	});

	it("returns null when the entry is missing required fields", () => {
		expect(mapServiceEntry(serviceEntry({ title: "", point: [] }))).toBeNull();
	});

	it("filters invalid entries while mapping services collection", () => {
		const valid = serviceEntry();
		const invalid = serviceEntry({
			title: "",
			point: [],
		});

		expect(mapServices([valid, invalid]).items).toEqual([
			{
				id: "service-1",
				title: "Website Development",
				points: ["Build modern websites", "Improve performance"],
			},
		]);
	});
});
