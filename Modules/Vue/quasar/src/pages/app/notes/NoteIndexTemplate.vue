<script setup>
import ResourceIndex from "components/Resources/ResourceIndex.vue";
import ResourceForm from "components/Resources/ResourceForm.vue";
import FormManagement, {
  FormHandleManagement,
} from "src/components/Forms/Scripts/FormManagement";
import { computed, defineAsyncComponent, onMounted } from "vue";
import IndexManagement from "components/Index/Scripts/IndexManagement";

const props = defineProps({
  id: Number,
  type: String,
});

const resource = {
  title: "Note",
  url: "custom-apps/notes",
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
      name: "note",
      align: "left",
      label: "Note",
      field: "note",
      sortable: false,
      format: (val) => {
        return val && val.length > 10 ? val.substring(0, 10) + "..." : val;
      },
    },
    {
      name: "created_at",
      align: "left",
      label: "Created at",
      field: "created_at",
      sortable: false,
    },
  ],
  formInitialValues: {
    name: "",
    label: "",
    note: "",
  },
  template: () =>
    defineAsyncComponent(() => import("pages/app/notes/NoteFormTemplate.vue")),
};

const formHandleHooks = FormHandleManagement();

const indexHooks = IndexManagement({
  title: resource.title,
  url: resource.url,
});

indexHooks.hooksCycle.params.resolvedParams = (params) => {
  params.params["filter[resource_id]"] = props.id;
  params.params["filter[resource_type]"] = props.type;
  return params;
};

const formHooks = FormManagement({
  title: resource.title,
  url: resource.url,
  initialValues: resource.formInitialValues,
});

formHooks.hooksCycle.afterResolve = (fields) => {
  fields.resource_id = props.id;
  fields.resource_type = props.type;
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
      <component :is="resolvedForm" :formHooks="resource.formHooks"></component>
    </ResourceForm>
  </div>
</template>