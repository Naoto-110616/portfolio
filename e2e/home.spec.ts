import { expect, test } from "@playwright/test";

test.describe("home page", () => {
	test("renders the main portfolio sections", async ({ page }) => {
		await page.goto("/");

		await expect(page.locator("#top")).toBeVisible();
		await expect(page.locator("#chat")).toBeVisible();
		await expect(page.locator("#contact")).toBeVisible();
		await expect(page.getByRole("button", { name: "Submit" })).toBeVisible();
	});

	test("validates the contact form before submission", async ({ page }) => {
		await page.goto("/");

		await page.getByRole("button", { name: "Submit" }).click();

		await expect(page.getByText("お名前は2文字以上で入力してください。")).toBeVisible();
		await expect(page.getByText("相談内容を選択してください。")).toBeVisible();
		await expect(page.getByText("連絡先を入力してください。")).toBeVisible();
	});

	test("enables chat submission after a prompt is entered", async ({ page }) => {
		await page.goto("/");

		const prompt = page.getByLabel("Ask AI about Naoto");
		const sendButton = page.getByRole("button", { name: "Send question" });

		await expect(sendButton).toBeDisabled();
		await prompt.fill("得意な技術は？");
		await expect(sendButton).toBeEnabled();
		await expect(page.getByText("7/500")).toBeVisible();
	});
});
