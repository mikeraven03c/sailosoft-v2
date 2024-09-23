<script setup>
import ResourceIndex from "components/Resources/ResourceIndex.vue";
import ResourceForm from "components/Resources/ResourceForm.vue";
import FormManagement, {
  FormHandleManagement,
} from "src/components/Forms/Scripts/FormManagement";
import { computed, defineAsyncComponent, nextTick, onMounted } from "vue";
import IndexManagement from "components/Index/Scripts/IndexManagement";
import { productResource } from "../app/products/productResource";

const { template } = defineProps({
  template: {
    type: Object,
    default: () => {},
  },
});

const resource = {
  ...template,
};

const formHandleHooks = FormHandleManagement();

const indexHooks = IndexManagement({
  title: resource.title,
  url: resource.url,
  conditions: resource.filters ? resource.filters : "",
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
const dynamicForm = defineAsyncComponent(resource.formTemplate);
const resolvedForm = computed(() => dynamicForm);
const { resetFetch, refresh } = indexHooks;

if (resource.formConfig) {
  if (resource.formConfig.formShowAfterCreate) {
    formHooks.hooksCycle.resolveCreate = (data) => {
      nextTick(() => {
        formHooks.actions.form.show(data);
      });
    };
  }
  if (resource.formConfig.formShowAfterUpdate) {
    formHooks.hooksCycle.resolveUpdate = (data) => {
      formHooks.actions.form.show(data);
    };
  }
}

onMounted(() => {
  refresh();
});
</script>

<template>
  <div>
    <ResourceIndex v-bind="resource"></ResourceIndex>
    <ResourceForm
      ref="form"
      v-bind="resource"
      @onCreate="resetFetch"
      @onUpdate="refresh"
    >
      <component :is="resolvedForm" :formHooks="resource.formHooks"></component>
    </ResourceForm>
  </div>
</template>