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

	const timeParts = new Intl.DateTimeFormat("en-US", {
		hour: "numeric",
		minute: "2-digit",
		hour12: true,
		timeZone: "Asia/Tokyo",
	}).formatToParts(date);

	const hourLabel = timeParts.find((part) => part.type === "hour")?.value ?? "12";
	const minuteLabel = timeParts.find((part) => part.type === "minute")?.value ?? "00";
	const periodLabel = timeParts.find((part) => part.type === "dayPeriod")?.value ?? "AM";

	return { dateLabel, hourLabel, minuteLabel, periodLabel };
}

export function CurrentTime({ className = "" }: CurrentTimeProps) {
	const [currentTime, setCurrentTime] = useState(() => formatTokyoDateTime(new Date()));
	const [isColonVisible, setIsColonVisible] = useState(true);

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

	useEffect(() => {
		const intervalId = setInterval(() => {
			setIsColonVisible((current) => !current);
		}, 700);

		return () => {
			clearInterval(intervalId);
		};
	}, []);

	const classes = ["flex flex-col gap-stack h-full justify-between", className]
		.filter(Boolean)
		.join(" ");

	return (
		<div className={classes}>
			<p suppressHydrationWarning>{currentTime.dateLabel}</p>
			<p
				className="inline-flex items-baseline whitespace-nowrap tabular-nums"
				suppressHydrationWarning
			>
				<span>{currentTime.hourLabel}</span>
				<span
					className={`transition-opacity duration-150 ${
						isColonVisible ? "opacity-100" : "opacity-0"
					}`}
				>
					:
				</span>
				<span>{currentTime.minuteLabel}</span>
				<span className="ml-[0.25em]">{currentTime.periodLabel} [JP]</span>
			</p>
		</div>
	);
}
