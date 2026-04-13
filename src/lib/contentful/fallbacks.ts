import type {
	Contact,
	ProjectsResult,
	ServicesResult,
	SnsLinksResult,
} from "@/lib/contentful/types";

export const fallbackProjects: ProjectsResult = {
	items: [],
	source: "fallback",
	reason: "Contentful credentials are not configured yet.",
};

export const fallbackServices: ServicesResult = {
	items: [],
	source: "fallback",
	reason: "Contentful credentials are not configured yet.",
};

export const fallbackSnsLinks: SnsLinksResult = {
	items: [],
	source: "fallback",
	reason: "Contentful credentials are not configured yet.",
};

export const fallbackContact: Contact = {
	id: "fallback-contact",
	title: "Contact",
	description: "お問い合わせやご相談はメールからご連絡ください。",
	email: "naoto.okawa0616@gmail.com",
	source: "fallback",
	reason: "Contentful credentials are not configured yet.",
};
