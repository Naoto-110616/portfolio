"use client";

import Image from "next/image";

type ScrollVelocityWorkImageProps = {
	imageUrl: string;
	alt: string;
	className?: string;
};

export function ScrollVelocityWorkImage({
	imageUrl,
	alt,
	className,
}: ScrollVelocityWorkImageProps) {
	return (
		<div className={`relative overflow-hidden bg-surface ${className ?? ""}`}>
			<Image
				fill
				alt={alt}
				className="object-cover"
				sizes="(min-width: 768px) 496px, 100vw"
				src={imageUrl}
			/>
		</div>
	);
}
