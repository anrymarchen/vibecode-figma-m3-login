import type { Meta, StoryObj } from '@storybook/react-vite';
import { Avatar } from './Avatar';

const meta = { title: 'Components/Avatar', component: Avatar, tags: ['autodocs'], argTypes: {
  letter: { control: 'text' }, style: { control: 'inline-radio', options: ['Avatar', 'Monogram', 'Check'] },
}, args: { letter: 'A', style: 'Monogram' } } satisfies Meta<typeof Avatar>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const Styles: Story = { render: (args) => <div style={{ display: 'flex', gap: 16 }}><Avatar {...args} style="Avatar" /><Avatar {...args} style="Monogram" /><Avatar {...args} style="Check" /></div> };
