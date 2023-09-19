import { Meta, StoryObj } from '@storybook/vue3';

import BaseInput from './BaseInput.vue';

const meta: Meta<typeof BaseInput> = {
  component: BaseInput,
};
export default meta;

type Story = StoryObj<typeof BaseInput>;

export const Default: Story = {
  render: (args) => ({
    components: { BaseInput },
    data() {
      return { args };
    },
    template: `
      <label for="text-input">
        <div>Input</div>
        
        <base-input id="text-input" type="text" class="max-w-md" v-bind="args" />
      </label>
    `,
  }),
};
