import type { MigrationFunction } from "contentful-migration";

const migration: MigrationFunction = (migration) => {
	migration.transformEntries({
		contentType: "projects",
		from: ["displaySections"],
		to: ["displaySections"],
		transformEntryForLocale: (fromFields, locale) => {
			const currentValue = fromFields.displaySections?.[locale];

			if (Array.isArray(currentValue) && currentValue.length > 0) {
				return {
					displaySections: currentValue,
				};
			}

			return {
				displaySections: ["work"],
			};
		},
	});

	const projects = migration.editContentType("projects");

	projects
		.editField("displaySections")
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
		.validations([{ size: { min: 1 } }])
		.required(true);
};

export default migration;
