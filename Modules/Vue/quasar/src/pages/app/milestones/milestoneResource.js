import { format } from 'quasar'
// destructuring to keep only what is needed
const { capitalize } = format

export const milestoneResource = {
  title: 'Milestone',
  url: 'custom-apps/milestones',
  columns: [
    { name: "id", align: "left", label: "Id", field: "id", sortable: true },
    {
      name: "title",
      align: "left",
      label: capitalize("title"),
      field: "title",
      sortable: true,
    },
    {
      name: "due_date",
      align: "left",
      label: capitalize("Due Date"),
      field: "due_date",
      sortable: true,
    },
    {
      name: "description",
      align: "left",
      label: capitalize("description"),
      field: "description",
      sortable: true,
    },
    {
      name: "created_at",
      align: "left",
      label: capitalize("created at"),
      field: "created_at",
      sortable: true,
    },
  ],
  formStyle: "width: 800px; max-width:90vw;",
  formInitialValues: {
    name: "",
    description: "",
  },
  formConfig: {
    formShowAfterCreate: true,
    formShowAfterUpdate: true
  },
  formTemplate: () => import("pages/app/milestones/MilestoneFormTemplate.vue"),
}

