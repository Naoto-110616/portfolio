import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { HomeMainInner } from "@/components/ui/home-main-inner";

const meta = {
	title: "UI/HomeMainInner",
	component: HomeMainInner,
	parameters: {
		layout: "fullscreen",
	},
	args: {
		children: (
			<div className="bg-primary-soft text-foreground rounded-md p-6">
				Content inside HomeMainInner
			</div>
		),
	},
	argTypes: {
		className: { control: "text" },
	},
} satisfies Meta<typeof HomeMainInner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const CustomPadding: Story = {
	args: {
		className: "py-8",
	},
};
