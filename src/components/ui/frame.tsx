import { ReactNode } from "react";

type FrameProps = {
	children: ReactNode;
	text?: string;
	className?: string;
};

export function Frame({
	children,
	text = "Text",
	className = "",
}: FrameProps) {
	const classes = ["relative flex w-fit flex-col gap-1", className]
		.filter(Boolean)
		.join(" ");

	return (
		<div className={classes}>
			<div className="w-fit rounded bg-primary px-2 py-0.5 text-caption-sm leading-none text-accent">
				{text}
			</div>

			<div className="relative w-fit border border-primary p-2">
				{children}

				<span className="absolute left-0 top-0 size-0.5 -translate-x-1/2 -translate-y-1/2 bg-primary" />
				<span className="absolute left-1/2 top-0 size-0.5 -translate-x-1/2 -translate-y-1/2 bg-primary" />
				<span className="absolute right-0 top-0 size-0.5 translate-x-1/2 -translate-y-1/2 bg-primary" />
				<span className="absolute left-0 top-1/2 size-0.5 -translate-x-1/2 -translate-y-1/2 bg-primary" />
				<span className="absolute right-0 top-1/2 size-0.5 translate-x-1/2 -translate-y-1/2 bg-primary" />
				<span className="absolute bottom-0 left-0 size-0.5 -translate-x-1/2 translate-y-1/2 bg-primary" />
				<span className="absolute bottom-0 left-1/2 size-0.5 -translate-x-1/2 translate-y-1/2 bg-primary" />
				<span className="absolute bottom-0 right-0 size-0.5 translate-x-1/2 translate-y-1/2 bg-primary" />
			</div>

			<div className="ml-auto w-fit rounded bg-primary px-2 py-0.5">
				<div className="flex h-4 w-8 items-center rounded-full bg-accent px-0.5">
					<div className="size-3.5 rounded-full bg-primary" />
				</div>
			</div>
		</div>
	);
}
