import { describe, expect, it } from "vitest";

import { stripMarkdownDecorations } from "@/lib/chat/format-reply";

describe("stripMarkdownDecorations", () => {
	it("removes lightweight markdown decorations for plain-text chat UI", () => {
		const reply = ["# Summary", "**Important** answer", "* first point", "  * nested point"].join(
			"\n",
		);

		expect(stripMarkdownDecorations(reply)).toBe(
			["Summary", "Important answer", "・ first point", "・ nested point"].join("\n"),
		);
	});
});
