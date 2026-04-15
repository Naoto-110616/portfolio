"use client";

import { useEffect, useState } from "react";

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

	const classes = ["text-caption text-accent leading-[24px] text-base", className]
		.filter(Boolean)
		.join(" ");

	return (
		<div className={classes} suppressHydrationWarning>
			今月の電気使用量&nbsp;:&nbsp;{label} kWh
		</div>
	);
}
