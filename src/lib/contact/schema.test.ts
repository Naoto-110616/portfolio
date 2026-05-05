import { describe, expect, it } from "vitest";

import { contactSchema } from "@/lib/contact/schema";

describe("contactSchema", () => {
	it("trims and accepts valid contact form values", () => {
		const parsed = contactSchema.parse({
			name: "  Naoto  ",
			topic: "  UI implementation  ",
			contact: "  naoto@example.com  ",
		});

		expect(parsed).toEqual({
			name: "Naoto",
			topic: "UI implementation",
			contact: "naoto@example.com",
		});
	});

	it("returns field errors for missing values", () => {
		const parsed = contactSchema.safeParse({
			name: "N",
			topic: "",
			contact: "",
		});

		expect(parsed.success).toBe(false);
		if (parsed.success) {
			return;
		}

		expect(parsed.error.flatten().fieldErrors).toMatchObject({
			name: ["お名前は2文字以上で入力してください。"],
			topic: ["相談内容を選択してください。"],
			contact: ["連絡先を入力してください。"],
		});
	});
});
