import type { MigrationFunction } from "contentful-migration";

const migration: MigrationFunction = (migration) => {
	const projects = migration
		.createContentType("projects")
		.name("Projects")
		.description("Project entries used for the Work and More Projects sections.")
		.displayField("title");

	projects.createField("img").name("Image").type("Link").linkType("Asset").required(true);

	projects.createField("tag").name("Tag").type("Symbol").required(true);

	projects.createField("title").name("Title").type("Symbol").required(true);

	projects.createField("url").name("URL").type("Symbol").required(true);

	projects.createField("description").name("Description").type("Text").required(true);

	projects.createField("with").name("With").type("Symbol").required(true);

	projects.createField("published").name("Published").type("Date").required(true);

	projects.createField("role").name("Role").type("Symbol").required(true);

	projects
		.createField("stack")
		.name("Stack")
		.type("Array")
		.items({
			type: "Symbol",
		})
		.required(true);
};

export default migration;
