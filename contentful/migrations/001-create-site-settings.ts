import type { MigrationFunction } from "contentful-migration";

const migration: MigrationFunction = (migration) => {
	const siteSettings = migration
		.createContentType("siteSettings")
		.name("Site Settings")
		.description("Global metadata, header, and footer settings.")
		.displayField("siteTitle");

	siteSettings.createField("siteTitle").name("Site title").type("Symbol").required(true);

	siteSettings.createField("siteDescription").name("Site description").type("Text").required(true);

	siteSettings.createField("siteUrl").name("Site URL").type("Symbol").required(true);

	siteSettings
		.createField("headerSinceLabel")
		.name("Header since label")
		.type("Symbol")
		.required(true);

	siteSettings.createField("headerLinks").name("Header links").type("Object").required(true);

	siteSettings.createField("footerEmail").name("Footer email").type("Symbol").required(true);

	siteSettings
		.createField("footerCopyright")
		.name("Footer copyright")
		.type("Symbol")
		.required(true);

	siteSettings
		.createField("footerBackToTopLabel")
		.name("Footer back to top label")
		.type("Symbol")
		.required(true);

	siteSettings.createField("socialLinks").name("Social links").type("Object").required(true);
};

export default migration;
