import type { MigrationFunction } from "contentful-migration";

const migration: MigrationFunction = (migration) => {
	const contact = migration
		.createContentType("contact")
		.name("Contact")
		.description("Inquiry entries submitted from the website contact form.")
		.displayField("name");

	contact.createField("name").name("Name").type("Symbol").required(true);
	contact.createField("topic").name("Topic").type("Symbol").required(true);
	contact.createField("contact").name("Contact").type("Symbol").required(true);
	contact.createField("submittedAt").name("Submitted At").type("Date").required(true);
};

export default migration;
