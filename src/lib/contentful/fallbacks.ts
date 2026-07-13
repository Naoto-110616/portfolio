import type {
	AboutContent,
	ContactFormSettings,
	ProjectsResult,
	ServicesResult,
	SnsLinksResult,
} from "@/lib/contentful/types";
import { contactTopics } from "@/lib/contact/topics";
import { staticAboutContent } from "@/lib/site-content";

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

export const fallbackAboutContent: AboutContent = {
	title: staticAboutContent.title,
	leadText: staticAboutContent.leadText,
	portraitImageUrl: staticAboutContent.portraitImageUrl,
	portraitImageAlt: staticAboutContent.portraitImageAlt,
	blocks: staticAboutContent.blocks.map((block, index) => ({
		id: `fallback-about-block-${index}`,
		title: block.title,
		paragraphs: block.paragraphs,
	})),
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
