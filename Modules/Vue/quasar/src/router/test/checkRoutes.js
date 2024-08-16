
import { useRouter } from "vue-router";

export function checkUseRoute() {
  const router = useRouter();
  console.log(router.getRoutes());
  return router.getRoutes()
}

export const testRoutes = [
  { path: 'resource', component: () => import('pages/test/ResourceTestPage.vue') },
  { path: 'resource-menu', component: () => import('pages/test/ResourceMenuFunctionalityTestPage.vue') },
  { path: 'resource-delete', component: () => import('pages/test/ResourceTestDeletePage.vue') },
  { path: 'resource-full', component: () => import('pages/test/ResourceTestFullPage.vue') },
];