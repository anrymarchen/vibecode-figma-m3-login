import type { Meta, StoryObj } from '@storybook/react-vite';
import { Checkbox } from './Checkbox';

const meta = { title: 'Components/Checkbox', component: Checkbox, tags: ['autodocs'], argTypes: {
  showFocusIndicator: { control: 'boolean' }, label: { control: 'text' }, checked: { control: 'boolean' }, indeterminate: { control: 'boolean' }, disabled: { control: 'boolean' },
  variant: { control: 'select', options: ['Selected', 'Unselected', 'Indeterminate', 'Error selected', 'Error unselected', 'Error indeterminate'] },
  state: { control: 'select', options: ['Enabled', 'Hovered', 'Focused', 'Pressed', 'Disabled'] },
}, args: { label: 'Checkbox', showFocusIndicator: true } } satisfies Meta<typeof Checkbox>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const Checked: Story = { args: { variant: 'Selected', defaultChecked: true } };
export const Indeterminate: Story = { args: { variant: 'Indeterminate', indeterminate: true } };
export const Error: Story = { args: { variant: 'Error selected', defaultChecked: true } };
export const Disabled: Story = { args: { disabled: true } };
