export type SectionTitleProps = {
	title: string;
	className?: string;
	titleClassName?: string;
	withDivider?: boolean;
};

export function SectionTitle({
	title,
	className = "",
	titleClassName = "",
	withDivider = true,
}: SectionTitleProps) {
	const classes = [withDivider ? "border-b border-primary-soft" : "", className]
		.filter(Boolean)
		.join(" ");
	const titleClasses = ["text-section text-foreground", titleClassName].filter(Boolean).join(" ");

	return (
		<div className={classes}>
			<h2 className={titleClasses}>{title}</h2>
		</div>
	);
}
