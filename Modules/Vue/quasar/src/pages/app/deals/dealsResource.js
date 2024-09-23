import { Dialog } from "quasar"
import APIService from "src/components/Forms/Scripts/APIService"

export const dealsResource = {
  title: 'Deal',
  url: 'custom-apps/opportunities',
  filters: 'filter[is_lead]=false',
  columns: [
    { name: "id", align: "left", label: "Id", field: "id", sortable: true },
    {
      name: "title",
      align: "left",
      label: "Title",
      field: "title",
      sortable: true,
    },
    {
      name: "value",
      align: "left",
      label: "value",
      field: "value",
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
    {
      name: "pipeline_stage",
      align: "left",
      label: "Pipeline stage",
      field: "pipeline_stage",
      sortable: true,
      format: (val) => val?.label
    },
    {
      name: "contact",
      align: "left",
      label: "contact",
      field: "contact",
      sortable: true,
      format: (val) => val?.label
    },
    {
      name: "organization",
      align: "left",
      label: "organization",
      field: "organization",
      sortable: true,
      format: (val) => val?.label
    },
    {
      name: "tag",
      align: "left",
      label: "tag",
      field: "tags",
      sortable: true,
      type: "tags"
    },
  ],
  defaultColumns: ['id', 'title', 'value'],
  formStyle: "width: 700px; max-width:90vw;",
  formInitialValues: {
    name: "",
    description: "",
    is_active: true
  },
  formTemplate: () => import("pages/app/deals/DealsFormTemplate.vue"),
}

