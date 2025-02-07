import { FilledIconName, FilledIcons } from '@components/Icon/icons-filled';
import {
  OutlinedIconName,
  OutlinedIcons,
} from '@components/Icon/icons-outlined';
import { Meta, StoryFn } from '@storybook/react';
import React from 'react';

import { Icon } from './Icon';

export default {
  title: 'Components/Icon',
  component: Icon,
  argTypes: {
    name: {
      control: 'select',
      options: [...Object.keys(FilledIcons), ...Object.keys(OutlinedIcons)],
    },
    size: {
      control: { type: 'number', min: 16, max: 64, step: 4 },
    },
    color: {
      control: 'color',
    },
  },
} as Meta<typeof Icon>;

const Template: StoryFn<typeof Icon> = (args) => <Icon {...args} />;

export const Default = Template.bind({});
Default.args = {
  name: Object.keys(FilledIcons)[0] as FilledIconName | OutlinedIconName,
  size: 24,
  color: 'currentColor',
};
