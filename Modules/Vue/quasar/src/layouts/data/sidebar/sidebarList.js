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
  {
    title: "Project",
    caption: "",
    expansion: true,
    icon: "apartment",
    children: [
      {
        title: "Milestone",
        caption: "",
        icon: "flag",
        link: "/app/milestones",
      },
    ]
  },
  {
    title: "Product Management",
    caption: "",
    expansion: true,
    icon: "category",
    children: [
      {
        title: "Product",
        caption: "",
        icon: "category",
        link: "/app/products",
      },
    ]
  },
  {
    title: "Setting",
    expansion: true,
    icon: "settings",
    children: [
      {
        icon: 'label',
        title: "Tags",
        link: "/app/tags",
      }
    ]
  }
];