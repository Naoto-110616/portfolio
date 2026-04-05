import { CurrentTime } from "@/components/ui/current-time";
import { SectionReveal } from "@/components/motion/section-reveal";
import { StaggerGroup } from "@/components/motion/stagger-group";
import { StaggerItem } from "@/components/motion/stagger-item";

type HeaderLink = {
	label: string;
	href: string;
};

type HeaderProps = {
	sinceLabel?: string;
	links?: HeaderLink[];
};

const defaultLinks: HeaderLink[] = [
	{ label: "Work", href: "#work" },
	{ label: "About", href: "#about" },
	{ label: "Pick My Brain!", href: "#chat" },
	{ label: "Services", href: "#services" },
];

/**
 * Portfolio-style header based on the supplied Figma navigation frame.
 */
export function Header({
	sinceLabel = "Since 2021",
	links = defaultLinks,
}: HeaderProps) {
	return (
		<header>
			<SectionReveal
				className="mx-auto flex w-full max-w-content flex-col gap-block px-[4.071%] pt-4 md:px-0 md:py-6"
				y={20}
			>
				<div className="flex items-start justify-between gap-stack-lg">
					<p className="text-caption-sm leading-none">{sinceLabel}</p>

					<CurrentTime className="gap-stack text-right text-caption-sm leading-none" />
				</div>

				<nav aria-label="Primary">
					<StaggerGroup
						as="ul"
						className="grid grid-cols-8 text-caption-sm leading-none md:grid-cols-8 md:gap-0"
						delayChildren={0.1}
						staggerChildren={0.08}
					>
						{links.map((link) => (
							<li key={link.label} className="col-span-2 list-none">
								<StaggerItem>
									<a
										className="inline-flex w-full transition-opacity hover:opacity-70"
										href={link.href}
									>
										{link.label}
									</a>
								</StaggerItem>
							</li>
						))}
					</StaggerGroup>
				</nav>
			</SectionReveal>
		</header>
	);
}
