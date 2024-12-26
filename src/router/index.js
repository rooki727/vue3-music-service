import { createRouter, createWebHistory } from 'vue-router'
import LayoutIndex from '@/views/layout/LayoutIndex.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'layout',
      component: LayoutIndex,
      children: [
        {
          path: '/',
          name: 'findMusic',
          component: () => import('@/views/find/FindIndex.vue')
        },
        {
          path: '/playlists',
          name: 'playlists',
          component: () => import('@/views/playlists/playlistsIndex.vue')
        },
        {
          path: '/playlistsdetail',
          name: 'playlistsDetail',
          component: () => import('@/views/playlistsDetail/playlistsDetail.vue')
        },
        {
          path: '/isplayinglist',
          name: 'isplayingList',
          component: () => import('@/views/isplayingList/isplayingList.vue')
        },
        {
          path: '/recentlyplayed',
          name: 'recentlyPlayed',
          component: () => import('@/views/recentlyPlayed/RecentlyPlayed.vue')
        },
        {
          path: '/loginInfo',
          name: 'loginInfo',
          component: () => import('@/views/loginInfo/loginInfo.vue')
        }
      ]
    },
    {
      path: '/login',
      name: 'loginIndex',
      component: () => import('@/views/login/LoginIndex.vue')
    },
    {
      path: '/register',
      name: 'registerIndex',
      component: () => import('@/views/registered/registeredIndex.vue')
    }
  ]
})

export default router
