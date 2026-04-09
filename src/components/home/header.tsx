 "use client";

import { CurrentTime } from "@/components/ui/current-time";
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
					? "translate-y-0 opacity-100 transition-all duration-500 delay-200 ease-out"
					: "pointer-events-none translate-y-2 opacity-0 transition-all duration-500 ease-out"
			}
		>
			<SectionReveal
				className="mx-auto flex w-full max-w-content flex-col gap-block px-[4.071%] pt-4 md:px-0 md:pt-6"
				y={20}
			>
				<div className="md:hidden">
					<div className="flex items-start justify-between gap-stack-lg">
						<p className="text-caption-sm leading-none">{sinceLabel}</p>

						<CurrentTime className="gap-stack wide:gap-[14px] text-right text-caption-sm leading-none" />
					</div>

					<nav aria-label="Primary" className="mt-block">
						<StaggerGroup
							as="ul"
							className="grid grid-cols-8 text-caption-sm leading-none"
							delayChildren={0.1}
							staggerChildren={0.08}
						>
							{links.map((link) => (
								<li
									key={`${link.href}-${link.label}`}
									className="col-span-2 list-none"
								>
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
				</div>

				<div className="hidden md:grid md:grid-cols-8 md:items-start">
					<p className="text-body leading-normal">{sinceLabel}</p>

					<nav aria-label="Primary" className="col-span-2">
						<StaggerGroup
							as="ul"
							className="grid grid-cols-2 gap-y-4 text-body leading-normal"
							delayChildren={0.1}
							staggerChildren={0.08}
						>
							{links.map((link) => (
								<li key={`${link.href}-${link.label}`} className="list-none">
									<StaggerItem y={12}>
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

					<div className="col-span-4" />

					<CurrentTime className="col-span-1 gap-0 text-body leading-normal" />
				</div>
			</SectionReveal>
		</header>
	);
}
