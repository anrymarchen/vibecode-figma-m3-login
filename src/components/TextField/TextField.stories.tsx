import type { Meta, StoryObj } from '@storybook/react-vite';

import { TextField } from './TextField';

import searchIcon from '../../assets/icons/search.svg';
import closeIcon from '../../assets/icons/close.svg';

const meta = {
  title: 'Components/Text Field',
  component: TextField,
  tags: ['autodocs'],
  argTypes: {
    showSupportingText: { control: 'boolean' },
    labelText: { control: 'text' },
    placeholderText: { control: 'text' },
    supportingText: { control: 'text' },
    style: {
      control: 'inline-radio',
      options: ['Filled', 'Outlined'],
    },
    state: {
      control: 'select',
      options: [
        'Enabled',
        'Hovered',
        'Active',
        'Focused',
        'Error',
        'Disabled',
      ],
    },
    showLeadingIcon: { control: 'boolean' },
    showTrailingIcon: { control: 'boolean' },
  },
  args: {
    labelText: 'Label',
    placeholderText: 'Placeholder',
    supportingText: 'Supporting text',
  },
} satisfies Meta<typeof TextField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithoutSupportingText: Story = {
  args: {
    showSupportingText: false,
  },
};

export const Filled: Story = {
  args: {
    style: 'Filled',
  },
};

export const WithIcons: Story = {
  args: {
    showLeadingIcon: true,
    showTrailingIcon: true,
    leadingIcon: <img src={searchIcon} alt="" />,
    trailingIcon: <img src={closeIcon} alt="" />,
  },
};

export const Error: Story = {
  args: {
    state: 'Error',
    showLeadingIcon: true,
    showTrailingIcon: true,
  },
};

export const Password: Story = {
  args: {
    labelText: 'Password',
    placeholderText: 'Password',
    trailingAction: 'password-toggle',
  },
};