import type { Meta, StoryObj } from '@storybook/react-vite';
import { TextField } from './TextField';

const meta = { title: 'Components/Text Field', component: TextField, tags: ['autodocs'], argTypes: {
  showSupportingText: { control: 'boolean' }, labelText: { control: 'text' }, placeholderText: { control: 'text' }, supportingText: { control: 'text' },
}, args: { labelText: 'Label', placeholderText: 'Placeholder', supportingText: 'Supporting text' } } satisfies Meta<typeof TextField>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const WithoutSupportingText: Story = { args: { showSupportingText: false } };
