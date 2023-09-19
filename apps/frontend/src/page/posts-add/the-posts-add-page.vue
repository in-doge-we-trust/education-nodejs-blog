<script setup lang="ts">
  import BaseCard from '../../components/BaseCard.vue';
  import BaseButton from '../../components/BaseButton.vue';
  import BaseText from '../../components/BaseText.vue';
  import BaseInput from '../../components/BaseInput.vue';
  import BaseTextArea from '../../components/BaseTextArea.vue';

  function handleSubmit() {
    alert('Submitted!');
  }
</script>

<template>
  <header class="p-6 pb-3">
    <h1 class="text-3xl text-cyan-700">Create new post</h1>
  </header>

  <main class="p-6 pt-3">
    <base-card tag="section">
      <form class="flex flex-col gap-4" @submit.prevent="handleSubmit">
        <div>
          <label class="block mb-1">
            <base-text variant="label" for="title"> Title </base-text>
          </label>
          <base-input id="title" type="text" required />
        </div>
        <div>
          <label class="block mb-1">
            <base-text variant="label" for="content"> Content </base-text>
          </label>
          <base-text-area id="content" rows="8" required></base-text-area>
        </div>
        <div class="flex flex-row justify-end items-center">
          <base-button variant="primary" type="submit"> Create </base-button>
        </div>
      </form>
    </base-card>
  </main>
</template>
