export const sidebarLink = [
  {
    title: "Leads",
    caption: "",
    icon: "adjust",
    link: "/app/leads",
  },
  {
    title: "Deals",
    caption: "",
    icon: "paid",
    link: "/app/deals",
  },
  {
    title: "Contacts",
    caption: "",
    expansion: true,
    icon: "contacts",
    children: [
      {
        title: "Contacts",
        caption: "",
        icon: "person",
        link: "/app/contacts",
      },
      {
        title: "Organizations",
        caption: "",
        icon: "corporate_fare",
        link: "/app/organizations",
      },
    ]
  },
  {
    title: "Sales Pipeline",
    caption: "",
    expansion: true,
    icon: "filter_alt",
    children: [
      {
        title: "Pipeline",
        caption: "",
        icon: "filter_alt",
        link: "/app/pipelines",
      },
      {
        title: "Pipeline Stages",
        caption: "",
        icon: "arrow_circle_right",
        link: "/app/pipeline-stages",
      },
    ]
  },
];