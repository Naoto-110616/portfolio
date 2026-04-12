import type { ContentPreview, HomepageContentResult } from "@/lib/contentful/queries";

type ContentPreviewProps = HomepageContentResult;

function PreviewCard({ item }: { item: ContentPreview }) {
	return (
		<article className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl shadow-slate-950/20 backdrop-blur">
			<div className="mb-4 flex items-center justify-between gap-3">
				<span className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-xs text-cyan-100">
					{item.contentType}
				</span>
				<span className="text-xs text-slate-400">{item.updatedAt}</span>
			</div>
			<h3 className="text-lg font-semibold text-white">{item.title}</h3>
			<p className="mt-3 text-sm leading-6 text-slate-300">{item.description}</p>
			<p className="mt-4 text-xs text-slate-500">slug: {item.slug}</p>
		</article>
	);
}

export function ContentPreviewSection({ items, source, reason }: ContentPreviewProps) {
	return (
		<section className="rounded-[2rem] border border-white/10 bg-slate-950/40 p-8">
			<div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
				<div>
					<p className="text-sm tracking-[0.3em] text-cyan-200/80 uppercase">Contentful</p>
					<h2 className="mt-2 text-2xl font-semibold text-white">CMS content preview</h2>
				</div>
				<div className="text-sm text-slate-300">
					Source:{" "}
					<span className="font-medium text-white">
						{source === "contentful" ? "Live Contentful data" : "Local starter fallback"}
					</span>
				</div>
			</div>

			{reason ? (
				<p className="mt-4 rounded-2xl border border-amber-400/20 bg-amber-400/10 px-4 py-3 text-sm text-amber-100">
					{reason}
				</p>
			) : null}

			<div className="mt-6 grid gap-4 md:grid-cols-3">
				{items.map((item) => (
					<PreviewCard key={item.id} item={item} />
				))}
			</div>
		</section>
	);
}
