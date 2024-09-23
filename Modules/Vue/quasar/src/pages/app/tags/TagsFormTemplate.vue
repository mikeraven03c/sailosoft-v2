<script setup>
import FormBuilder from "components/Forms/FormBuilder.vue";
import { resourceList } from "src/pages/resources/resourceList";

import {
  textFormInput,
  updateBuilderFormData,
  selectFormInput,
  formInput,
} from "components/Forms/Scripts/formBuilder";

const { formHooks } = defineProps({
  formHooks: Object,
});

const { formData, formReadonly, formError, hooksCycle } = formHooks;

const fields = [
  selectFormInput("resource")
    .options(
      resourceList.map((r) => ({
        label: r.title,
        value: r.slug,
      }))
    )
    .get(),
  textFormInput("name").get(),
  textFormInput("description").get(),
  formInput("color", "color").get(),
];

const builder = updateBuilderFormData(formData);
</script>
<template>
  <div>
    <q-form class="q-gutter-md q-mt-xs">
      <form-builder
        :fields="fields"
        :form-data="formData"
        :form-error="formError"
        :form-readonly="formReadonly"
        @update="builder.update"
      />
    </q-form>
  </div>
</template>
