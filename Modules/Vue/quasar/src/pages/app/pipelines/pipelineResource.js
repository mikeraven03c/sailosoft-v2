export const pipelineResource = {
  title: 'Pipeline',
  url: 'custom-apps/pipelines',
  // filters: 'filter[name]=test',
  columns: [
    { name: "id", align: "left", label: "Id", field: "id", sortable: true },
    {
      name: "name",
      align: "left",
      label: "Name",
      field: "name",
      sortable: true,
    },
    {
      name: "description",
      align: "left",
      label: "description",
      field: "description",
      sortable: true,
    },
    {
      name: "is_active",
      align: "left",
      label: "is active",
      field: "is_active",
      sortable: true
    },
  ],
  formStyle: "width: 500px; max-width:90vw;",
  formInitialValues: {
    name: "",
    description: "",
    is_active: true
  },
  formTemplate: () => import("pages/app/pipelines/PipelineFormTemplate.vue"),
}

