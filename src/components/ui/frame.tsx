import { ReactNode } from "react";

type FrameProps = {
	children: ReactNode;
	text?: string;
	className?: string;
	showBottomIndicator?: boolean;
};

export function Frame({
	children,
	text = "Text",
	className = "",
	showBottomIndicator = true,
}: FrameProps) {
	const classes = ["group relative flex w-fit flex-col", className]
		.filter(Boolean)
		.join(" ");

	return (
		<div className={classes}>
			<div className="relative z-10 w-fit cursor-grab">{children}</div>

			<div
				aria-hidden="true"
				className="pointer-events-none absolute inset-0 hidden group-hover:block"
			>
				<div className="absolute left-[-8px] top-[-12px] -translate-y-full rounded bg-primary px-2 py-0.5 text-caption-sm leading-none text-accent">
					{text}
				</div>

				<div className="absolute -inset-2 border border-primary">
					<span className="absolute left-0 top-0 size-1 -translate-x-1/2 -translate-y-1/2 bg-primary" />
					<span className="absolute left-1/2 top-0 size-1 -translate-x-1/2 -translate-y-1/2 bg-primary" />
					<span className="absolute right-0 top-0 size-1 translate-x-1/2 -translate-y-1/2 bg-primary" />
					<span className="absolute left-0 top-1/2 size-1 -translate-x-1/2 -translate-y-1/2 bg-primary" />
					<span className="absolute right-0 top-1/2 size-1 translate-x-1/2 -translate-y-1/2 bg-primary" />
					<span className="absolute bottom-0 left-0 size-1 -translate-x-1/2 translate-y-1/2 bg-primary" />
					<span className="absolute bottom-0 left-1/2 size-1 -translate-x-1/2 translate-y-1/2 bg-primary" />
					<span className="absolute bottom-0 right-0 size-1 translate-x-1/2 translate-y-1/2 bg-primary" />
				</div>

				{showBottomIndicator ? (
					<div className="absolute bottom-[-12px] right-[-8px] translate-y-full rounded bg-primary px-2 py-0.5">
						<div className="flex h-4 w-8 items-center rounded-full bg-accent px-0.5">
							<div className="size-3.5 rounded-full bg-primary" />
						</div>
					</div>
				) : null}
			</div>
		</div>
	);
}
