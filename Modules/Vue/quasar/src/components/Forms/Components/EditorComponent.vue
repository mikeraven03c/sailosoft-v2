<script setup>
const props = defineProps({
  label: String,
  value: String,
  readonly: {
    type: Boolean,
    default: false,
  },
  className: String,
});

const emit = defineEmits(["input"]);

function input(e) {
  emit("input", e);
}
</script>
<template>
  <div :class="className">
    <label class="text-grey q-pa-xs">{{ label }}</label>
    <q-editor
      :model-value="value"
      :readony="formReadonly"
      @update:model-value="input"
      min-height="5rem"
      :readonly="formReadonly"
    />
  </div>
</template>