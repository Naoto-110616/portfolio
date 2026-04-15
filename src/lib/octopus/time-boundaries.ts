/**
 * First instant of calendar day `ymd` (YYYY-MM-DD) in `timeZone`, as UTC ISO string.
 */
export function startOfCalendarDayUtcIso(ymd: string, timeZone: string): string {
	const [Y, M, D] = ymd.split("-").map((x) => parseInt(x, 10));
	let lo = Date.UTC(Y, M - 1, D) - 48 * 3600000;
	let hi = Date.UTC(Y, M - 1, D) + 48 * 3600000;

	while (hi - lo > 1000) {
		const mid = Math.floor((lo + hi) / 2);
		const midYmd = new Date(mid).toLocaleDateString("en-CA", { timeZone });
		if (midYmd < ymd) {
			lo = mid;
		} else {
			hi = mid;
		}
	}

	return new Date(hi).toISOString();
}

/**
 * Returns the UTC instant for the first millisecond of `reference`'s calendar day in `timeZone`.
 */
export function startOfZonedDayUtcIso(reference: Date, timeZone: string): string {
	const ymd = reference.toLocaleDateString("en-CA", { timeZone });
	return startOfCalendarDayUtcIso(ymd, timeZone);
}

/**
 * Returns the UTC instant for the first millisecond of the 1st day of `reference`'s calendar month in `timeZone`.
 */
export function startOfZonedMonthUtcIso(reference: Date, timeZone: string): string {
	const ymd = reference.toLocaleDateString("en-CA", { timeZone });
	const [Y, M] = ymd.split("-");
	const monthStartYmd = `${Y}-${M}-01`;
	return startOfCalendarDayUtcIso(monthStartYmd, timeZone);
}
