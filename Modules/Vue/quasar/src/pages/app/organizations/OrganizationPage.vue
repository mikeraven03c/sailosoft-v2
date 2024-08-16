<script setup>
import ResourceIndex from "components/Resources/ResourceIndex.vue";
import ResourceForm from "components/Resources/ResourceForm.vue";
import FormManagement, {
  FormHandleManagement,
} from "src/components/Forms/Scripts/FormManagement";
import { computed, defineAsyncComponent, onMounted } from "vue";
import IndexManagement from "components/Index/Scripts/IndexManagement";

const resource = {
  title: "Organization",
  url: "custom-apps/organizations",
  columns: [
    { name: "id", align: "left", label: "Id", field: "id", sortable: true },
    {
      name: "name",
      align: "left",
      label: "Name",
      field: "name",
      sortable: true,
    },
  ],
  formInitialValues: {
    name: "",
    label: "",
  },
  template: () =>
    defineAsyncComponent(() =>
      import("pages/app/organizations/OrganizationFormTemplate.vue")
    ),
};

const formHandleHooks = FormHandleManagement();

const indexHooks = IndexManagement({
  title: resource.title,
  url: resource.url,
});
const formHooks = FormManagement({
  title: resource.title,
  url: resource.url,
  initialValues: resource.formInitialValues,
});

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
    <ResourceIndex v-bind="resource"></ResourceIndex>
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
</template>src/components/Forms/Scripts/FormManagement