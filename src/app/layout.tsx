import type { Metadata } from "next";
import { Caveat, Zen_Kaku_Gothic_New } from "next/font/google";
import { ReactNode } from "react";

import { MotionProvider } from "@/components/providers/motion-provider";
import { QueryProvider } from "@/components/providers/query-provider";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll-provider";
import { getSiteSettings } from "@/lib/contentful/queries";
import { env } from "@/lib/env";
import { staticSiteMetadata } from "@/lib/site-content";
import "./globals.css";

type RootLayoutProps = Readonly<{
	children: ReactNode;
}>;

const zenKakuGothicNew = Zen_Kaku_Gothic_New({
	variable: "--font-jp",
	subsets: ["latin"],
	weight: ["400", "500", "700", "900"],
});

const caveat = Caveat({
	variable: "--font-accent",
	subsets: ["latin"],
	weight: ["400", "700"],
});

const devtoolsMessage = `\n
┌───────────────────────────────────────────────┐
│  👀 こんにちは、どうぞソースコードをご覧ください。
│
│  いつもの実装は Cursor で進めています。
└───────────────────────────────────────────────┘
`;

export async function generateMetadata(): Promise<Metadata> {
	const siteSettings = await getSiteSettings();
	const metadataBase = new URL(env.NEXT_PUBLIC_SITE_URL);
	const ogImage = "/ogp.png";

	return {
		title: siteSettings.title,
		description: siteSettings.description,
		keywords: siteSettings.keywords,
		metadataBase,
		alternates: {
			canonical: "/",
		},
		openGraph: {
			title: siteSettings.title,
			description: siteSettings.description,
			url: "/",
			siteName: siteSettings.siteName,
			locale: siteSettings.locale,
			type: "website",
			images: [
				{
					url: ogImage,
					alt: siteSettings.title,
				},
			],
		},
		twitter: {
			card: "summary_large_image",
			title: siteSettings.title,
			description: siteSettings.description,
			creator: siteSettings.twitterHandle,
			images: [ogImage],
		},
		authors: [{ name: staticSiteMetadata.person.name }],
		creator: staticSiteMetadata.person.name,
		publisher: staticSiteMetadata.person.name,
		robots: {
			index: true,
			follow: true,
			googleBot: {
				index: true,
				follow: true,
				"max-image-preview": "large",
				"max-snippet": -1,
				"max-video-preview": -1,
			},
		},
	};
}

export default async function RootLayout({ children }: RootLayoutProps) {
	const siteSettings = await getSiteSettings();
	const personStructuredData = {
		"@context": "https://schema.org",
		"@type": "Person",
		name: staticSiteMetadata.person.name,
		alternateName: staticSiteMetadata.person.alternateNames,
		url: env.NEXT_PUBLIC_SITE_URL,
		description: siteSettings.description,
		jobTitle: staticSiteMetadata.person.jobTitle,
		address: {
			"@type": "PostalAddress",
			addressCountry: "JP",
			addressRegion: staticSiteMetadata.person.addressRegion,
			addressLocality: staticSiteMetadata.person.addressLocality,
		},
		areaServed: staticSiteMetadata.person.areaServed,
		knowsAbout: staticSiteMetadata.person.knowsAbout,
		sameAs: siteSettings.socialLinks.map((item) => item.url),
	};

	return (
		<html lang="ja">
			<body
				className={`${zenKakuGothicNew.variable} ${caveat.variable} font-jp bg-bg text-foreground`}
			>
				<script
					dangerouslySetInnerHTML={{
						__html: `(function(){const message=${JSON.stringify(devtoolsMessage)};const firstChild=document.body.firstChild;if(firstChild&&firstChild.nodeType===8&&firstChild.nodeValue===message){return;}document.body.prepend(document.createComment(message));})();`,
					}}
				/>
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{
						__html: JSON.stringify(personStructuredData),
					}}
				/>
				<QueryProvider>
					<MotionProvider>
						<SmoothScrollProvider>{children}</SmoothScrollProvider>
					</MotionProvider>
				</QueryProvider>
			</body>
		</html>
	);
}
