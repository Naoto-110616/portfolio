import type { Config } from "tailwindcss";

const config: Config = {
	content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
	theme: {
		screens: {
			md: "768px",
			wide: "1440px",
		},
		extend: {
			keyframes: {
				"rolling-text-loop": {
					from: { transform: "translate3d(0, 0, 0)" },
					to: {
						transform:
							"translate3d(0, calc(var(--rolling-text-row-height) * -1), 0)",
					},
				},
				"scroll-cue-bounce": {
					"0%, 100%": {
						transform: "rotate(90deg) translateX(0)",
					},
					"50%": {
						transform: "rotate(90deg) translateX(6px)",
					},
				},
			},
			animation: {
				"scroll-cue-bounce": "scroll-cue-bounce 1.4s ease-in-out infinite",
			},
			colors: {
				bg: "#F4F7F8",
				surface: "#E1E6E8",
				foreground: "#171A1C",
				primary: "#3F5C66",
				"primary-soft": "rgba(63, 92, 102, 0.1)",
				accent: "#C7FF4A",
				"accent-soft": "rgba(199, 255, 74, 0.1)",
			},
			fontFamily: {
        jp: ["var(--font-jp)", "sans-serif"],
        accent: ["var(--font-accent)", "cursive"],
			},
			fontSize: {
				hero: ["32px", { lineHeight: "1.4", fontWeight: "700" }],
				"hero-lg": ["124px", { lineHeight: "1", fontWeight: "900" }],
				"hero-sub": ["32px", { lineHeight: "1.4", fontWeight: "400" }],
				"hero-sub-lg": ["60px", { lineHeight: "1", fontWeight: "400" }],
				section: ["32px", { lineHeight: "1.4", fontWeight: "700" }],
				"section-lg": ["96px", { lineHeight: "1.4", fontWeight: "900" }],
				heading: ["24px", { lineHeight: "1", fontWeight: "500" }],
				body: ["16px", { lineHeight: "1.5", fontWeight: "500" }],
				caption: ["14px", { lineHeight: "1", fontWeight: "500" }],
				"caption-sm": ["12px", { lineHeight: "1", fontWeight: "500" }],
				"accent-hand": ["14px", { lineHeight: "1", fontWeight: "400" }],
				"footer-deco": ["78px", { lineHeight: "1.4", fontWeight: "700" }],
				"footer-deco-lg": ["221px", { lineHeight: "1.4", fontWeight: "700" }],
			},
			spacing: {
				"page-x": "16px",
				section: "96px",
				"section-lg": "240px",
				block: "24px",
				"block-md": "32px",
				"block-lg": "80px",
				"block-xl": "120px",
				stack: "8px",
				"stack-sm": "16px",
				"stack-md": "24px",
				"stack-lg": "32px",
			},
			maxWidth: {
				content: "1024px",
				"content-sp": "361px",
			},
		},
	},
};

export default config;
