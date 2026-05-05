import { describe, expect, it } from "vitest";

import {
	startOfCalendarDayUtcIso,
	startOfZonedDayUtcIso,
	startOfZonedMonthUtcIso,
} from "@/lib/octopus/time-boundaries";

function expectIsoWithinOneSecond(actualIso: string, expectedIso: string) {
	const actualTime = new Date(actualIso).getTime();
	const expectedTime = new Date(expectedIso).getTime();

	expect(Math.abs(actualTime - expectedTime)).toBeLessThanOrEqual(1000);
}

describe("time boundary helpers", () => {
	it("finds the UTC instant for the start of a Tokyo calendar day", () => {
		expectIsoWithinOneSecond(
			startOfCalendarDayUtcIso("2026-05-05", "Asia/Tokyo"),
			"2026-05-04T15:00:00.000Z",
		);
	});

	it("derives the start of the reference day in the target time zone", () => {
		expectIsoWithinOneSecond(
			startOfZonedDayUtcIso(new Date("2026-05-05T12:34:56.000Z"), "Asia/Tokyo"),
			"2026-05-04T15:00:00.000Z",
		);
	});

	it("derives the start of the reference month in the target time zone", () => {
		expectIsoWithinOneSecond(
			startOfZonedMonthUtcIso(new Date("2026-05-31T18:00:00.000Z"), "Asia/Tokyo"),
			"2026-05-31T15:00:00.000Z",
		);
	});
});
