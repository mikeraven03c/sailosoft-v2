<script setup>
import FormModal from "components/Forms/FormModal.vue";
import FormManagement from "src/components/Forms/Scripts/FormManagement";
import { formEmit } from "src/components/Forms/Scripts/FormManagement";
import { computed } from "vue";

const { title, url, initialValues, formHooks } = defineProps({
  title: {
    type: String,
    default: "",
  },
  url: {
    type: String,
    default: "",
  },
  initialValues: {
    type: Object,
    default: () => ({}), // Use a function to create a new object
  },
  formHooks: {
    type: Object,
    default: () => {},
  },
});

function initFormHook() {
  return FormManagement({
    title: title,
    url: url,
    initialValues: initialValues,
  });
}

// const formHook = initFormHook();
// const formHook = computed(() => {
//   return hook || initFormHook();
// });
const resourceFormHook = formHooks || initFormHook();

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
} = resourceFormHook;
const emit = defineEmits(formEmit);

// Emit data from create and update to parent
const { onFormCreate, onFormUpdate } = handleFormEmit(emit);

defineExpose({
  ...exposedFormFunction,
});
</script>

<template>
  <FormModal
    v-model="formShow"
    :mode="formMode"
    :title="title"
    :loading="formProcessing"
    @onCreate="onFormCreate"
    @onUpdate="onFormUpdate"
  >
    <template #form>
      <slot></slot>
    </template>
  </FormModal>
</template>src/components/Forms/Scripts/FormManagementsrc/components/Forms/Scripts/FormManagement