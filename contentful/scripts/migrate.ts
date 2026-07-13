import { loadEnvConfig } from "@next/env";
import { runMigration, type MigrationFunction } from "contentful-migration";

import { requireContentfulManagementEnv } from "../config/env";
import createProjects from "../migrations/001-create-projects";
import createServices from "../migrations/002-create-services";
import createSnsLinks from "../migrations/003-create-sns-links";
import createContact from "../migrations/004-create-contact";
import addProjectDisplaySections from "../migrations/005-add-project-display-sections";
import createContactInquiries from "../migrations/006-create-contact-inquiries";
import createContactFormSettings from "../migrations/007-create-contact-form-settings";
import createAbout from "../migrations/008-create-about";

loadEnvConfig(process.cwd());

type NamedMigration = {
	id: string;
	migrationFunction: MigrationFunction;
};

const migrations: NamedMigration[] = [
	{ id: "001-create-projects", migrationFunction: createProjects },
	{ id: "002-create-services", migrationFunction: createServices },
	{ id: "003-create-sns-links", migrationFunction: createSnsLinks },
	{ id: "004-create-contact", migrationFunction: createContact },
	{ id: "005-add-project-display-sections", migrationFunction: addProjectDisplaySections },
	{ id: "006-create-contact-inquiries", migrationFunction: createContactInquiries },
	{ id: "007-create-contact-form-settings", migrationFunction: createContactFormSettings },
	{ id: "008-create-about", migrationFunction: createAbout },
];

function getFlagValue(flagName: string) {
	const argument = process.argv.find((value) => value.startsWith(`${flagName}=`));

	return argument ? argument.slice(flagName.length + 1) : undefined;
}

async function main() {
	const options = requireContentfulManagementEnv();
	const yes = process.argv.includes("--yes");
	const fromMigrationId = getFlagValue("--from");
	const startIndex = fromMigrationId
		? migrations.findIndex((migration) => migration.id === fromMigrationId)
		: 0;

	if (fromMigrationId && startIndex === -1) {
		throw new Error(
			`Unknown migration id "${fromMigrationId}". Available ids: ${migrations
				.map((migration) => migration.id)
				.join(", ")}`,
		);
	}

	for (const migration of migrations.slice(startIndex)) {
		console.log(`Running migration: ${migration.id}`);

		await runMigration({
			...options,
			yes,
			migrationFunction: migration.migrationFunction,
		});
	}

	console.log("Contentful migrations completed.");
}

main().catch((error) => {
	console.error("Contentful migration failed.", error);
	process.exitCode = 1;
});
