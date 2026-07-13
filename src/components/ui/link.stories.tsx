import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Link } from "@/components/ui/link";

const meta = {
	title: "UI/Link",
	component: Link,
	parameters: {
		layout: "centered",
	},
	args: {
		label: "View details",
	},
	argTypes: {
		className: { control: "text" },
		iconClassName: { control: "text" },
		label: { control: "text" },
	},
} satisfies Meta<typeof Link>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const LargeText: Story = {
	args: {
		className: "text-body md:text-heading-sm",
		label: "Open project",
	},
};
