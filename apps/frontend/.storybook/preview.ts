import type { Preview } from '@storybook/vue3';
import { themes } from '@storybook/theming';

import '../src/style/tailwind.css';
import '../src/style/app.css';

const preview: Preview = {
  parameters: {
    docs: {
      theme: themes.light,
    },
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export default preview;
