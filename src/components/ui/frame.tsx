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
	isAlwaysVisible?: boolean;
};

export function Frame({
	children,
	text = "Text",
	className = "",
	showBottomIndicator = true,
	isInteractive = true,
	bottomIndicatorLabel,
	isAlwaysVisible = false,
}: FrameProps) {
	const [isBottomIndicatorOn, setIsBottomIndicatorOn] = useState(false);
	const [isSwitchDisabled, setIsSwitchDisabled] = useState(false);
	const classes = ["group relative flex w-fit flex-col", className].filter(Boolean).join(" ");
	const content =
		typeof children === "function"
			? children({
					isSwitchedOn: isBottomIndicatorOn,
					setIsSwitchDisabled,
				})
			: children;

	return (
		<div className={classes}>
			<div className={`relative z-10 w-fit ${isInteractive ? "cursor-grab" : "cursor-default"}`}>
				{content}
			</div>

			<div
				className={`pointer-events-none absolute inset-0 z-20 ${
					isAlwaysVisible
						? "opacity-100"
						: "opacity-0 transition-opacity group-focus-within:opacity-100 group-hover:opacity-100"
				}`}
			>
				<div
					aria-hidden="true"
					className="bg-primary text-caption-sm text-accent absolute top-[-12px] left-[-8px] -translate-y-full rounded px-2 py-0.5 leading-none"
				>
					{text}
				</div>

				<div aria-hidden="true" className="border-primary absolute -inset-2 border">
					<span className="bg-primary absolute top-0 left-0 size-1 -translate-x-1/2 -translate-y-1/2" />
					<span className="bg-primary absolute top-0 left-1/2 size-1 -translate-x-1/2 -translate-y-1/2" />
					<span className="bg-primary absolute top-0 right-0 size-1 translate-x-1/2 -translate-y-1/2" />
					<span className="bg-primary absolute top-1/2 left-0 size-1 -translate-x-1/2 -translate-y-1/2" />
					<span className="bg-primary absolute top-1/2 right-0 size-1 translate-x-1/2 -translate-y-1/2" />
					<span className="bg-primary absolute bottom-0 left-0 size-1 -translate-x-1/2 translate-y-1/2" />
					<span className="bg-primary absolute bottom-0 left-1/2 size-1 -translate-x-1/2 translate-y-1/2" />
					<span className="bg-primary absolute right-0 bottom-0 size-1 translate-x-1/2 translate-y-1/2" />
				</div>

				{showBottomIndicator ? (
					<div className="pointer-events-auto absolute right-[-8px] bottom-[-12px] z-30 translate-y-full">
						<button
							aria-checked={isBottomIndicatorOn}
							aria-disabled={isSwitchDisabled}
							aria-label={bottomIndicatorLabel ?? `${text} switch`}
							className={`bg-primary focus-visible:ring-primary focus-visible:ring-offset-background relative z-10 rounded px-2 py-0.5 outline-none before:absolute before:-inset-2 before:content-[''] focus-visible:ring-2 focus-visible:ring-offset-2 ${
								isSwitchDisabled ? "cursor-not-allowed opacity-60" : "cursor-pointer"
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
									className={`bg-primary size-3.5 rounded-full transition-transform duration-200 ease-out ${
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
