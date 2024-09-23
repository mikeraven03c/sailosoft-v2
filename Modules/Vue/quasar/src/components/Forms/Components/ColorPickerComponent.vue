<script setup>
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
    @update:model-value="input"
    :class="className"
    :label="label"
    :model-value="props.value"
    :error="error !== undefined"
    :error-message="error"
    :readonly="readonly"
    filled
    :rules="['anyColor']"
  >
    <template v-slot:append>
      <q-icon
        name="colorize"
        :style="{ color: props.value ? props.value : 'text-grey' }"
        class="cursor-pointer"
      >
        <q-popup-proxy cover transition-show="scale" transition-hide="scale">
          <q-color @update:model-value="input" :model-value="props.value" />
        </q-popup-proxy>
      </q-icon>
    </template>
  </q-input>
</template>