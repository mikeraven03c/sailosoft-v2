const MainRoutes = [
  {
    path: 'contacts',
    page: 'pages/contacts/ContactIndex.vue'
  }
];

export const MainPathRoutes = [
  {
    path: '',
    component: () => import('pages/IndexPage.vue')
  }
].concat(MainRoutes.map((e) => {
  e.component = () => import(e.page)
  return e
}));