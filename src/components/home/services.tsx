import { AnimatedSectionTitle } from "@/components/motion/animated-section-title";
import { SectionReveal } from "@/components/motion/section-reveal";

export type ServiceItem = {
	id?: string;
	title: string;
	points: string[];
};

type ServicesSectionProps = {
	title?: string;
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
		<section className="flex flex-col gap-8 md:gap-[72px]">
			<h3 className="text-section text-foreground md:w-full md:text-right md:text-[72px] md:font-bold md:leading-none">
				{title}
			</h3>
			<div className="flex flex-col gap-16 text-caption leading-normal text-foreground md:flex-row md:flex-wrap md:gap-4 md:text-body">
				{points.map((point, index) => (
					<p key={`${title}-${index}`} className="md:w-[240px]">
						{point}
					</p>
				))}
			</div>
		</section>
	);
}

export function ServicesSection({
	title = "Services",
	items = defaultItems,
}: ServicesSectionProps) {
	return (
		<section id="services" className="flex w-full flex-col gap-block md:gap-section-lg">
			<AnimatedSectionTitle
				title={title}
				titleClassName="md:text-section-lg md:font-black"
			/>

			<div className="flex flex-col gap-block-lg md:gap-section-lg">
				{items.map((item, index) => (
					<SectionReveal
						key={item.id ?? `${item.title}-${index}`}
						delay={index * 0.06}
						y={24}
					>
						<ServiceGroup {...item} />
					</SectionReveal>
				))}
			</div>
		</section>
	);
}
