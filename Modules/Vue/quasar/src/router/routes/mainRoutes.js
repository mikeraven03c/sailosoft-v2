import { contactResource } from 'src/pages/app/contacts/contactResource'
import { pipelineResource } from 'src/pages/app/pipelines/pipelineResource'

import { pipelineStageResource } from 'src/pages/app/pipelineStages/pipelineStageResource'
import { leadsResource } from 'src/pages/app/leads/leadsResource'
import { dealsResource } from 'src/pages/app/deals/dealsResource'
import { milestoneResource } from 'src/pages/app/milestones/milestoneResource'

export const mainPathRoutes = [
  { path: '', component: () => import('pages/IndexPage.vue') },
  { path: 'organizations', component: () => import('pages/app/organizations/OrganizationPage.vue') },
  { path: 'contacts', component: () => import('pages/resources/BaseResourcePage.vue'), props: { template: contactResource } },
  { path: 'pipelines', component: () => import('pages/resources/BaseResourcePage.vue'), props: { template: pipelineResource } },
  { path: 'pipeline-stages', component: () => import('pages/resources/BaseResourcePage.vue'), props: { template: pipelineStageResource } },
  { path: 'leads', component: () => import('pages/resources/BaseResourcePage.vue'), props: { template: leadsResource } },
  { path: 'deals', component: () => import('pages/resources/BaseResourcePage.vue'), props: { template: dealsResource } },
  { path: 'milestones', component: () => import('pages/resources/BaseResourcePage.vue'), props: { template: milestoneResource } }
]

// const MainRoutes = [
//   {
//     path: 'contacts',
//     page: 'pages/contacts/ContactIndex.vue'
//   }
// ];

// export const MainPathRoutes = [
//   {
//     path: '',
//     component: () => import('pages/IndexPage.vue')
//   }
// ].concat(MainRoutes.map((e) => {
//   e.component = () => import(e.page)
//   return e
// }));