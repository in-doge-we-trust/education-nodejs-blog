import { createApp } from 'vue';
import { VueQueryPlugin } from '@tanstack/vue-query';

import { queryClient } from './query/queryClient.ts';
import App from './App.vue';

import './style/tailwind.css';

const app = createApp(App);
app.use(VueQueryPlugin, { queryClient });

app.mount('#app');
