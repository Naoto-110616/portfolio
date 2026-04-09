import { Dispatch, ReactNode, SetStateAction, useState } from "react";

type FrameRenderProps = {
	isSwitchedOn: boolean;
	setIsSwitchDisabled: Dispatch<SetStateAction<boolean>>;
};

type FrameProps = {
	children: ReactNode | ((props: FrameRenderProps) => ReactNode);
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
	const [isBottomIndicatorOn, setIsBottomIndicatorOn] = useState(false);
	const [isSwitchDisabled, setIsSwitchDisabled] = useState(false);
	const classes = ["group relative flex w-fit flex-col", className]
		.filter(Boolean)
		.join(" ");
	const content =
		typeof children === "function"
			? children({
					isSwitchedOn: isBottomIndicatorOn,
					setIsSwitchDisabled,
				})
			: children;

	return (
		<div className={classes}>
			<div
				className={`relative z-10 w-fit ${isInteractive ? "cursor-grab" : "cursor-default"}`}
			>
				{content}
			</div>

			<div className="pointer-events-none absolute inset-0 z-20 opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100">
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
					<div className="pointer-events-auto absolute bottom-[-12px] right-[-8px] z-30 translate-y-full">
						<button
							aria-checked={isBottomIndicatorOn}
							aria-disabled={isSwitchDisabled}
							aria-label={bottomIndicatorLabel ?? `${text} switch`}
							className={`relative z-10 rounded bg-primary px-2 py-0.5 outline-none before:absolute before:-inset-2 before:content-[''] focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
								isSwitchDisabled
									? "cursor-not-allowed opacity-60"
									: "cursor-pointer"
							}`}
							disabled={isSwitchDisabled}
							onClick={() => {
								setIsBottomIndicatorOn((current) => !current);
							}}
							onPointerDown={(event) => {
								event.stopPropagation();
							}}
							role="switch"
							type="button"
						>
							<span
								className={`flex h-4 w-8 items-center rounded-full px-0.5 transition-colors duration-200 ${
									isBottomIndicatorOn ? "bg-accent/60" : "bg-accent"
								}`}
							>
								<span
									className={`size-3.5 rounded-full bg-primary transition-transform duration-200 ease-out ${
										isBottomIndicatorOn ? "translate-x-0" : "translate-x-[14px]"
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
