import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Frame } from "@/components/ui/frame";

const meta = {
	title: "UI/Frame",
	component: Frame,
	parameters: {
		layout: "centered",
	},
	args: {
		text: "Frame label",
		showBottomIndicator: true,
		isInteractive: true,
		isAlwaysVisible: true,
		children: (
			<div className="bg-primary-soft text-foreground flex h-32 w-56 items-center justify-center rounded-md border border-primary-soft">
				Frame content
			</div>
		),
	},
	argTypes: {
		className: { control: "text" },
		text: { control: "text" },
		bottomIndicatorLabel: { control: "text" },
	},
} satisfies Meta<typeof Frame>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithoutSwitch: Story = {
	args: {
		showBottomIndicator: false,
	},
};

export const RenderPropsChild: Story = {
	render: (args) => (
		<Frame {...args}>
			{({ isSwitchedOn }) => (
				<div className="bg-primary-soft text-foreground flex h-32 w-56 items-center justify-center rounded-md border border-primary-soft">
					{isSwitchedOn ? "Indicator on" : "Indicator off"}
				</div>
			)}
		</Frame>
	),
};
