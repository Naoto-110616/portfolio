import {
	ABOUT_PORTRAIT_IMAGE_URL,
	NAME,
	NAME_PORTRAIT_ALT,
	WORK_CARD_IMAGE_URL,
	socialLinks as defaultSocialLinks,
} from "@/constans/const";

import type { HomePageContent, ProjectsResult, SiteSettings } from "@/lib/contentful/types";

export const fallbackSiteSettings: SiteSettings = {
	metadata: {
		title: "Zexora Starter Package",
		description: "Next.js starter package with Contentful, Resend, and TanStack Query integration.",
		siteUrl: "http://localhost:3000",
	},
	header: {
		sinceLabel: "Since 2021",
		links: [
			{ label: "Work", href: "#work" },
			{ label: "About", href: "#about" },
			{ label: "Pick My Brain!", href: "#chat" },
			{ label: "Services", href: "#services" },
		],
	},
	footer: {
		email: "naoto.okawa0616@gmail.com",
		copyright: "© 2026, All rights reserved",
		backToTopLabel: "Back to top",
		socialLinks: defaultSocialLinks,
	},
	source: "fallback",
	reason: "Contentful credentials are not configured yet.",
};

export const fallbackHomePage: HomePageContent = {
	heroItems: [
		{ label: "Name:", value: NAME },
		{ label: "Title:", value: "Frontend Engineer" },
		{ label: "Dislikes:", value: "Work", isHighlighted: true },
	],
	chat: {
		title: "Pick My Brain!",
		description:
			"プロフィール以外で私について知りたいことがあれば、こちらのAIに聞いてみてください。日々のメモや過去の仕事を学習しているので、技術的な質問から個人的な考え方まで、私の代わりにお答えします。",
		helperText: "AIが自動で回答するため、時々おかしなことを言うかもしれません。",
		placeholder: "人生で一番好きな映画は？",
	},
	about: {
		title: "About",
		leadText: "モダンなWebに、体験と仕組みをデザインするフロントエンドエンジニア",
		portraitImageUrl: ABOUT_PORTRAIT_IMAGE_URL,
		portraitImageAlt: NAME_PORTRAIT_ALT,
		blocks: [
			{
				title: "Hello",
				paragraphs: [
					"使いやすさとつくりやすさを両立させたいフロントエンドエンジニアです。",
					"Next.jsとヘッドレスCMSを中心に、LPやコーポレートサイト、ECまわりを担当しています。",
				],
			},
			{
				title: "Journey",
				paragraphs: [
					"デザインの意図を汲み取った高精度な実装から、運用を見据えた設計まで一気通貫で手がけています。",
					"Next.js を軸に、管理画面開発や Headless CMS、EC構築まで、事業フェーズに応じた技術選定と実装を行っています。",
				],
			},
			{
				title: "Approach",
				paragraphs: [
					"緻密に設計したコンポーネントが、意図したレイアウトにはまる瞬間にいちばんやりがいを感じます。",
					"余白設計と責務分離を大切にし、見た目の美しさと再利用性を両立した、保守しやすいUIを組み立てています。",
				],
			},
			{
				title: "Beyond",
				paragraphs: [
					"休日は本や映画、漫画をのんびり楽しんでいます。",
					"ジャンルはミステリ、歴史、SF、ノンフィクションなど。観たものや読んだものを忘れるのがもったいなくて、アプリに5段階で記録をつけるのが習慣になっています。",
					"静かな場所で一人、コーヒーを淹れたり料理をしたり、時々ゲームをしたり。そんなマイペースに過ごす時間が一番落ち着きます。",
				],
			},
		],
	},
	services: {
		title: "Services",
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
					"勉強中ですが、情報設計や余白・タイポグラフィを意識しながら、実装しやすいUIを描くことを目標にしています。",
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
			{
				title: "Backend Development",
				points: [
					"Headless CMS の導入・移行（主に Contentful）",
					"WordPressサイトのJamstack化に向けた相談・実装補助",
					"フロントエンドと連携するAPIまわりの軽微な調整",
				],
			},
		],
	},
	sectionTitles: {
		work: "Work",
		moreProjects: "More Projects",
	},
	source: "fallback",
	reason: "Contentful credentials are not configured yet.",
};

export const fallbackProjects: ProjectsResult = {
	items: [
		{
			id: "fallback-project-1",
			title: "muwmaze",
			slug: "muwmaze",
			description: "ウィキメディア文書の適法ををこと要件改変に方針助け理解しライセン。",
			partner: "KOSÉ",
			publishedYear: "2025",
			role: "Frontend Creative",
			stack: ["shopify", "React"],
			tag: "shopify",
			imageUrl: WORK_CARD_IMAGE_URL,
			imageAlt: "muwmaze preview",
			href: "#",
			featuredOnHome: true,
			showInMoreProjects: true,
			sortOrder: 1,
			moreProjectHeightPx: 85,
		},
		{
			id: "fallback-project-2",
			title: "muwmaze-studio",
			slug: "muwmaze-studio",
			description: "ウィキメディア文書の適法ををこと要件改変に方針助け理解しライセン。",
			partner: "KOSÉ",
			publishedYear: "2025",
			role: "Frontend Creative",
			stack: ["shopify", "React"],
			tag: "shopify",
			imageUrl: WORK_CARD_IMAGE_URL,
			imageAlt: "Project preview 2",
			href: "#",
			featuredOnHome: true,
			showInMoreProjects: true,
			sortOrder: 2,
			moreProjectHeightPx: 102,
		},
		{
			id: "fallback-project-3",
			title: "muwmaze-labs",
			slug: "muwmaze-labs",
			description: "ウィキメディア文書の適法ををこと要件改変に方針助け理解しライセン。",
			partner: "KOSÉ",
			publishedYear: "2025",
			role: "Frontend Creative",
			stack: ["shopify", "React"],
			tag: "shopify",
			imageUrl: WORK_CARD_IMAGE_URL,
			imageAlt: "Project preview 3",
			href: "#",
			featuredOnHome: true,
			showInMoreProjects: true,
			sortOrder: 3,
			moreProjectHeightPx: 102,
		},
		{
			id: "fallback-project-4",
			title: "muwmaze-archive",
			slug: "muwmaze-archive",
			description: "ウィキメディア文書の適法ををこと要件改変に方針助け理解しライセン。",
			partner: "KOSÉ",
			publishedYear: "2024",
			role: "Frontend Creative",
			stack: ["shopify", "React"],
			tag: "shopify",
			imageUrl: WORK_CARD_IMAGE_URL,
			imageAlt: "Project preview 4",
			href: "#",
			featuredOnHome: false,
			showInMoreProjects: true,
			sortOrder: 4,
			moreProjectHeightPx: 102,
		},
		{
			id: "fallback-project-5",
			title: "muwmaze-cases",
			slug: "muwmaze-cases",
			description: "ウィキメディア文書の適法ををこと要件改変に方針助け理解しライセン。",
			partner: "KOSÉ",
			publishedYear: "2024",
			role: "Frontend Creative",
			stack: ["shopify", "React"],
			tag: "shopify",
			imageUrl: WORK_CARD_IMAGE_URL,
			imageAlt: "Project preview 5",
			href: "#",
			featuredOnHome: false,
			showInMoreProjects: true,
			sortOrder: 5,
			moreProjectHeightPx: 102,
		},
		{
			id: "fallback-project-6",
			title: "muwmaze-notes",
			slug: "muwmaze-notes",
			description: "ウィキメディア文書の適法ををこと要件改変に方針助け理解しライセン。",
			partner: "KOSÉ",
			publishedYear: "2024",
			role: "Frontend Creative",
			stack: ["shopify", "React"],
			tag: "shopify",
			imageUrl: WORK_CARD_IMAGE_URL,
			imageAlt: "Project preview 6",
			href: "#",
			featuredOnHome: false,
			showInMoreProjects: true,
			sortOrder: 6,
			moreProjectHeightPx: 102,
		},
	],
	source: "fallback",
	reason: "Contentful credentials are not configured yet.",
};
