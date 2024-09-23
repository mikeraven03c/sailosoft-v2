<script setup>
import { selectRenderHooks } from "src/components/Select/Scripts/selectRenderHooks";
import { computed, toRef, watch } from "vue";

const props = defineProps({
  label: String,
  resource: String,
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

const tagsSelectHooks = selectRenderHooks({
  url: "custom-apps/tags",
  map: (e) => ({
    label: e.name,
    value: e.id,
    color: e.color,
  }),
}).actions.addFilterAction((actions) => {
  actions.addFilter("resource", props.resource);
});

const emit = defineEmits(["input"]);

function input(e) {
  emit("input", e);
}
</script>
<template>
  <q-select
    @update:model-value="input"
    @filter="tagsSelectHooks.filterFn"
    @filter-abort="tagsSelectHooks.abortFilterFn"
    :class="className"
    :model-value="props.value"
    :error="error !== undefined"
    :error-message="error"
    :readonly="readonly"
    :options="tagsSelectHooks.options.value"
    :label="label"
    filled
    hide-bottom-space
    dense
    input-debounce="1000"
    use-input
    use-chips
    multiple
  >
    <template v-slot:no-option>
      <q-item>
        <q-item-section class="text-grey"> No results </q-item-section>
      </q-item>
    </template>
  </q-select>
</template>