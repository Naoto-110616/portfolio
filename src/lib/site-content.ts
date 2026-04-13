import {
	ABOUT_PORTRAIT_IMAGE_URL,
	NAME,
	NAME_JA,
	NAME_JA_HIRAGANA,
	NAME_JA_KATAKANA,
	NAME_PORTRAIT_ALT,
} from "@/constans/const";

export const staticSiteMetadata = {
	title: `${NAME_JA} | 大阪市平野区のフロントエンドエンジニア / ${NAME}`,
	description:
		`${NAME_JA}（${NAME_JA_HIRAGANA} / ${NAME_JA_KATAKANA}）のポートフォリオサイト。大阪市平野区を拠点に、サイト制作、LP制作、WordPressリプレイス、Next.jsを使った実装、表示速度や運用の最適化に対応しています。`,
	siteName: `${NAME} Portfolio`,
	locale: "ja_JP",
	keywords: [
		NAME_JA,
		NAME_JA_HIRAGANA,
		NAME_JA_KATAKANA,
		"大川",
		"おおかわ",
		"オオカワ",
		"尚斗",
		"なおと",
		"ナオト",
		"フロントエンドエンジニア",
		"大阪",
		"平野区",
		"大阪市平野区",
		"サイト制作",
		"LP制作",
		"WordPressリプレイス",
		"Webサイト最適化",
		"フロントエンド開発",
		"Next.js",
	],
	person: {
		name: NAME_JA,
		alternateNames: [NAME_JA_HIRAGANA, NAME_JA_KATAKANA, NAME],
		jobTitle: "フロントエンドエンジニア",
		addressRegion: "大阪府",
		addressLocality: "大阪市平野区",
		areaServed: ["大阪", "大阪市平野区", "関西", "全国"],
		knowsAbout: [
			"サイト制作",
			"LP制作",
			"WordPressリプレイス",
			"Webサイト最適化",
			"フロントエンド開発",
			"Next.js",
			"Headless CMS",
		],
	},
};

export const staticHeaderContent = {
	sinceLabel: "Since 2021",
	links: [
		{ label: "Work", href: "#work" },
		{ label: "About", href: "#about" },
		{ label: "Pick My Brain!", href: "#chat" },
		{ label: "Services", href: "#services" },
		{ label: "Contact", href: "#contact" },
	],
};

export const staticHeroItems = [
	{ label: "Name:", value: NAME },
	{ label: "Title:", value: "Frontend Engineer" },
	{ label: "Dislikes:", value: "Work", isHighlighted: true },
];

export const staticAboutContent = {
	title: "About",
	leadText:
		"大阪市平野区を拠点に、サイト制作やLP制作、WordPressリプレイス、Webサイト最適化まで伴走するフロントエンドエンジニア",
	portraitImageUrl: ABOUT_PORTRAIT_IMAGE_URL,
	portraitImageAlt: NAME_PORTRAIT_ALT,
	blocks: [
		{
			title: "Hello",
			paragraphs: [
				`${NAME_JA}（${NAME_JA_HIRAGANA} / ${NAME_JA_KATAKANA}）です。使いやすさとつくりやすさを両立させたいフロントエンドエンジニアとして活動しています。`,
				"Next.jsとヘッドレスCMSを中心に、LP制作、コーポレートサイト制作、ECまわりの実装まで担当しています。",
			],
		},
		{
			title: "Journey",
			paragraphs: [
				"デザインの意図を汲み取った高精度な実装から、運用を見据えた設計まで一気通貫で手がけています。",
				"Next.js を軸に、管理画面開発や Headless CMS、EC構築、WordPressリプレイスまで、事業フェーズに応じた技術選定と実装を行っています。",
			],
		},
		{
			title: "Approach",
			paragraphs: [
				"緻密に設計したコンポーネントが、意図したレイアウトにはまる瞬間にいちばんやりがいを感じます。",
				"余白設計と責務分離を大切にし、見た目の美しさと再利用性を両立した、保守しやすいUIを組み立てています。",
				"公開後の更新しやすさや表示速度も重視し、改善し続けられるWebサイトの最適化まで見据えて設計します。",
			],
		},
		{
			title: "Location",
			paragraphs: [
				"大阪府大阪市平野区を拠点に、関西圏を中心としながらオンラインで全国のご相談にも対応しています。",
				"サイト制作、LP制作、新規構築だけでなく、既存WordPressサイトのリプレイスや情報整理、UI改善の相談も歓迎です。",
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
	email: "naoto.okawa0616@gmail.com",
};
