import { createRouter, createWebHistory } from 'vue-router';

import ThePostsPage from './page/posts/the-posts-page.vue';
import ThePostPage from './page/post/the-post-page.vue';

export const router = createRouter({
  history: createWebHistory('/'),
  routes: [
    {
      path: '/',
      name: 'posts',
      redirect: '/posts',
    },
    {
      path: '/posts',
      name: 'posts',
      component: ThePostsPage,
    },
    {
      path: '/posts/:postId',
      name: 'post',
      component: ThePostPage,
    },
    {
      path: '/users/:userId',
      name: 'user',
      component: () => {},
    },
  ],
});
