import type {
	ContactFormSettings,
	ProjectsResult,
	ServicesResult,
	SnsLinksResult,
} from "@/lib/contentful/types";
import { contactTopics } from "@/lib/contact/topics";

export const fallbackProjects: ProjectsResult = {
	items: [],
	source: "fallback",
	reason: "Contentful credentials are not configured yet.",
};

export const fallbackServices: ServicesResult = {
	items: [
		{
			id: "fallback-service-website",
			title: "Website Development",
			points: [
				"Next.js と TypeScript をベースに、保守性の高いコーポレート/ポートフォリオサイトを設計・実装します。",
				"SEO、パフォーマンス、アクセシビリティを考慮した情報設計と UI 実装を行います。",
			],
		},
		{
			id: "fallback-service-cms",
			title: "Headless CMS Integration",
			points: [
				"Contentful などの CMS とフロントエンドを接続し、運用しやすいコンテンツ管理フローを構築します。",
				"API 設計、型安全なデータ取得、フォールバック戦略まで含めて実装します。",
			],
		},
		{
			id: "fallback-service-operations",
			title: "Operation & Improvement",
			points: [
				"公開後の分析・改善サイクルを前提に、機能追加しやすい構成でプロジェクトを整備します。",
				"表示品質や動作安定性を担保するため、テストや監視を取り入れた運用基盤を提案します。",
			],
		},
	],
	source: "fallback",
	reason: "Contentful credentials are not configured yet. Showing local starter services.",
};

export const fallbackSnsLinks: SnsLinksResult = {
	items: [],
	source: "fallback",
	reason: "Contentful credentials are not configured yet.",
};

export const fallbackContactFormSettings: ContactFormSettings = {
	id: "fallback-contact-form-settings",
	title: "Contact Form Settings",
	topicOptions: [...contactTopics],
	source: "fallback",
	reason: "Contentful credentials are not configured yet.",
};
