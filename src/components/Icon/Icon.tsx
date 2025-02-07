import { FilledIconName, FilledIcons } from '@components/Icon/icons-filled';
import {
  OutlinedIconName,
  OutlinedIcons,
} from '@components/Icon/icons-outlined';
import React from 'react';

import './Icon.module.scss';

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  name: FilledIconName | OutlinedIconName;
  size?: number | string;
  color?: string;
}

export const Icon: React.FC<IconProps> = ({
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
