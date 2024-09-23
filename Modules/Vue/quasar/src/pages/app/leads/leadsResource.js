import { Dialog } from "quasar"
import { api } from "src/boot/axios"
import APIService from "src/components/Forms/Scripts/APIService"
import NotificationHandle from "src/components/Notifications/Scripts/NotificationHandle"

export const leadsResource = {
  title: 'Lead',
  url: 'custom-apps/opportunities',
  filters: 'filter[is_lead]=true',
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

  contextMenuOption: {
    prepend: [
      {
        name: 'convert-to-deal',
        label: 'Convert to deal',
        onClick: (row, hooks) => {
          if (!row?.id) {
            return
          }

          const action = () => {
            const apiService = APIService({
              url: 'custom-apps/opportunities'
            })
            apiService.update(
              row.id,
              {
                ...row,
                is_lead: false
              }, {
              resolved: (data) => {
                hooks.indexHooks.refresh()
              }
            })

            NotificationHandle().notifyPositive('Lead converted to deal successfuly')
          }

          Dialog.create({
            title: 'Convert to deals',
            message: 'Are you sure you want to convert to deals?',
            ok: 'Yes',
            cancel: 'No',
            persistent: true
          }).onOk(() => action()).onCancel(() => { })
        }
      }
    ]
  },
  formStyle: "width: 700px; max-width:90vw;",
  formInitialValues: {
    name: "",
    description: "",
    is_active: true
  },
  formTemplate: () => import("pages/app/leads/LeadFormTemplate.vue"),
}

