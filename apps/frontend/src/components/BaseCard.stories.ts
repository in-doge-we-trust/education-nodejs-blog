import type { Meta, StoryObj } from '@storybook/vue3';

import BaseCard from './BaseCard.vue';

const meta: Meta<typeof BaseCard> = {
  component: BaseCard,
};
export default meta;

function getTemplateWrapper(content: TemplateStringsArray): string {
  return `
    <div class="max-w-md">
      ${content}
    </div>
  `;
}

type Story = StoryObj<typeof BaseCard>;

export const Default: Story = {
  render: () => ({
    components: { BaseCard },
    template: getTemplateWrapper`
      <base-card>
        <p>Hello there!</p>
      </base-card>
    `,
  }),
};

export const WithHeaderAndFooter: Story = {
  render: () => ({
    components: { BaseCard },
    template: getTemplateWrapper`
      <base-card>
        <template #header>
          <h2 class="text-2xl font-semibold">This is the header of the card</h2>
        </template>
        
        <p>This is the body of the card</p>
        
        <template #footer>
          <p class="text-sm">This is the footer of the card</h2>
        </template>
      </base-card>
    `,
  }),
};
