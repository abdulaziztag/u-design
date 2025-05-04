import React from 'react';

import { FilledIconName } from './icons-filled';
import { OutlinedIconName } from './icons-outlined';

export interface UIconProps extends React.SVGProps<SVGSVGElement> {
  name: FilledIconName | OutlinedIconName;
  size?: number | string;
  color?: string;
}
