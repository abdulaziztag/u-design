import { ButtonHTMLAttributes, forwardRef, memo } from 'react';

import styles from './Button.module.scss';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, ...props }, ref) => {
    return (
      <button ref={ref} className={styles.uButton} {...props}>
        {children}
      </button>
    );
  },
);

Button.displayName = 'UButton';

export const UButton = memo(Button);
