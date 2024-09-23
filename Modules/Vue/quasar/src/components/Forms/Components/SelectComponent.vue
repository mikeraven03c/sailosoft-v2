<script setup>
import { computed, toRef, watch } from "vue";

const props = defineProps({
  label: String,
  value: [Object, String],
  error: String || Array || undefined,
  propClass: String,
  readonly: {
    type: Boolean,
    default: false,
  },
  className: String,
  options: Array,
  emitOption: {
    type: Boolean,
    default: true,
  },
});

const emit = defineEmits(["input"]);

function input(e) {
  emit("input", e);
}
</script>
<template>
  <q-select
    @update:model-value="input"
    :class="className"
    :model-value="props.value"
    :error="error !== undefined"
    :error-message="error"
    :readonly="readonly"
    :options="options"
    :emit-value="emitOption"
    :map-options="emitOption"
    filled
    hide-bottom-space
    dense
    :label="label"
  />
</template>