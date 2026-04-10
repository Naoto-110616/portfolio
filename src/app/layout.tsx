import type { Metadata } from "next";
import { Caveat, Zen_Kaku_Gothic_New } from "next/font/google";
import { ReactNode } from "react";

import { MotionProvider } from "@/components/providers/motion-provider";
import { QueryProvider } from "@/components/providers/query-provider";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll-provider";
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

const devtoolsMessage = `\n
┌───────────────────────────────────────────────┐
│  👀 ソース、見に来ると思っていました。
│
│  いつもの実装は Cursor + Claude Code で進めています。
└───────────────────────────────────────────────┘
`;

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
				<script
					dangerouslySetInnerHTML={{
						__html: `(function(){const message=${JSON.stringify(devtoolsMessage)};const firstChild=document.body.firstChild;if(firstChild&&firstChild.nodeType===8&&firstChild.nodeValue===message){return;}document.body.prepend(document.createComment(message));})();`,
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
