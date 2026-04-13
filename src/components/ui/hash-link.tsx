"use client";

import { type AnchorHTMLAttributes, type MouseEvent, type ReactNode } from "react";

import { useLenis } from "@/components/providers/lenis-context";
import { isPrimaryUnmodifiedClick, scrollToHashAnchor } from "@/lib/smooth-hash-scroll";

export type HashLinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
	href: string;
	children: ReactNode;
};

/**
 * `href` が `#...` のとき、Lenis と連携して同一ページ内アンカーへスムーズにスクロールする。
 */
export function HashLink({ href, children, onClick, ...rest }: HashLinkProps) {
	const lenis = useLenis();

	const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
		onClick?.(e);
		if (e.defaultPrevented) return;
		if (!href.startsWith("#")) return;
		if (!isPrimaryUnmodifiedClick(e)) return;

		const raw = href.slice(1);
		if (!raw) return;
		let id: string;
		try {
			id = decodeURIComponent(raw);
		} catch {
			id = raw;
		}
		if (!document.getElementById(id)) return;

		e.preventDefault();
		scrollToHashAnchor(href, lenis);
	};

	return (
		<a href={href} onClick={handleClick} {...rest}>
			{children}
		</a>
	);
}
