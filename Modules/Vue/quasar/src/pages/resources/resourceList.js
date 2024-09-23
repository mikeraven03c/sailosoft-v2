export const resourceList = [
  {
    title: "Lead/Deal",
    slug: "opportunities",
  },
  {
    title: "Organization",
    slug: "organizations",
  },
  {
    title: "Contact",
    slug: "contacts",
  },
  {
    title: "Task",
    slug: "tasks"
  }
];

export const resourceListOptions = () => resourceList.map((r) => ({
  label: r.title,
  value: r.slug,
}))