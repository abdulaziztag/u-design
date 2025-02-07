import { StoryFn, Meta } from '@storybook/react';
import React from 'react';

import { UButton } from './Button';

export default {
  title: 'Components/Button',
  component: UButton,
  argTypes: {
    children: { control: 'text' },
    onClick: { action: 'clicked' }, // Adds an interactive event
  },
} as Meta<typeof UButton>;

const Template: StoryFn<typeof UButton> = (args) => <UButton {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  children: 'Click Me',
};
