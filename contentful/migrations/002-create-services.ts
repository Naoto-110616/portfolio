import type { MigrationFunction } from "contentful-migration";

const migration: MigrationFunction = (migration) => {
	const services = migration
		.createContentType("services")
		.name("Services")
		.description("Service entries shown in the Services section.")
		.displayField("title");

	services.createField("title").name("Title").type("Symbol").required(true);

	services
		.createField("point")
		.name("Point")
		.type("Array")
		.items({
			type: "Symbol",
		})
		.required(true);
};

export default migration;
