import { z } from "zod";

export const headerLinkSchema = z.object({
  label: z.string().min(1),
  href: z.string().min(1),
});

export const socialLinkSchema = z.object({
  label: z.string().min(1),
  href: z.string().min(1),
});

export const siteMetadataSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  siteUrl: z.string().url(),
});

export const siteSettingsSchema = z.object({
  metadata: siteMetadataSchema,
  header: z.object({
    sinceLabel: z.string().min(1),
    links: z.array(headerLinkSchema),
  }),
  footer: z.object({
    email: z.string().min(1),
    copyright: z.string().min(1),
    backToTopLabel: z.string().min(1),
    socialLinks: z.array(socialLinkSchema),
  }),
  source: z.enum(["contentful", "fallback"]),
  reason: z.string().optional(),
});

export type HeaderLink = z.infer<typeof headerLinkSchema>;
export type SocialLink = z.infer<typeof socialLinkSchema>;
export type SiteMetadata = z.infer<typeof siteMetadataSchema>;
export type SiteSettings = z.infer<typeof siteSettingsSchema>;
