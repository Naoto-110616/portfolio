import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { SectionTitle } from "@/components/ui/section-title";

const meta = {
	title: "UI/SectionTitle",
	component: SectionTitle,
	parameters: {
		layout: "padded",
	},
	args: {
		title: "Section heading",
	},
	argTypes: {
		className: { control: "text" },
		titleClassName: { control: "text" },
	},
} satisfies Meta<typeof SectionTitle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithoutDivider: Story = {
	args: {
		withDivider: false,
	},
};

export const WithCustomStyles: Story = {
	args: {
		className: "py-4",
		titleClassName: "text-accent",
		title: "Styled title",
	},
};
