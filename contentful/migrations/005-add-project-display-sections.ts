import type { MigrationFunction } from "contentful-migration";

const migration: MigrationFunction = (migration) => {
	const projects = migration.editContentType("projects");

	projects
		.createField("displaySections")
		.name("Display sections")
		.type("Array")
		.items({
			type: "Symbol",
			validations: [
				{
					in: ["work", "moreProjects"],
				},
			],
		})
		.required(false);
};

export default migration;
