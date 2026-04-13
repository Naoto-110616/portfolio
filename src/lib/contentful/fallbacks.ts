import { WORK_CARD_IMAGE_URL, socialLinks as defaultSocialLinks } from "@/constans/const";

import type {
	Contact,
	ProjectsResult,
	ServicesResult,
	SnsLinksResult,
} from "@/lib/contentful/types";

export const fallbackProjects: ProjectsResult = {
	items: [
		{
			id: "fallback-project-1",
			title: "muwmaze",
			description: "コスメブランドのキャンペーンサイト実装と演出設計を担当。",
			with: "KOSÉ",
			published: "2025-01-15",
			role: "Frontend Creative",
			stack: ["shopify", "React"],
			tag: "shopify",
			imageUrl: WORK_CARD_IMAGE_URL,
			imageAlt: "muwmaze preview",
			href: "#",
		},
		{
			id: "fallback-project-2",
			title: "muwmaze-studio",
			description: "ブランド体験を高めるスタジオページのUI実装。",
			with: "KOSÉ",
			published: "2025-01-01",
			role: "Frontend Creative",
			stack: ["shopify", "React"],
			tag: "shopify",
			imageUrl: WORK_CARD_IMAGE_URL,
			imageAlt: "Project preview 2",
			href: "#",
		},
		{
			id: "fallback-project-3",
			title: "muwmaze-labs",
			description: "実験的なマイクロインタラクションを盛り込んだ特設コンテンツ。",
			with: "KOSÉ",
			published: "2024-11-20",
			role: "Frontend Creative",
			stack: ["shopify", "React"],
			tag: "shopify",
			imageUrl: WORK_CARD_IMAGE_URL,
			imageAlt: "Project preview 3",
			href: "#",
		},
		{
			id: "fallback-project-4",
			title: "muwmaze-archive",
			description: "過去施策のアーカイブを再構成し、閲覧体験を改善。",
			with: "KOSÉ",
			published: "2024-07-12",
			role: "Frontend Creative",
			stack: ["shopify", "React"],
			tag: "shopify",
			imageUrl: WORK_CARD_IMAGE_URL,
			imageAlt: "Project preview 4",
			href: "#",
		},
		{
			id: "fallback-project-5",
			title: "muwmaze-cases",
			description: "事例一覧の情報設計とコンポーネント整理を実施。",
			with: "KOSÉ",
			published: "2024-04-08",
			role: "Frontend Creative",
			stack: ["shopify", "React"],
			tag: "shopify",
			imageUrl: WORK_CARD_IMAGE_URL,
			imageAlt: "Project preview 5",
			href: "#",
		},
		{
			id: "fallback-project-6",
			title: "muwmaze-notes",
			description: "運用チーム向けの更新導線やメモ機能を整備。",
			with: "KOSÉ",
			published: "2024-01-10",
			role: "Frontend Creative",
			stack: ["shopify", "React"],
			tag: "shopify",
			imageUrl: WORK_CARD_IMAGE_URL,
			imageAlt: "Project preview 6",
			href: "#",
		},
	],
	source: "fallback",
	reason: "Contentful credentials are not configured yet.",
};

export const fallbackServices: ServicesResult = {
	items: [
		{
			title: "Frontend Development",
			points: [
				"Modern frontend stack: HTML, CSS, TypeScript, Next.js",
				"LP・コーポレートサイト・ECフロントの実装",
				"再利用しやすいコンポーネント設計とUI実装",
			],
		},
		{
			title: "UI / Responsive",
			points: [
				"モバイルファーストなレイアウト設計",
				"主要デバイスでの表示・操作の最適化",
				"既存サイトのレスポンシブ対応・調整",
			],
		},
		{
			title: "Design",
			points: [
				"Figma を使って、LPや小規模サイトのデザインにも少しずつ取り組んでいます。",
				"情報設計や余白・タイポグラフィを意識しながら、実装しやすいUIを目指しています。",
			],
		},
		{
			title: "Project Support",
			points: [
				"既存プロジェクトのUI改善・リファクタリング",
				"管理画面やコンポーネントの追加実装",
				"タスク整理やスケジュール調整を含む開発サポート",
			],
		},
	],
	source: "fallback",
	reason: "Contentful credentials are not configured yet.",
};

export const fallbackSnsLinks: SnsLinksResult = {
	items: defaultSocialLinks.map((link, index) => ({
		id: `fallback-sns-link-${index + 1}`,
		title: link.label,
		url: link.href,
	})),
	source: "fallback",
	reason: "Contentful credentials are not configured yet.",
};

export const fallbackContact: Contact = {
	id: "fallback-contact",
	title: "Contact",
	description: "お問い合わせやご相談はメールからご連絡ください。",
	email: "naoto.okawa0616@gmail.com",
	source: "fallback",
	reason: "Contentful credentials are not configured yet.",
};
