"use client";

import { HashLink } from "@/components/ui/hash-link";
import { CurrentTime } from "@/components/ui/current-time";
import { RollingText } from "@/components/ui/rolling-text";
import { SectionReveal } from "@/components/motion/section-reveal";
import { StaggerGroup } from "@/components/motion/stagger-group";
import { StaggerItem } from "@/components/motion/stagger-item";

export type HeaderLink = {
	label: string;
	href: string;
};

type HeaderProps = {
	sinceLabel?: string;
	links?: HeaderLink[];
	isVisible?: boolean;
};

const defaultLinks: HeaderLink[] = [
	{ label: "Work", href: "#work" },
	{ label: "About", href: "#about" },
	{ label: "Pick My Brain!", href: "#chat" },
	{ label: "Services", href: "#services" },
	{ label: "Contact", href: "#contact" },
];

/**
 * Portfolio-style header based on the supplied Figma navigation frame.
 */
export function Header({
	sinceLabel = "Since 2021",
	links = defaultLinks,
	isVisible = true,
}: HeaderProps) {
	return (
		<header
			className={
				isVisible
					? "translate-y-0 opacity-100 transition-all delay-200 duration-500 ease-out"
					: "pointer-events-none translate-y-2 opacity-0 transition-all duration-500 ease-out"
			}
		>
			<SectionReveal
				className="max-w-content gap-block mx-auto flex w-full flex-col px-[4.071%] pt-4 md:px-0 md:pt-6"
				y={20}
			>
				<div className="md:hidden">
					<div className="gap-stack-lg flex items-start justify-between">
						<p className="text-caption-sm leading-[24px] md:leading-none">{sinceLabel}</p>

						<CurrentTime className="gap-stack wide:gap-[14px] text-caption-sm text-right leading-none" />
					</div>

					<nav aria-label="Primary" className="mt-block">
						<StaggerGroup
							as="ul"
							className="text-caption-sm grid grid-cols-4 gap-y-4 leading-none md:grid-cols-8 md:gap-0"
							delayChildren={0.1}
							staggerChildren={0.08}
						>
							{links.map((link) => (
								<li key={`${link.href}-${link.label}`} className="col-span-2 list-none">
									<StaggerItem>
										<a
											className="group inline-flex w-fit whitespace-nowrap transition-opacity hover:opacity-70"
											href={link.href}
										>
											<RollingText text={link.label} durationMs={420} staggerMs={18} />
										</a>
									</StaggerItem>
								</li>
							))}
						</StaggerGroup>
					</nav>
				</div>

				<div className="hidden md:grid md:grid-cols-8 md:items-start">
					<p className="text-body leading-normal">{sinceLabel}</p>

					<nav aria-label="Primary" className="col-span-3">
						<StaggerGroup
							as="ul"
							className="text-body grid grid-cols-3 gap-y-4 leading-normal"
							delayChildren={0.1}
							staggerChildren={0.08}
						>
							{links.map((link) => (
								<li key={`${link.href}-${link.label}`} className="list-none">
									<StaggerItem y={12}>
										<HashLink
											className="group inline-flex w-fit whitespace-nowrap transition-opacity hover:opacity-70"
											href={link.href}
										>
											<RollingText text={link.label} durationMs={420} staggerMs={18} />
										</HashLink>
									</StaggerItem>
								</li>
							))}
						</StaggerGroup>
					</nav>

					<div className="col-span-3" />

					<CurrentTime className="text-body col-span-1 gap-0 leading-normal" />
				</div>
			</SectionReveal>
		</header>
	);
}
