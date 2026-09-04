import type { Meta, StoryObj } from '@storybook/react-vite';
import { Checkbox } from './Checkbox';

const meta = { title: 'Components/Checkbox', component: Checkbox, tags: ['autodocs'], argTypes: {
  showFocusIndicator: { control: 'boolean' }, label: { control: 'text' }, checked: { control: 'boolean' }, disabled: { control: 'boolean' },
}, args: { label: 'Checkbox', showFocusIndicator: true } } satisfies Meta<typeof Checkbox>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const Checked: Story = { render: (args) => <Checkbox {...args} defaultChecked /> };
export const Disabled: Story = { args: { disabled: true } };
