<script setup>
import ResourceIndex from "components/Resources/ResourceIndex.vue";
import ResourceForm from "components/Resources/ResourceForm.vue";
import FormManagement, {
  FormHandleManagement,
} from "src/components/Forms/Scripts/FormManagement";
import { computed, defineAsyncComponent, onMounted } from "vue";
import IndexManagement from "components/Index/Scripts/IndexManagement";
import TaskFormTemplate from "pages/app/tasks/TaskFormTemplate.vue";

const props = defineProps({
  id: Number,
  type: String,
  isCustom: {
    type: Boolean,
    default: false,
  },
  hide: {
    type: Array,
    default: () => [],
  },
  custom: Object,
  tabsConfig: Object,
});

const resource = {
  title: "Task",
  url: "custom-apps/tasks",
  columns: [
    // { name: "id", align: "left", label: "Id", field: "id", sortable: true },
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
      sortable: false,
      format: (val) => {
        return val && val.length > 15 ? val.substring(0, 15) + "..." : val;
      },
    },
    {
      name: "status",
      align: "left",
      label: "Status",
      field: "status",
      sortable: true,
      format: (val) => val?.label,
    },
    {
      name: "due_date",
      align: "left",
      label: "Due Date",
      field: "due_date",
      sortable: true,
    },
    {
      name: "priority",
      align: "left",
      label: "Priority",
      field: "priority",
      sortable: true,
      format: (val) => val?.label,
    },
    {
      name: "tags",
      align: "left",
      label: "Tags",
      field: "tags",
      type: "tags",
      sortable: true,
    },
    {
      name: "created_at",
      align: "left",
      label: "Created at",
      field: "created_at",
      sortable: true,
    },
  ],
  formInitialValues: {
    name: "",
    label: "",
    description: "",
  },
  tabsConfig: props.tabsConfig,
  template: () =>
    defineAsyncComponent(() => import("pages/app/tasks/TaskFormTemplate.vue")),
};

const formHandleHooks = FormHandleManagement();

const indexHooks = IndexManagement({
  title: resource.title,
  url: resource.url,
});

indexHooks.hooksCycle.params.resolvedParams = (params) => {
  if (!props.isCustom) {
    params.params["filter[resource_id]"] = props.id;
    params.params["filter[resource_type]"] = props.type;
  } else {
    params.params = {
      ...params.params,
      ...(props.custom.params ?? {}),
    };
  }
  return params;
};

const formHooks = FormManagement({
  title: resource.title,
  url: resource.url,
  initialValues: resource.formInitialValues,
});

formHooks.hooksCycle.afterResolve = (fields) => {
  if (!props.isCustom) {
    fields.resource_id = props.id;
    fields.resource_type = props.type;
  } else {
    fields = props.custom.resolvedFields?.(fields) ?? fields;
  }
  return fields;
};

formHooks.hooksCycle.beforeOpenForm = (fields) => {
  fields.description = fields.description ? fields.description : "";

  return fields;
};

resource.formHandleHooks = formHandleHooks;
resource.formHooks = formHooks;
resource.indexHooks = indexHooks;

const { form } = formHandleHooks;

const resolvedForm = computed(() => resource.template());
const { resetFetch, refresh } = indexHooks;

onMounted(() => {
  refresh();
});
</script>

<template>
  <div>
    <ResourceIndex v-bind="resource" bodyClass="q-pa-sm"></ResourceIndex>
    <ResourceForm
      formStyle="width: 600px; max-width:90vw;"
      ref="form"
      v-bind="resource"
      @onCreate="resetFetch"
      @onUpdate="refresh"
    >
      <TaskFormTemplate :formHooks="resource.formHooks" :hide="hide" />
    </ResourceForm>
  </div>
</template>