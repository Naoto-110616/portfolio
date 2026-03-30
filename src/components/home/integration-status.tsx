"use client";

import { useQuery } from "@tanstack/react-query";

type IntegrationStatusResponse = {
  siteUrl: string;
  integrations: {
    contentful: boolean;
    resend: boolean;
    tanstackQuery: boolean;
  };
  timestamp: string;
};

async function getIntegrationStatus() {
  const response = await fetch("/api/status");

  if (!response.ok) {
    throw new Error("Failed to load integration status.");
  }

  return (await response.json()) as IntegrationStatusResponse;
}

function StatusPill({
  label,
  isActive,
}: {
  label: string;
  isActive: boolean;
}) {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
      <span className="text-sm text-slate-200">{label}</span>
      <span
        className={`rounded-full px-3 py-1 text-xs font-medium ${
          isActive
            ? "bg-emerald-400/15 text-emerald-200"
            : "bg-amber-400/15 text-amber-100"
        }`}
      >
        {isActive ? "Ready" : "Needs env"}
      </span>
    </div>
  );
}

export function IntegrationStatus() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["integration-status"],
    queryFn: getIntegrationStatus,
  });

  return (
    <section className="rounded-[2rem] border border-white/10 bg-slate-950/40 p-8">
      <div className="flex flex-col gap-2">
        <p className="text-sm uppercase tracking-[0.3em] text-cyan-200/80">TanStack Query</p>
        <h2 className="text-2xl font-semibold text-white">Integration status dashboard</h2>
        <p className="text-sm leading-6 text-slate-300">
          クライアント側では React Query を標準化し、環境変数の設定状況や API の動作確認をすぐに差し替えられるようにしています。
        </p>
      </div>

      {isLoading ? (
        <p className="mt-6 text-sm text-slate-400">Loading integration status...</p>
      ) : null}

      {isError ? (
        <p className="mt-6 rounded-2xl border border-rose-400/20 bg-rose-400/10 px-4 py-3 text-sm text-rose-100">
          Integration status could not be fetched.
        </p>
      ) : null}

      {data ? (
        <div className="mt-6 space-y-3">
          <StatusPill label="Contentful" isActive={data.integrations.contentful} />
          <StatusPill label="Resend" isActive={data.integrations.resend} />
          <StatusPill label="TanStack Query" isActive={data.integrations.tanstackQuery} />
          <p className="pt-2 text-xs text-slate-500">
            Base URL: {data.siteUrl} | Updated: {new Date(data.timestamp).toLocaleString("ja-JP")}
          </p>
        </div>
      ) : null}
    </section>
  );
}
