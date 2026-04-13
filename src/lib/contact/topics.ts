export const contactTopics = ["Webサイト制作", "UI実装", "フロントエンド改善", "その他"] as const;

export type ContactTopic = (typeof contactTopics)[number];
