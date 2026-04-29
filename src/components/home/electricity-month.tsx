"use client";

import { useEffect, useState } from "react";

import { RollingText } from "@/components/ui/rolling-text";

type OkResponse = {
	ok: true;
	kwh: number;
	yearMonth: string;
	timezone: string;
	intervalCount: number;
};

type OtherResponse = {
	ok: false;
	reason: string;
};

type ApiResponse = OkResponse | OtherResponse;

async function fetchElectricityMonth(): Promise<ApiResponse | null> {
	const response = await fetch("/api/octopus/electricity-month");

	if (!response.ok) {
		return null;
	}

	return (await response.json()) as ApiResponse;
}

export function ElectricityMonth({ className = "" }: { className?: string }) {
	const [data, setData] = useState<OkResponse | null>(null);

	useEffect(() => {
		let cancelled = false;

		(async () => {
			const json = await fetchElectricityMonth();
			if (cancelled || !json || !json.ok) {
				return;
			}
			setData(json);
		})();

		return () => {
			cancelled = true;
		};
	}, []);

	if (!data) {
		return null;
	}

	const label = new Intl.NumberFormat("ja-JP", {
		minimumFractionDigits: 1,
		maximumFractionDigits: 1,
	}).format(data.kwh);
	const linkLabel = `今月の電気使用量\u00A0:\u00A0${label} kWh`;

	const classes = [
		"group text-caption text-accent inline-flex w-fit leading-[24px] text-sm transition-opacity hover:opacity-80 wide:text-base",
		className,
	]
		.filter(Boolean)
		.join(" ");

	return (
		<a
			className={classes}
			href="https://developer.octopus.energy/"
			rel="noreferrer"
			suppressHydrationWarning
			target="_blank"
		>
			<RollingText text={linkLabel} />
		</a>
	);
}
