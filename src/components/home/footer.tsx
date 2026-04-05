import Image from "next/image";

import { socialLinks } from "@/constans/const";
import { SectionReveal } from "@/components/motion/section-reveal";
import { StaggerGroup } from "@/components/motion/stagger-group";
import { StaggerItem } from "@/components/motion/stagger-item";
import { CurrentTime } from "@/components/ui/current-time";
import { Link } from "@/components/ui/link";
import { LayoutGuides } from "../ui/layout-guides";

function FooterLink({ href, label }: { href: string; label: string }) {
	return (
		<a
			className="transition-opacity hover:opacity-80"
			href={href}
			target={href.startsWith("http") ? "_blank" : undefined}
			rel={href.startsWith("http") ? "noreferrer" : undefined}
		>
			<Link label={label} />
		</a>
	);
}

export function Footer() {
	return (
		<footer className="relative overflow-hidden bg-primary text-accent">
			<LayoutGuides lineClassName="bg-accent/10" />
			<div
				aria-hidden="true"
				className="pointer-events-none absolute inset-0 opacity-40"
			/>

			<SectionReveal
				className="relative mx-auto flex max-w-content flex-col gap-6 px-[4.071%] pb-16 pt-4 md:px-0 md:pb-40 md:pt-6"
				y={40}
			>
				<div className="flex flex-col gap-block">
					<div className="grid grid-cols-8 items-start">
						<StaggerGroup
							className="col-span-6 flex flex-col gap-stack-sm"
							staggerChildren={0.08}
						>
							{socialLinks.map((link) => (
								<StaggerItem key={link.label}>
									<FooterLink {...link} />
								</StaggerItem>
							))}
						</StaggerGroup>

						<CurrentTime className="col-span-2 text-caption text-accent" />
					</div>

					<a
						className="w-fit text-caption text-accent transition-opacity hover:opacity-80"
						href="mailto:naoto.okawa0616@gmail.com"
					>
						naoto.okawa0616@gmail.com
					</a>
				</div>
				<div>
					<div className="grid grid-cols-8 items-center justify-between text-caption text-accent">
						<p className="col-span-6">© 2026, All rights reserved</p>

						<a
							className="col-span-2 transition-opacity hover:opacity-80"
							href="#top"
						>
							<Link
								className="text-inherit"
								iconClassName="-rotate-90"
								label="Back to top"
							/>
						</a>
					</div>
					<hr className="border-accent-soft" />
				</div>

				<SectionReveal className="pointer-events-none absolute bottom-[-18px] left-1/2 w-[clamp(360px,58vw,1024px)] -translate-x-1/2">
					<Image
						alt=""
						className="block h-auto w-full max-w-[clamp(360px,58vw,1024px)]"
						height={66}
						priority
						src="/name.svg"
						width={360}
					/>
				</SectionReveal>
			</SectionReveal>
		</footer>
	);
}
