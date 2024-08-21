import { contactResource } from 'src/pages/app/contacts/contactResource'
import { pipelineResource } from 'src/pages/app/pipelines/pipelineResource'
import { testRoutes } from './test/checkRoutes'
import { pipelineStageResource } from 'src/pages/app/pipelineStages/pipelineStageResource'
import { leadsResource } from 'src/pages/app/leads/leadsResource'
import { dealsResource } from 'src/pages/app/deals/dealsResource'
import { mainPathRoutes } from './routes/mainRoutes'

const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') }
    ],
  },
  {
    path: '/app',
    component: () => import('layouts/MainLayout.vue'),
    children: mainPathRoutes,
  },

  // Test Page
  // {
  //   path: '/test',
  //   component: () => import('layouts/MainLayout.vue'),
  //   children: testRoutes
  // },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
