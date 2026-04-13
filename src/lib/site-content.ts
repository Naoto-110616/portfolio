import { ABOUT_PORTRAIT_IMAGE_URL, NAME, NAME_PORTRAIT_ALT } from "@/constans/const";

export const staticSiteMetadata = {
	title: "Naoto Ohkawa | Frontend Engineer",
	description:
		"フロントエンドエンジニア大川尚斗のポートフォリオ。Next.js と Headless CMS を軸に、体験と運用を両立するWeb実装を行っています。",
};

export const staticHeaderContent = {
	sinceLabel: "Since 2021",
	links: [
		{ label: "Work", href: "#work" },
		{ label: "About", href: "#about" },
		{ label: "Pick My Brain!", href: "#chat" },
		{ label: "Services", href: "#services" },
	],
};

export const staticHeroItems = [
	{ label: "Name:", value: NAME },
	{ label: "Title:", value: "Frontend Engineer" },
	{ label: "Dislikes:", value: "Work", isHighlighted: true },
];

export const staticAboutContent = {
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
};

export const staticChatContent = {
	title: "Pick My Brain!",
	description:
		"プロフィール以外で私について知りたいことがあれば、こちらのAIに聞いてみてください。日々のメモや過去の仕事を学習しているので、技術的な質問から個人的な考え方まで、私の代わりにお答えします。",
	helperText: "AIが自動で回答するため、時々おかしなことを言うかもしれません。",
	placeholder: "人生で一番好きな映画は？",
};

export const staticSectionTitles = {
	work: "Work",
	moreProjects: "More Projects",
	services: "Services",
};

export const staticFooterContent = {
	backToTopLabel: "Back to top",
	copyright: "© 2026, All rights reserved",
};
