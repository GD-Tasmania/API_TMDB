const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: '/peliculas', component: () => import('pages/MoviePage.vue') },
      { path: '/series', component: () => import('pages/TVSeries.vue') },
      { path: '/cartelera', component: () => import('pages/PageBillboard.vue') },
      { path: '/estrenos', component: () => import('pages/UpcomingReleases.vue') },
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes