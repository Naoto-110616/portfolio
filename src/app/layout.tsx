import type { Metadata } from "next";
import { Caveat, Zen_Kaku_Gothic_New } from "next/font/google";
import { ReactNode } from "react";

import { MotionProvider } from "@/components/providers/motion-provider";
import { QueryProvider } from "@/components/providers/query-provider";
import { getSiteSettings } from "@/lib/contentful/queries";
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

export async function generateMetadata(): Promise<Metadata> {
	const siteSettings = await getSiteSettings();

	return {
		title: siteSettings.metadata.title,
		description: siteSettings.metadata.description,
		metadataBase: new URL(siteSettings.metadata.siteUrl),
	};
}

export default function RootLayout({ children }: RootLayoutProps) {
	return (
		<html lang="ja">
			<body
				className={`${zenKakuGothicNew.variable} ${caveat.variable} font-jp bg-bg text-foreground`}
			>
				<QueryProvider>
					<MotionProvider>{children}</MotionProvider>
				</QueryProvider>
			</body>
		</html>
	);
}
