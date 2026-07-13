import type {
	ContactFormSettings,
	ProjectsResult,
	ServicesResult,
	SiteSettings,
	SnsLinksResult,
} from "@/lib/contentful/types";
import { contactTopics } from "@/lib/contact/topics";
import { staticFooterContent, staticSiteMetadata } from "@/lib/site-content";

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

export const fallbackSiteSettings: SiteSettings = {
	id: "fallback-site-settings",
	title: staticSiteMetadata.title,
	description: staticSiteMetadata.description,
	siteName: staticSiteMetadata.siteName,
	locale: staticSiteMetadata.locale,
	keywords: [...staticSiteMetadata.keywords],
	footerEmail: staticFooterContent.email,
	footerCopyright: staticFooterContent.copyright,
	footerBackToTopLabel: staticFooterContent.backToTopLabel,
	socialLinks: [],
	source: "fallback",
	reason: "Contentful credentials are not configured yet.",
};
