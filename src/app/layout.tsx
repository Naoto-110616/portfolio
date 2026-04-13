import type { Metadata } from "next";
import { Caveat, Zen_Kaku_Gothic_New } from "next/font/google";
import { ReactNode } from "react";

import { MotionProvider } from "@/components/providers/motion-provider";
import { QueryProvider } from "@/components/providers/query-provider";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll-provider";
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
	return {
		title: staticSiteMetadata.title,
		description: staticSiteMetadata.description,
		metadataBase: new URL(env.NEXT_PUBLIC_SITE_URL),
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
