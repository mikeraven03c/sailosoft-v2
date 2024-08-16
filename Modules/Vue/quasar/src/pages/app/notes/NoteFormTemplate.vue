<script setup>
const { formHooks } = defineProps({
  formHooks: Object,
});

const { formData, formReadonly, formError, hooksCycle } = formHooks;
</script>
<template>
  <div>
    <q-form class="q-gutter-md q-mt-xs">
      <!-- Name -->
      <q-input
        v-model="formData.name"
        filled
        label="Name *"
        outlined
        hide-bottom-space
        dense
        :readonly="formReadonly"
        :error-message="formError.name"
        :error="formError.name !== undefined"
      />

      <q-editor v-model="formData.note" min-height="5rem" />
    </q-form>
  </div>
</template>