import { ButtonHTMLAttributes } from 'react';

export type UButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  disabled?: boolean;
};
