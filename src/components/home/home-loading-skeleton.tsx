import { HomeMainInner } from "@/components/ui/home-main-inner";

type SkeletonLineProps = {
	className?: string;
};

function SkeletonLine({ className = "" }: SkeletonLineProps) {
	return <div className={`bg-surface animate-pulse rounded ${className}`} />;
}

function SkeletonSectionTitle() {
	return <SkeletonLine className="h-10 w-[180px] md:h-16 md:w-[240px]" />;
}

export function HomeWorkSkeleton() {
	return (
		<section id="work" className="w-full">
			<HomeMainInner className="md:gap-section-lg flex flex-col gap-6">
				<SkeletonSectionTitle />
				<div className="gap-block-lg flex flex-col">
					{Array.from({ length: 3 }).map((_, index) => (
						<div key={`work-skeleton-${index}`} className="flex flex-col gap-4">
							<SkeletonLine className="aspect-361/203 w-full md:h-[279px] md:w-[496px]" />
							<SkeletonLine className="h-7 w-[70%] md:w-[45%]" />
							<SkeletonLine className="h-4 w-[90%] md:w-[60%]" />
						</div>
					))}
				</div>
			</HomeMainInner>
		</section>
	);
}

export function HomeMoreProjectsSkeleton() {
	return (
		<section className="w-full">
			<HomeMainInner className="gap-stack-sm md:gap-section-lg flex flex-col">
				<SkeletonSectionTitle />
				<div className="flex w-full flex-col gap-8 md:gap-10">
					<div className="w-full max-w-[110px] self-start md:max-w-[220px]">
						<SkeletonLine className="aspect-square w-full rounded-2xl" />
					</div>
					<div className="flex flex-col gap-6 md:flex-row md:items-center md:gap-4">
						<SkeletonLine className="aspect-361/203 w-full md:h-[279px] md:w-[496px] md:shrink-0" />
						<div className="flex w-full flex-col gap-4 md:min-h-[279px] md:flex-1 md:justify-between">
							<div className="flex flex-col gap-4">
								<div className="flex items-end justify-between gap-4">
									<SkeletonLine className="h-8 w-[70%]" />
									<SkeletonLine className="h-5 w-20" />
								</div>
								<SkeletonLine className="h-4 w-[90%]" />
								<SkeletonLine className="h-4 w-[70%]" />
								<div className="grid grid-cols-2 gap-4">
									<SkeletonLine className="h-14" />
									<SkeletonLine className="h-14" />
								</div>
							</div>
							<SkeletonLine className="h-4 w-[80%]" />
						</div>
					</div>
				</div>
			</HomeMainInner>
		</section>
	);
}

export function HomeCmsContentSkeleton() {
	return (
		<>
			<HomeWorkSkeleton />
			<HomeMoreProjectsSkeleton />
		</>
	);
}

export function HomeServicesSkeleton() {
	return (
		<section id="services" className="w-full">
			<HomeMainInner className="gap-block md:gap-section-lg flex flex-col">
				<SkeletonSectionTitle />
				<div className="gap-block-lg md:gap-section-lg flex flex-col">
					{Array.from({ length: 3 }).map((_, index) => (
						<div key={`service-skeleton-${index}`} className="flex flex-col gap-8 md:gap-[72px]">
							<SkeletonLine className="h-12 w-[65%] md:ml-auto md:h-16 md:w-[40%]" />
							<div className="grid gap-4 md:grid-cols-3">
								<SkeletonLine className="h-5 w-full" />
								<SkeletonLine className="h-5 w-full" />
								<SkeletonLine className="h-5 w-full" />
							</div>
						</div>
					))}
				</div>
			</HomeMainInner>
		</section>
	);
}

export function HomeFooterSkeleton() {
	return (
		<footer className="w-full">
			<HomeMainInner className="flex flex-col gap-6 py-8">
				<SkeletonLine className="h-6 w-[220px]" />
				<div className="flex gap-4">
					<SkeletonLine className="h-4 w-14" />
					<SkeletonLine className="h-4 w-14" />
					<SkeletonLine className="h-4 w-14" />
				</div>
			</HomeMainInner>
		</footer>
	);
}
