import type { MigrationFunction } from "contentful-migration";

const migration: MigrationFunction = (migration) => {
	const services = migration
		.createContentType("services")
		.name("Services")
		.description("Service entries shown in the Services section.")
		.displayField("title");

	services.createField("title").name("Title").type("Symbol").required(true);
	services.changeFieldControl("title", "builtin", "singleLine", {
		helpText: "Service category title shown in the Services section.",
	});

	services
		.createField("point")
		.name("Point")
		.type("Array")
		.items({
			type: "Symbol",
		})
		.required(true);
	services.changeFieldControl("point", "builtin", "tagEditor", {
		helpText: "Bullet points displayed under each service category.",
	});
};

export default migration;
