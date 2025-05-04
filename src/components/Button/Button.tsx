import { forwardRef, memo } from 'react';

import styles from './Button.module.scss';
import { UButtonProps } from './Button.type';

const Button = forwardRef<HTMLButtonElement, UButtonProps>(
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
