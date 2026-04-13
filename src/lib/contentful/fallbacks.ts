import type {
	ContactFormSettings,
	ProjectsResult,
	ServicesResult,
	SnsLinksResult,
} from "@/lib/contentful/types";
import { contactTopics } from "@/lib/contact/topics";

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

export const fallbackContactFormSettings: ContactFormSettings = {
	id: "fallback-contact-form-settings",
	title: "Contact Form Settings",
	topicOptions: [...contactTopics],
	source: "fallback",
	reason: "Contentful credentials are not configured yet.",
};
