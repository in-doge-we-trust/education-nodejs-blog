import { createApp } from 'vue';
import { VueQueryPlugin } from '@tanstack/vue-query';

import { router } from './router.ts';
import { queryClient } from './query/queryClient.ts';
import App from './app.vue';

import './date/dayjs.ts';

import './style/tailwind.css';
import './style/app.css';

const app = createApp(App);
app.use(router);
app.use(VueQueryPlugin, { queryClient });

app.mount('#app');
