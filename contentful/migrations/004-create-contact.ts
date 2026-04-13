import type { MigrationFunction } from "contentful-migration";

const migration: MigrationFunction = (migration) => {
	const contact = migration
		.createContentType("contact")
		.name("Contact")
		.description("Singleton-style contact information for the footer and contact entry point.")
		.displayField("title");

	contact.createField("title").name("Title").type("Symbol").required(true);

	contact.createField("description").name("Description").type("Text").required(true);

	contact.createField("email").name("Email").type("Symbol").required(true);
};

export default migration;
