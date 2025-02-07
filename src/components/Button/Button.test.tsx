import { render, screen } from '@testing-library/react';

import { UButton } from './Button';

test('renders the Button component', () => {
  render(<UButton>Click Me</UButton>);
  expect(screen.getByText('Click Me')).toBeInTheDocument();
});
