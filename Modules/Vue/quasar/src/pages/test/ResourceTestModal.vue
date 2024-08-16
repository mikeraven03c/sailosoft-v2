<script setup>
import FormModal from "components/Forms/FormModal.vue";
import FormManagement, {
  FORM_ON_UPDATE,
} from "src/components/Forms/Scripts/FormManagement";
import {
  formEmit,
  FORM_ON_CREATE,
} from "src/components/Forms/Scripts/FormManagement";

const props = defineProps({
  isLoading: Boolean,
  isDarkMode: Boolean,
  title: {
    type: String,
    default: "",
  },
  url: {
    type: String,
    default: "",
  },
  initialValues: {
    type: String,
    default: "",
  },
});

const formHook = FormManagement({
  title: props.title ?? "Contact",
  url: props.url ?? "Contact",
  initialValues: props.initialValues ?? {
    name: "",
    label: "",
  },
});

const {
  formShow,
  formMode,
  formProcessing,
  formData,
  formError,
  formReadonly,
  exposedFormFunction,
  handleFormEmit,
  getActions,
} = formHook;
const emit = defineEmits(formEmit);

const { onFormCreate, onFormUpdate } = handleFormEmit(emit);

defineExpose({
  ...exposedFormFunction,
});
</script>

<template>
  <FormModal
    v-model="formShow"
    :mode="formMode"
    :title="props.title ?? 'Contact'"
    :loading="formProcessing"
    @onCreate="onFormCreate"
    @onUpdate="onFormUpdate"
  >
    <template #form>
      <q-form class="q-gutter-md">
        <q-input
          v-model="formData.name"
          filled
          label="Name"
          outlined
          hide-bottom-space
          dense
          stack-label
          :readonly="formReadonly"
          :error-message="formError.name"
          :error="formError.name !== undefined" />
        <q-input
          v-model="formData.label"
          filled
          label="Label"
          outlined
          hide-bottom-space
          dense
          stack-label
          :readonly="formReadonly"
      /></q-form>
    </template>
  </FormModal>
</template>src/components/Forms/Scripts/FormManagementsrc/components/Forms/Scripts/FormManagement