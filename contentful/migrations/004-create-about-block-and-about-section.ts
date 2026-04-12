import type { MigrationFunction } from "contentful-migration";

const migration: MigrationFunction = (migration) => {
	const aboutBlock = migration
		.createContentType("aboutBlock")
		.name("About Block")
		.description("Reusable blocks for the About section.")
		.displayField("title");

	aboutBlock.createField("title").name("Title").type("Symbol").required(true);

	aboutBlock
		.createField("paragraphs")
		.name("Paragraphs")
		.type("Array")
		.items({
			type: "Symbol",
		})
		.required(true);

	aboutBlock.createField("sortOrder").name("Sort order").type("Integer").required(true);

	const aboutSection = migration
		.createContentType("aboutSection")
		.name("About Section")
		.description("Singleton content for the About section.")
		.displayField("title");

	aboutSection.createField("title").name("Section title").type("Symbol").required(true);

	aboutSection.createField("leadText").name("Lead text").type("Text").required(true);

	aboutSection
		.createField("portraitImage")
		.name("Portrait image")
		.type("Link")
		.linkType("Asset")
		.required(true);

	aboutSection.createField("portraitAlt").name("Portrait image alt").type("Symbol").required(false);

	aboutSection
		.createField("blocks")
		.name("About blocks")
		.type("Array")
		.items({
			type: "Link",
			linkType: "Entry",
			validations: [
				{
					linkContentType: ["aboutBlock"],
				},
			],
		})
		.required(true);
};

export default migration;
