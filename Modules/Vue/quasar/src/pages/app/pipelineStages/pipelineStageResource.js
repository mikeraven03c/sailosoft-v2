export const pipelineStageResource = {
  title: 'Pipeline Stage',
  url: 'custom-apps/pipeline-stages',
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
      label: "Description",
      field: "description",
      sortable: true,
    },
    {
      name: "pipeline",
      align: "left",
      label: "Pipeline",
      field: "pipeline",
      sortable: true,
      format: (val) => val?.label
    },
  ],
  formStyle: "width: 600px; max-width:90vw;",
  formInitialValues: {
    name: "",
    description: "",
    pipeline: [''],
  },
  formTemplate: () => import("pages/app/pipelineStages/PipelineStageFormTemplate.vue"),
}

