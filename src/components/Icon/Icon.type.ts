import { FilledIconName } from '@components/Icon/icons-filled';
import { OutlinedIconName } from '@components/Icon/icons-outlined';
import React from 'react';

export interface UIconProps extends React.SVGProps<SVGSVGElement> {
  name: FilledIconName | OutlinedIconName;
  size?: number | string;
  color?: string;
}
