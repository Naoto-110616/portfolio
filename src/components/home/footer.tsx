import Image from "next/image";

import { SectionReveal } from "@/components/motion/section-reveal";
import { StaggerGroup } from "@/components/motion/stagger-group";
import { StaggerItem } from "@/components/motion/stagger-item";
import { CurrentTime } from "@/components/ui/current-time";
import { Link } from "@/components/ui/link";
import { RollingText } from "@/components/ui/rolling-text";
import { socialLinks as defaultSocialLinks } from "@/constans/const";
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
	return (
		<a
			className="group transition-opacity hover:opacity-80"
			href={href}
			target={href.startsWith("http") ? "_blank" : undefined}
			rel={href.startsWith("http") ? "noreferrer" : undefined}
		>
			<Link label={label} />
		</a>
	);
}

export function Footer({
	socialLinks = defaultSocialLinks,
	email = "naoto.okawa0616@gmail.com",
	copyright = "© 2026, All rights reserved",
	backToTopLabel = "Back to top",
}: FooterProps) {
	return (
		<footer className="relative overflow-hidden bg-primary text-accent">
			<LayoutGuides lineClassName="bg-accent/10" />
			<div
				aria-hidden="true"
				className="pointer-events-none absolute inset-0 opacity-40"
			/>

			<SectionReveal
				className="relative mx-auto flex max-w-content flex-col gap-6 px-[4.071%] pb-16 pt-4 md:gap-10 md:px-0 md:pb-40 md:pt-10"
				y={40}
			>
				<div className="flex flex-col gap-block">
					<div className="grid grid-cols-8 items-start">
						<StaggerGroup
							className="col-span-6 wide:col-span-7 grid grid-cols-2 gap-y-[14px] md:w-[256px] md:text-body"
							staggerChildren={0.08}
						>
							{socialLinks.map((link) => (
								<StaggerItem key={`${link.href}-${link.label}`}>
									<FooterLink {...link} />
								</StaggerItem>
							))}
						</StaggerGroup>

						<CurrentTime className="col-span-2 wide:col-span-1 wide:gap-[14px] text-caption text-accent md:text-body" />
					</div>

					<a
						className="group w-fit text-caption text-accent transition-opacity hover:opacity-80 md:text-body md:leading-normal"
						href={`mailto:${email}`}
					>
						<RollingText text={email} />
					</a>
				</div>
				<div>
					<div className="grid grid-cols-8 items-center justify-between text-caption text-accent md:text-body md:leading-normal">
						<p className="col-span-6 wide:col-span-7">
							{copyright}
						</p>

						<a
							className="group col-span-2 wide:col-span-1 transition-opacity hover:opacity-80"
							href="#top"
						>
							<Link
								className="text-inherit"
								iconClassName="-rotate-90"
								label={backToTopLabel}
							/>
						</a>
					</div>
					<hr className="mt-2 border-accent-soft md:mt-0" />
				</div>

				<SectionReveal className="pointer-events-none absolute bottom-[-18px] left-1/2 w-[clamp(360px,58vw,1024px)] -translate-x-1/2 md:bottom-[-107px] md:w-[1024px]">
					<Image
						alt=""
						className="block h-auto w-full max-w-[clamp(360px,58vw,1024px)] md:max-w-[1024px]"
						height={309}
						priority
						src="/name.svg"
						width={1024}
					/>
				</SectionReveal>
			</SectionReveal>
		</footer>
	);
}
