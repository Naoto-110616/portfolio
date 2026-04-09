import type { MigrationFunction } from "contentful-migration";

const migration: MigrationFunction = (migration) => {
  const service = migration
    .createContentType("service")
    .name("Service")
    .description("Individual service items shown on the homepage.")
    .displayField("title");

  service.createField("title").name("Title").type("Symbol").required(true);

  service
    .createField("points")
    .name("Points")
    .type("Array")
    .items({
      type: "Symbol",
    })
    .required(true);

  service
    .createField("sortOrder")
    .name("Sort order")
    .type("Integer")
    .required(true);

  const servicesSection = migration
    .createContentType("servicesSection")
    .name("Services Section")
    .description("Singleton content for the Services section.")
    .displayField("title");

  servicesSection
    .createField("title")
    .name("Section title")
    .type("Symbol")
    .required(true);

  servicesSection
    .createField("items")
    .name("Service items")
    .type("Array")
    .items({
      type: "Link",
      linkType: "Entry",
      validations: [
        {
          linkContentType: ["service"],
        },
      ],
    })
    .required(true);
};

export default migration;
