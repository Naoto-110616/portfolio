import type { ReactNode } from "react";

/** ホーム main 内セクション用（max-width・横インセット）。外側で full-bleed 背景を敷ける */
export const HOME_MAIN_INNER_CLASSNAME = "mx-auto w-full max-w-content px-[4.071%] md:px-0";

type HomeMainInnerProps = {
	children: ReactNode;
	className?: string;
};

export function HomeMainInner({ children, className = "" }: HomeMainInnerProps) {
	return (
		<div className={[HOME_MAIN_INNER_CLASSNAME, className].filter(Boolean).join(" ")}>
			{children}
		</div>
	);
}
