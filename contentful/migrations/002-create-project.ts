import type { MigrationFunction } from "contentful-migration";

const migration: MigrationFunction = (migration) => {
  const project = migration
    .createContentType("project")
    .name("Project")
    .description("Project entries for Work and More Projects sections.")
    .displayField("title");

  project.createField("title").name("Title").type("Symbol").required(true);

  project
    .createField("slug")
    .name("Slug")
    .type("Symbol")
    .required(true)
    .validations([{ unique: true }]);

  project
    .createField("description")
    .name("Description")
    .type("Text")
    .required(true);

  project.createField("partner").name("Partner").type("Symbol").required(true);

  project
    .createField("publishedYear")
    .name("Published year")
    .type("Symbol")
    .required(true);

  project.createField("role").name("Role").type("Symbol").required(true);

  project
    .createField("stack")
    .name("Stack")
    .type("Array")
    .items({
      type: "Symbol",
    })
    .required(true);

  project.createField("tag").name("Tag").type("Symbol").required(true);

  project
    .createField("thumbnail")
    .name("Thumbnail")
    .type("Link")
    .linkType("Asset")
    .required(true);

  project
    .createField("externalUrl")
    .name("External URL")
    .type("Symbol")
    .required(true);

  project
    .createField("featuredOnHome")
    .name("Featured on home")
    .type("Boolean")
    .required(false);

  project
    .createField("showInMoreProjects")
    .name("Show in more projects")
    .type("Boolean")
    .required(false);

  project
    .createField("sortOrder")
    .name("Sort order")
    .type("Integer")
    .required(true);

  project
    .createField("moreProjectHeightPx")
    .name("More project height px")
    .type("Integer")
    .required(false);

  project
    .createField("moreProjectAlt")
    .name("More project image alt")
    .type("Symbol")
    .required(false);
};

export default migration;
