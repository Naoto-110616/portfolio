import { ArrowRight } from "lucide-react";

import { SectionReveal } from "@/components/motion/section-reveal";
import { StaggerGroup } from "@/components/motion/stagger-group";
import { StaggerItem } from "@/components/motion/stagger-item";
import { Frame } from "@/components/ui/frame";

type HeroItem = {
	label: string;
	value: string;
	isHighlighted?: boolean;
};

type HeroSectionProps = {
	items?: HeroItem[];
};

const defaultItems: HeroItem[] = [
	{ label: "Name:", value: "Naoto Okawa" },
	{ label: "Title:", value: "Frontend Engineer" },
	{ label: "Dislikes:", value: "Work", isHighlighted: true },
];

function HeroRow({ label, value, isHighlighted = false }: HeroItem) {
	return (
		<div className="flex flex-col">
			<div className="relative w-full max-w-content-sp">
				<p className="text-hero-sub text-foreground md:text-hero-sub-lg md:leading-none">
					{label}
				</p>
				{isHighlighted ? (
					<span
						aria-hidden="true"
						className="absolute left-0 top-[24px] h-[6px] w-[45px] bg-accent md:top-[36px] md:w-[84px] md:h-2"
					/>
				) : null}
			</div>

			{isHighlighted ? (
				<>
					<p className="w-full max-w-content-sp text-[44px] leading-[1.4] font-bold text-foreground md:hidden">
						{value}
					</p>
					<Frame className="hidden md:flex">
						<p className="text-hero-lg leading-none font-black text-foreground">
							{value}
						</p>
					</Frame>
				</>
			) : (
				<p className="w-full max-w-content-sp text-[44px] leading-[1.4] font-bold text-foreground md:max-w-none md:text-hero-lg md:leading-none md:font-black">
					{value}
				</p>
			)}
		</div>
	);
}

function ViewMore() {
	return (
		<div className="w-fit text-primary">
			<a
				className="inline-flex items-center overflow-hidden rounded-[24px] border border-primary bg-accent px-4 py-2 text-caption text-primary transition-opacity hover:opacity-80 md:hidden"
				href="#work"
			>
				Get to know me
			</a>

			<div className="md:hidden flex w-full flex-col items-center justify-center gap-1 text-caption text-primary transition-opacity hover:opacity-80">
				<span>Or scroll down</span>
				<ArrowRight
					aria-hidden="true"
					className="size-3 rotate-90 shrink-0"
					strokeWidth={2}
				/>
			</div>

			<Frame className="hidden md:flex md:items-end">
				<div className="flex flex-col items-start gap-1">
					<a
						className="inline-flex items-center overflow-hidden rounded-[24px] border border-primary bg-accent px-4 py-2 text-body leading-normal text-primary transition-opacity hover:opacity-80"
						href="#work"
					>
						Get to know me
					</a>

					<div className="flex w-full flex-col items-center justify-center gap-1 text-caption text-primary transition-opacity hover:opacity-80">
						<span>Or scroll down</span>
						<ArrowRight
							aria-hidden="true"
							className="size-6 rotate-90 shrink-0"
							strokeWidth={1.75}
						/>
					</div>
				</div>
			</Frame>
		</div>
	);
}

export function HeroSection({ items = defaultItems }: HeroSectionProps) {
	return (
		<section className="flex w-full flex-col items-center gap-[56px] md:gap-section">
			<StaggerGroup
				className="w-full"
				delayChildren={0.08}
				staggerChildren={0.14}
			>
				<div className="grid grid-cols-8">
					<div className="col-span-8 flex flex-col gap-block md:col-span-8 md:gap-10">
						{items.map((item) => (
							<StaggerItem key={item.label}>
								<HeroRow {...item} />
							</StaggerItem>
						))}
					</div>
				</div>
			</StaggerGroup>

			<SectionReveal y={16}>
				<ViewMore />
			</SectionReveal>
		</section>
	);
}
