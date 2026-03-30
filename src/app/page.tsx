import { ContactForm } from "@/components/home/contact-form";
import { ContentPreviewSection } from "@/components/home/content-preview";
import { IntegrationStatus } from "@/components/home/integration-status";
import { getHomepageContent } from "@/lib/contentful/queries";

export const revalidate = 300;

const includedModules = [
  "Next.js App Router + TypeScript",
  "Tailwind CSS starter layout",
  "Contentful fetch layer with fallback content",
  "Resend-powered contact API route",
  "TanStack Query provider and sample query",
  "Environment variable guide for Vercel deploys",
];

export default async function HomePage() {
  const content = await getHomepageContent();

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-10 px-6 py-10 md:px-10 md:py-16">
      <section className="overflow-hidden rounded-[2rem] border border-cyan-400/20 bg-slate-950/60 p-8 shadow-2xl shadow-cyan-950/20 md:p-12">
        <div className="max-w-3xl">
          <p className="text-sm uppercase tracking-[0.35em] text-cyan-200/80">
            Starter package
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white md:text-6xl">
            Build-ready foundation for Contentful, Resend, and TanStack Query.
          </h1>
          <p className="mt-6 text-base leading-8 text-slate-300 md:text-lg">
            デザイン実装だけを手作業に残し、それ以外は環境変数の設定後すぐデプロイできる状態を目指した
            Next.js のスターターパッケージです。
          </p>
        </div>

        <div className="mt-8 grid gap-3 md:grid-cols-2">
          {includedModules.map((item) => (
            <div
              key={item}
              className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-100"
            >
              {item}
            </div>
          ))}
        </div>
      </section>

      <ContentPreviewSection {...content} />

      <div className="grid gap-10 xl:grid-cols-[1.1fr_0.9fr]">
        <IntegrationStatus />
        <ContactForm />
      </div>
    </main>
  );
}
