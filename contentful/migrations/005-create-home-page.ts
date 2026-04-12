import type { MigrationFunction } from "contentful-migration";

const migration: MigrationFunction = (migration) => {
	const homePage = migration
		.createContentType("homePage")
		.name("Home Page")
		.description("Singleton content for the homepage composition.")
		.displayField("internalName");

	homePage.createField("internalName").name("Internal name").type("Symbol").required(true);

	homePage.createField("heroItems").name("Hero items").type("Object").required(true);

	homePage.createField("chatTitle").name("Chat title").type("Symbol").required(true);

	homePage.createField("chatDescription").name("Chat description").type("Text").required(true);

	homePage.createField("chatHelperText").name("Chat helper text").type("Text").required(true);

	homePage.createField("chatPlaceholder").name("Chat placeholder").type("Symbol").required(true);

	homePage.createField("workSectionTitle").name("Work section title").type("Symbol").required(true);

	homePage
		.createField("moreProjectsSectionTitle")
		.name("More projects section title")
		.type("Symbol")
		.required(true);

	homePage
		.createField("aboutSection")
		.name("About section")
		.type("Link")
		.linkType("Entry")
		.required(true)
		.validations([
			{
				linkContentType: ["aboutSection"],
			},
		]);

	homePage
		.createField("servicesSection")
		.name("Services section")
		.type("Link")
		.linkType("Entry")
		.required(true)
		.validations([
			{
				linkContentType: ["servicesSection"],
			},
		]);
};

export default migration;
