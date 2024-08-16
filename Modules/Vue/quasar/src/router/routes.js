import { contactResource } from 'src/pages/app/contacts/contactResource'
import { pipelineResource } from 'src/pages/app/pipelines/pipelineResource'
import { testRoutes } from './test/checkRoutes'
import { pipelineStageResource } from 'src/pages/app/pipelineStages/pipelineStageResource'
import { leadsResource } from 'src/pages/app/leads/leadsResource'
import { dealsResource } from 'src/pages/app/deals/dealsResource'

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
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: 'organizations', component: () => import('pages/app/organizations/OrganizationPage.vue') },
      { path: 'contacts', component: () => import('pages/resources/BaseResourcePage.vue'), props: { template: contactResource } },
      { path: 'pipelines', component: () => import('pages/resources/BaseResourcePage.vue'), props: { template: pipelineResource } },
      { path: 'pipeline-stages', component: () => import('pages/resources/BaseResourcePage.vue'), props: { template: pipelineStageResource } },
      { path: 'leads', component: () => import('pages/resources/BaseResourcePage.vue'), props: { template: leadsResource } },
      { path: 'deals', component: () => import('pages/resources/BaseResourcePage.vue'), props: { template: dealsResource } },
    ],
  },

  // Test Page
  {
    path: '/test',
    component: () => import('layouts/MainLayout.vue'),
    children: testRoutes
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
