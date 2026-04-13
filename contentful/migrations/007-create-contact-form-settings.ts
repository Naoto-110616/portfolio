import type { MigrationFunction } from "contentful-migration";

const migration: MigrationFunction = (migration) => {
	const contactFormSettings = migration
		.createContentType("contactFormSettings")
		.name("Contact Form Settings")
		.description("Singleton settings for the website contact form.")
		.displayField("title");

	contactFormSettings.createField("title").name("Title").type("Symbol").required(true);

	contactFormSettings
		.createField("topicOptions")
		.name("Topic Options")
		.type("Array")
		.items({
			type: "Symbol",
		})
		.required(true);
};

export default migration;
