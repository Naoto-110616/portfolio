import { ReactNode, useState } from "react";

type FrameProps = {
	children: ReactNode;
	text?: string;
	className?: string;
	showBottomIndicator?: boolean;
	isInteractive?: boolean;
	bottomIndicatorLabel?: string;
};

export function Frame({
	children,
	text = "Text",
	className = "",
	showBottomIndicator = true,
	isInteractive = true,
	bottomIndicatorLabel,
}: FrameProps) {
	const [isBottomIndicatorOn, setIsBottomIndicatorOn] = useState(true);
	const classes = ["group relative flex w-fit flex-col", className]
		.filter(Boolean)
		.join(" ");

	return (
		<div className={classes}>
			<div
				className={`relative z-10 w-fit ${isInteractive ? "cursor-grab" : "cursor-default"}`}
			>
				{children}
			</div>

			<div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100">
				<div
					aria-hidden="true"
					className="absolute left-[-8px] top-[-12px] -translate-y-full rounded bg-primary px-2 py-0.5 text-caption-sm leading-none text-accent"
				>
					{text}
				</div>

				<div
					aria-hidden="true"
					className="absolute -inset-2 border border-primary"
				>
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
					<div className="pointer-events-auto absolute bottom-[-12px] right-[-8px] translate-y-full">
						<button
							aria-checked={isBottomIndicatorOn}
							aria-label={bottomIndicatorLabel ?? `${text} switch`}
							className="cursor-pointer rounded bg-primary px-2 py-0.5 outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
							onClick={() => {
								setIsBottomIndicatorOn((current) => !current);
							}}
							role="switch"
							type="button"
						>
							<span className="flex h-4 w-8 items-center rounded-full bg-accent px-0.5">
								<span
									className={`size-3.5 rounded-full bg-primary transition-transform duration-200 ease-out ${
										isBottomIndicatorOn ? "translate-x-0" : "translate-x-4"
									}`}
								/>
							</span>
						</button>
					</div>
				) : null}
			</div>
		</div>
	);
}
