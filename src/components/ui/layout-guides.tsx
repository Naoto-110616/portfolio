type LayoutGuidesProps = {
	lineClassName?: string;
};

const mobileGuideOffsets = [
	"4.071%",
	"15.267%",
	"26.972%",
	"38.422%",
	"49.873%",
	"61.323%",
	"72.774%",
	"84.224%",
	"95.674%",
] as const;

const desktopGuideOffsets = [
	"0%",
	"12.5%",
	"25%",
	"37.5%",
	"50%",
	"62.5%",
	"75%",
	"87.5%",
] as const;

/**
 * Reusable page guides matching the mobile and desktop grid system.
 */
export function LayoutGuides({
	lineClassName = "bg-foreground/10",
}: LayoutGuidesProps) {
	const lineClasses = ["absolute top-0 bottom-0 block w-px", lineClassName]
		.filter(Boolean)
		.join(" ");

	return (
		<div className="pointer-events-none absolute inset-y-0 left-0 w-full z-10">
			<div className="md:hidden">
				{mobileGuideOffsets.map((offset) => (
					<span key={offset} className={lineClasses} style={{ left: offset }} />
				))}
			</div>

			<div className="absolute inset-y-0 inset-x-0 mx-auto hidden w-full max-w-content md:block z-10">
				{desktopGuideOffsets.map((offset) => (
					<span key={offset} className={lineClasses} style={{ left: offset }} />
				))}
				<span className={lineClasses} style={{ left: "100%" }} />
			</div>
		</div>
	);
}
