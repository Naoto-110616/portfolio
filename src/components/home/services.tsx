import { AnimatedSectionTitle } from "@/components/motion/animated-section-title";
import { SectionReveal } from "@/components/motion/section-reveal";

type ServiceItem = {
	title: string;
	points: string[];
};

type ServicesSectionProps = {
	items?: ServiceItem[];
};

const defaultItems: ServiceItem[] = [
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
];

function ServiceGroup({ title, points }: ServiceItem) {
	return (
		<section className="flex flex-col gap-8">
			<h3 className="text-section text-foreground">{title}</h3>
			<div className="flex flex-col gap-16 text-caption leading-normal text-foreground">
				{points.map((point) => (
					<p key={point}>{point}</p>
				))}
			</div>
		</section>
	);
}

export function ServicesSection({ items = defaultItems }: ServicesSectionProps) {
	return (
		<section id="services" className="flex w-full flex-col gap-block">
			<AnimatedSectionTitle title="Services" />

			<div className="flex flex-col gap-block-lg">
				{items.map((item, index) => (
					<SectionReveal key={item.title} delay={index * 0.06} y={24}>
						<ServiceGroup {...item} />
					</SectionReveal>
				))}
			</div>
		</section>
	);
}
