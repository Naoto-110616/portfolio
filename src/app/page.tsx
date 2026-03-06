import { ProjectsList } from "@/components/projects-list";

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-50 px-6 py-16 font-sans text-zinc-900 dark:bg-black dark:text-zinc-100">
      <main className="mx-auto flex w-full max-w-3xl flex-col gap-8 rounded-2xl bg-white p-8 shadow-sm dark:bg-zinc-900">
        <section className="space-y-2">
          <p className="text-sm font-semibold text-zinc-500">
            TanStack Query + Contentful
          </p>
          <h1 className="text-3xl font-bold">Portfolio Projects</h1>
          <p className="text-sm text-zinc-600 dark:text-zinc-300">
            Contentfulの`project`をAPI経由で取得し、クライアントでキャッシュします。
          </p>
        </section>
        <ProjectsList />
      </main>
    </div>
  );
}
