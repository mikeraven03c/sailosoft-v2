<script setup>
import { computed, toRef, watch } from "vue";

const props = defineProps({
  label: String,
  value: String,
  error: String || Array || undefined,
  propClass: String,
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
  <q-input
    :class="className"
    :label="label"
    :model-value="props.value"
    :error="error !== undefined"
    :error-message="error"
    :readonly="readonly"
    @update:model-value="input"
    outlined
    type="number"
    filled
    input-class="text-right"
    hide-bottom-space
    dense
  ></q-input>
</template>