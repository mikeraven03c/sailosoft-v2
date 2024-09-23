<script setup>
import FormBuilder from "components/Forms/FormBuilder.vue";

import {
  textFormInput,
  editorFormInput,
  updateBuilderFormData,
  moneyFormInput,
  numberFormInput,
} from "components/Forms/Scripts/formBuilder";

const { formHooks } = defineProps({
  formHooks: Object,
});

const { formData, formReadonly, formError, hooksCycle } = formHooks;

const fields = [
  textFormInput("name").setLabel("Name").setColSize(2).get(),
  textFormInput("label").setColSize(2).get(),
  editorFormInput("description").setColSize(1).get(),
  textFormInput("sku").setColSize(2).get(),
  moneyFormInput("price").setColSize(2).get(),
  numberFormInput("inventory").setColSize(2).get(),
  textFormInput("manufacturer").setColSize(2).get(),
  textFormInput("brand_name").setColSize(2).get(),
];

const builder = updateBuilderFormData(formData);
</script>
<template>
  <div>
    <q-form class="row q-col-gutter-md q-mt-xs row">
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
