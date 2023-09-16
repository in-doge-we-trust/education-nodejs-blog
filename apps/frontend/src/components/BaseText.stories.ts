import { Meta, StoryObj } from '@storybook/vue3';
import BaseText from './BaseText.vue';

const meta: Meta<typeof BaseText> = {
  component: BaseText,
  argTypes: {
    color: {
      options: ['primary', 'secondary', 'accent', 'highlight'],
      control: {
        type: 'select',
      },
    },
  },
};
export default meta;

type Story = StoryObj<typeof BaseText>;

export const Default: Story = {
  render: (args) => ({
    components: { BaseText },
    data() {
      return { args };
    },
    template: `
      <base-text v-bind="args" variant="header1">
        Header 1
      </base-text>
      <base-text v-bind="args" variant="header2">
        Header 2
      </base-text>
      <base-text v-bind="args" variant="header3">
        Header 3
      </base-text>
      <base-text v-bind="args" variant="body1">
        Body 1
      </base-text>
      <base-text v-bind="args" variant="body2">
        Body 2
      </base-text>
      <base-text v-bind="args" variant="body3">
        Body 3
      </base-text>
    `,
  }),
};
Default.args = {
  color: 'primary',
};
