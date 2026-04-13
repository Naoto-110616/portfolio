import type { MigrationFunction } from "contentful-migration";

const migration: MigrationFunction = (migration) => {
	const snsLinks = migration
		.createContentType("snsLinks")
		.name("SNS Links")
		.description("SNS links shown in the footer.")
		.displayField("title");

	snsLinks.createField("title").name("Title").type("Symbol").required(true);

	snsLinks.createField("url").name("URL").type("Symbol").required(true);
};

export default migration;
