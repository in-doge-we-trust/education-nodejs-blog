import { Meta, StoryObj } from '@storybook/vue3';

import BaseButton from './BaseButton.vue';

const meta: Meta<typeof BaseButton> = {
  component: BaseButton,
  argTypes: {
    type: {
      control: 'radio',
      options: ['button', 'submit'],
    },
    variant: {
      control: 'radio',
      options: ['primary', 'secondary'],
    },
  },
};
export default meta;

type Story = StoryObj<typeof BaseButton>;

export const Primary: Story = {
  args: {
    type: 'button',
    variant: 'primary',
    disabled: false,
  },
  render: (args) => ({
    components: { BaseButton },
    data() {
      return { args };
    },
    template: `
      <base-button v-bind="args">Primary button</base-button>
    `,
  }),
};

export const Secondary: Story = {
  args: {
    type: 'button',
    variant: 'secondary',
    disabled: false,
  },
  render: (args) => ({
    components: { BaseButton },
    data() {
      return { args };
    },
    template: `
      <base-button v-bind="args">Secondary button</base-button>
    `,
  }),
};
