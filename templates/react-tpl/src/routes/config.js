import { lazy } from 'react';

export const routes = [
  {
    id: 'redirect',
    name: 'redirect',
    path: '/',
    redirect: '/login',
  },
  {
    id: 'layout',
    name: 'layout',
    path: '/',
    component: lazy(() => import('@/pages/Layout')),
    children: [
      {
        id: 'login',
        name: 'login',
        path: '/login',
        component: lazy(() => import('@/pages/Login')),
      },
      {
        id: 'home',
        name: 'home',
        path: '/home',
        component: lazy(() => import('@/pages/Home')),
      },
    ],
  },
  //   {
  //     id: 'home',
  //     name: 'home',
  //     path: '/',
  //     redirect: '/login',
  //   },
  //   {
  //     id: 'login',
  //     name: 'login',
  //     path: '/login',
  //     component: lazy(() => import('@/pages/Login')),
  //   },
  //   {
  //     id: 'home',
  //     name: 'home',
  //     path: '/home',
  //     component: lazy(() => import('@/pages/Home')),
  //   },
];
