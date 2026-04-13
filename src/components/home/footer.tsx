"use client";

import { MosaicHoverImage } from "@/components/home/mosaic-hover-image";
import { SectionReveal } from "@/components/motion/section-reveal";
import { StaggerGroup } from "@/components/motion/stagger-group";
import { StaggerItem } from "@/components/motion/stagger-item";
import { CurrentTime } from "@/components/ui/current-time";
import { HashLink } from "@/components/ui/hash-link";
import { Link } from "@/components/ui/link";
import { RollingText } from "@/components/ui/rolling-text";
import { LayoutGuides } from "../ui/layout-guides";

export type FooterLinkItem = {
	label: string;
	href: string;
};

type FooterProps = {
	socialLinks?: FooterLinkItem[];
	email?: string;
	copyright?: string;
	backToTopLabel?: string;
};

function FooterLink({ href, label }: FooterLinkItem) {
	const className = "group transition-opacity hover:opacity-80";
	const content = <Link label={label} />;

	if (href.startsWith("#")) {
		return (
			<HashLink className={className} href={href}>
				{content}
			</HashLink>
		);
	}

	return (
		<a
			className={className}
			href={href}
			target={href.startsWith("http") ? "_blank" : undefined}
			rel={href.startsWith("http") ? "noreferrer" : undefined}
		>
			{content}
		</a>
	);
}

export function Footer({
	socialLinks = [],
	email = "naoto.okawa0616@gmail.com",
	copyright = "© 2026, All rights reserved",
	backToTopLabel = "Back to top",
}: FooterProps) {
	return (
		<footer className="bg-primary text-accent relative overflow-hidden">
			<LayoutGuides lineClassName="bg-accent/10" />
			<div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-40" />

			<SectionReveal
				className="max-w-content relative mx-auto flex flex-col gap-6 px-[4.071%] pt-4 pb-16 md:gap-10 md:px-0 md:pt-10 md:pb-40"
				y={40}
			>
				<div className="gap-block flex flex-col">
					<div className="grid grid-cols-8 items-start">
						<StaggerGroup
							className="wide:col-span-7 md:text-body col-span-6 grid grid-cols-2 gap-y-[14px] md:w-[256px]"
							staggerChildren={0.08}
						>
							{socialLinks.map((link) => (
								<StaggerItem key={`${link.href}-${link.label}`}>
									<FooterLink {...link} />
								</StaggerItem>
							))}
						</StaggerGroup>

						<CurrentTime className="wide:col-span-1 wide:gap-[14px] text-caption text-accent md:text-body col-span-2" />
					</div>

					<a
						className="group text-caption text-accent md:text-body w-fit transition-opacity hover:opacity-80 md:leading-normal"
						href={`mailto:${email}`}
					>
						<RollingText text={email} />
					</a>
				</div>
				<div>
					<div className="text-caption text-accent md:text-body grid grid-cols-8 items-center justify-between md:leading-normal">
						<p className="wide:col-span-7 col-span-6">{copyright}</p>

						<HashLink
							className="group wide:col-span-1 col-span-2 transition-opacity hover:opacity-80"
							href="#top"
						>
							<Link className="text-inherit" iconClassName="-rotate-90" label={backToTopLabel} />
						</HashLink>
					</div>
					<hr className="border-accent-soft mt-2 md:mt-0" />
				</div>

				<SectionReveal className="pointer-events-none absolute bottom-[-18px] left-1/2 w-[clamp(360px,58vw,1024px)] -translate-x-1/2 md:bottom-[-50px] md:w-[1024px]">
					<MosaicHoverImage
						alt=""
						className="block h-auto w-full max-w-[clamp(360px,58vw,1024px)] md:max-w-[1024px]"
						fetchPriority="high"
						height={309}
						src="/name.svg"
						width={1024}
						wrapperClassName="pointer-events-auto"
					/>
				</SectionReveal>
			</SectionReveal>
		</footer>
	);
}
