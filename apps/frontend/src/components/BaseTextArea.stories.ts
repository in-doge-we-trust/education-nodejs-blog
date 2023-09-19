import { Meta, StoryObj } from '@storybook/vue3';

import BaseTextArea from './BaseTextArea.vue';

const meta: Meta<typeof BaseTextArea> = {
  component: BaseTextArea,
};
export default meta;

type Story = StoryObj<typeof BaseTextArea>;

export const Default: Story = {
  render: (args) => ({
    components: { BaseTextArea },
    data() {
      return { args };
    },
    template: `
      <label for="textarea">
        <div>Text area</div>
        
        <base-text-area id="textarea" placeholder="Type something" class="max-w-md" v-bind="args"></base-text-area>
      </label>
    `,
  }),
};
