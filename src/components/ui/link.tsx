import { ArrowRight } from "lucide-react";

import { RollingText } from "@/components/ui/rolling-text";

type LinkProps = {
	label: string;
	className?: string;
	iconClassName?: string;
};

export function Link({ label, className = "", iconClassName = "" }: LinkProps) {
	const classes = ["inline-flex items-center text-caption text-accent md:text-body", className]
		.filter(Boolean)
		.join(" ");

	return (
		<span className={classes}>
			<RollingText text={label} />
			<ArrowRight
				aria-hidden="true"
				className={["size-3 shrink-0 -rotate-45", iconClassName].filter(Boolean).join(" ")}
				strokeWidth={2}
			/>
		</span>
	);
}
