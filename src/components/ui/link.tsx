import { ArrowRight } from "lucide-react";

type LinkProps = {
	label: string;
	className?: string;
	iconClassName?: string;
};

export function Link({ label, className = "", iconClassName = "" }: LinkProps) {
	const classes = [
		"inline-flex items-center text-caption text-accent",
		className,
	]
		.filter(Boolean)
		.join(" ");

	return (
		<span className={classes}>
			<span>{label}</span>
			<ArrowRight
				aria-hidden="true"
				className={["size-3 shrink-0 -rotate-45", iconClassName]
					.filter(Boolean)
					.join(" ")}
				strokeWidth={2}
			/>
		</span>
	);
}
