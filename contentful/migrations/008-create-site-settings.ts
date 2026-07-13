import type { MigrationFunction } from "contentful-migration";

const migration: MigrationFunction = (migration) => {
	const siteSettings = migration
		.createContentType("siteSettings")
		.name("Site Settings")
		.description("Singleton settings for site metadata and footer links.")
		.displayField("title");

	siteSettings.createField("title").name("Title").type("Symbol").required(true);

	siteSettings
		.createField("description")
		.name("Description")
		.type("Text")
		.required(true);

	siteSettings
		.createField("siteName")
		.name("Site Name")
		.type("Symbol")
		.required(true);

	siteSettings.createField("locale").name("Locale").type("Symbol").required(true);

	siteSettings
		.createField("keywords")
		.name("Keywords")
		.type("Array")
		.items({
			type: "Symbol",
		})
		.required(true);

	siteSettings
		.createField("twitterHandle")
		.name("Twitter Handle")
		.type("Symbol")
		.required(false);

	siteSettings
		.createField("footerEmail")
		.name("Footer Email")
		.type("Symbol")
		.required(true);

	siteSettings
		.createField("footerCopyright")
		.name("Footer Copyright")
		.type("Symbol")
		.required(true);

	siteSettings
		.createField("footerBackToTopLabel")
		.name("Footer Back To Top Label")
		.type("Symbol")
		.required(true);

	siteSettings
		.createField("socialLinks")
		.name("Social Links")
		.type("Array")
		.items({
			type: "Link",
			linkType: "Entry",
			validations: [
				{
					linkContentType: ["snsLinks"],
				},
			],
		})
		.required(false);
};

export default migration;
