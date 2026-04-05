import { AnimatedSectionTitle } from "@/components/motion/animated-section-title";
import { SectionReveal } from "@/components/motion/section-reveal";
import { StaggerGroup } from "@/components/motion/stagger-group";
import { StaggerItem } from "@/components/motion/stagger-item";

type AboutBlock = {
	title: string;
	paragraphs: string[];
};

type AboutSectionProps = {
	blocks?: AboutBlock[];
};

const aboutImage =
	"https://www.figma.com/api/mcp/asset/1d9e5c05-e456-414b-9635-956928c1245c";

const leadText =
	"モダンなWebに、体験と仕組みをデザインするフロントエンドエンジニア";

const defaultBlocks: AboutBlock[] = [
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
			"フロントエンドエンジニアとして、デザインの意図を汲み取った高精度な実装から、スケーラブルなシステム設計までを一気通貫で手がけています。",
			"現在はフルリモート環境にて、Next.js をベースとした多様なWebプロダクトの開発に従事。特に、shadcn/ui や TanStack Table を活用した管理画面開発においては、複雑なデータ操作（CRUD）を共通化し、npmパッケージとして社内基盤を構築するなど、開発体験（DX）の向上にも注力しています。",
			"Contentful などのHeadless CMSを用いたメディア運用基盤の構築から、Shopify Plus によるエンタープライズ向けのEC構築まで、ビジネスの成長段階に応じた最適な技術スタックをご提案・実装いたします。",
		],
	},
	{
		title: "Approach",
		paragraphs: [
			"私が開発において最も充足感を覚えるのは、緻密に設計したコンポーネントが、パズルのピースのように思惑通りのレイアウトへ完璧に収まっていく瞬間です。",
			"最近では、デザインから実装までを一気通貫で担当するプロジェクトを増やしています。",
			"8pxルールやグリッドシステムに基づいた整然とした余白設計をベースに、UI層とロジック層を明確に分離したコンポーネント構築が私の「型」です。この一貫したプロセスにより、見た目の美しさだけでなく、コードの再利用性とメンテナンス性を両立させた、堅牢なプロダクトを生み出すことを信条としています。",
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
];

function AboutContentBlock({ title, paragraphs }: AboutBlock) {
	return (
		<section className="flex flex-col gap-stack md:grid md:grid-cols-[256px_minmax(0,1fr)] md:gap-0">
			<h3 className="text-heading text-foreground md:text-section md:font-bold">
				{title}
			</h3>
			<div className="flex flex-col gap-stack text-caption leading-normal text-foreground md:text-body">
				{paragraphs.map((paragraph) => (
					<p key={paragraph}>{paragraph}</p>
				))}
			</div>
		</section>
	);
}

export function AboutSection({ blocks = defaultBlocks }: AboutSectionProps) {
	return (
		<section id="about" className="flex w-full flex-col gap-block md:gap-section-lg">
			<AnimatedSectionTitle
				title="About"
				titleClassName="md:text-section-lg md:font-black"
			/>

			<div className="flex flex-col gap-block md:grid md:grid-cols-[368px_minmax(0,1fr)] md:items-start md:gap-4">
				<SectionReveal>
					<img
						alt="Naoto Okawa portrait"
						className="aspect-1536/2048 w-full object-cover md:h-[491px] md:w-[368px] md:aspect-auto"
						src={aboutImage}
					/>
				</SectionReveal>

				<div className="flex flex-col gap-block md:gap-section-lg">
					<SectionReveal y={20}>
						<p className="text-section text-foreground md:max-w-[512px] md:text-[40px] md:font-black md:leading-[1.4]">
							{leadText}
						</p>
					</SectionReveal>

					<StaggerGroup
						className="flex flex-col gap-block-md md:gap-section-lg"
						delayChildren={0.08}
						staggerChildren={0.14}
					>
						{blocks.map((block) => (
							<StaggerItem key={block.title}>
								<AboutContentBlock {...block} />
							</StaggerItem>
						))}
					</StaggerGroup>
				</div>
			</div>
		</section>
	);
}
