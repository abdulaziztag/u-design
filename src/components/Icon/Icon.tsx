import React from 'react';

import { UIconProps } from './Icon.type';
import { FilledIconName, FilledIcons } from './icons-filled';
import { OutlinedIconName, OutlinedIcons } from './icons-outlined';

export const UIcon: React.FC<UIconProps> = ({
  name,
  size = 48,
  color = 'currentColor',
  ...props
}) => {
  try {
    const SvgIcon =
      FilledIcons[name as FilledIconName] ||
      OutlinedIcons[name as OutlinedIconName];
    return <SvgIcon width={size} height={size} color={color} {...props} />;
  } catch (error) {
    console.error(`Icon "${name}" not found.`, error);
    return null;
  }
};
