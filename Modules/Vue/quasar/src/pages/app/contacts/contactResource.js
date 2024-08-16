export const contactResource = {
  title: 'Contact',
  url: 'custom-apps/contacts',
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
      name: "label",
      align: "left",
      label: "Label",
      field: "label",
      sortable: true,
    },
    {
      name: "organization",
      align: "left",
      label: "Organization",
      field: "organization",
      sortable: true,
      format: (val) => val?.label
    },
    {
      name: "emails",
      align: "left",
      label: "Emails",
      field: "emails",
      sortable: false,
      format: (val) => val?.slice(0, 3).join(', ')
    },
  ],
  formStyle: "width: 600px; max-width:90vw;",
  formInitialValues: {
    name: "",
    label: "",
    emails: [''],
    phones: ['']
  },
  formTemplate: () => import("pages/app/contacts/ContactFormTemplate.vue"),
}
