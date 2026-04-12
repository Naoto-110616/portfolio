import { loadEnvConfig } from "@next/env";
import { runMigration, type MigrationFunction } from "contentful-migration";

import { requireContentfulManagementEnv } from "../config/env";
import createSiteSettings from "../migrations/001-create-site-settings";
import createProject from "../migrations/002-create-project";
import createServiceAndServicesSection from "../migrations/003-create-service-and-services-section";
import createAboutBlockAndAboutSection from "../migrations/004-create-about-block-and-about-section";
import createHomePage from "../migrations/005-create-home-page";

loadEnvConfig(process.cwd());

type NamedMigration = {
	id: string;
	migrationFunction: MigrationFunction;
};

const migrations: NamedMigration[] = [
	{ id: "001-create-site-settings", migrationFunction: createSiteSettings },
	{ id: "002-create-project", migrationFunction: createProject },
	{
		id: "003-create-service-and-services-section",
		migrationFunction: createServiceAndServicesSection,
	},
	{
		id: "004-create-about-block-and-about-section",
		migrationFunction: createAboutBlockAndAboutSection,
	},
	{ id: "005-create-home-page", migrationFunction: createHomePage },
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
