"use client";

import { useEffect, useState } from "react";

type CurrentTimeProps = {
	className?: string;
};

function formatTokyoDateTime(date: Date) {
	const dateLabel = new Intl.DateTimeFormat("en-US", {
		month: "short",
		day: "numeric",
		year: "numeric",
		timeZone: "Asia/Tokyo",
	}).format(date);

	const timeLabel = `${new Intl.DateTimeFormat("en-US", {
		hour: "numeric",
		minute: "2-digit",
		hour12: true,
		timeZone: "Asia/Tokyo",
	}).format(date)} [JP]`;

	return { dateLabel, timeLabel };
}

export function CurrentTime({ className = "" }: CurrentTimeProps) {
	const [currentTime, setCurrentTime] = useState(() =>
		formatTokyoDateTime(new Date()),
	);

	useEffect(() => {
		let intervalId: ReturnType<typeof setInterval> | undefined;

		const updateTime = () => {
			setCurrentTime(formatTokyoDateTime(new Date()));
		};

		updateTime();

		const delayUntilNextMinute = 60_000 - (Date.now() % 60_000);
		const timeoutId = setTimeout(() => {
			updateTime();
			intervalId = setInterval(updateTime, 60_000);
		}, delayUntilNextMinute);

		return () => {
			if (timeoutId) {
				clearTimeout(timeoutId);
			}
			if (intervalId) {
				clearInterval(intervalId);
			}
		};
	}, []);

	const classes = ["flex flex-col gap-stack h-full justify-between", className]
		.filter(Boolean)
		.join(" ");

	return (
		<div className={classes}>
			<p suppressHydrationWarning>{currentTime.dateLabel}</p>
			<p suppressHydrationWarning>{currentTime.timeLabel}</p>
		</div>
	);
}
