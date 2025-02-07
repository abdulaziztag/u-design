import type { Preview } from '@storybook/react';
// import '@styles/reset.scss';
// import '@styles/font-family.scss';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
