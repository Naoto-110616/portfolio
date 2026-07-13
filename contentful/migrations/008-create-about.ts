import type { MigrationFunction } from "contentful-migration";

const migration: MigrationFunction = (migration) => {
	const aboutBlock = migration
		.createContentType("aboutBlock")
		.name("About Block")
		.description("Block entries used in the About section.")
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

	const about = migration
		.createContentType("about")
		.name("About")
		.description("Singleton content used in the website About section.")
		.displayField("title");

	about.createField("title").name("Title").type("Symbol").required(true);
	about.createField("leadText").name("Lead Text").type("Text").required(true);
	about.createField("portraitImageUrl").name("Portrait Image URL").type("Symbol").required(true);
	about.createField("portraitImageAlt").name("Portrait Image Alt").type("Symbol").required(true);
	about
		.createField("blocks")
		.name("Blocks")
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
