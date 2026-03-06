"use client";

import { useQuery } from "@tanstack/react-query";

type PortfolioProject = {
  id: string;
  title: string;
  slug: string;
  summary?: string;
};

type ProjectsResponse = {
  projects: PortfolioProject[];
};

async function fetchProjects(): Promise<PortfolioProject[]> {
  const response = await fetch("/api/projects");

  if (!response.ok) {
    throw new Error("Failed to fetch projects.");
  }

  const data = (await response.json()) as ProjectsResponse;
  return data.projects;
}

export function ProjectsList() {
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["projects"],
    queryFn: fetchProjects,
  });

  if (isPending) {
    return <p className="text-sm text-zinc-600">Loading projects...</p>;
  }

  if (isError) {
    return (
      <p className="text-sm text-red-600">
        {error instanceof Error ? error.message : "Unknown error"}
      </p>
    );
  }

  if (!data || data.length === 0) {
    return (
      <p className="rounded-lg border border-dashed border-zinc-300 p-4 text-sm text-zinc-600">
        プロジェクトが見つかりません。Contentful の project を作成してください。
      </p>
    );
  }

  return (
    <ul className="space-y-3">
      {data.map((project) => (
        <li key={project.id} className="rounded-lg border border-zinc-200 p-4">
          <p className="font-medium">{project.title}</p>
          <p className="text-xs text-zinc-500">slug: {project.slug}</p>
          {project.summary ? (
            <p className="mt-2 text-sm text-zinc-600">{project.summary}</p>
          ) : null}
        </li>
      ))}
    </ul>
  );
}
