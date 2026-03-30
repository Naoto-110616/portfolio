import type { Metadata } from "next";
import { ReactNode } from "react";

import { QueryProvider } from "@/components/providers/query-provider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Zexora Starter Package",
  description:
    "Next.js starter package with Contentful, Resend, and TanStack Query integration.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
};

type RootLayoutProps = Readonly<{
  children: ReactNode;
}>;

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="ja">
      <body>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
