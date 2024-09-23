<script setup>
import { ref } from "vue";

const props = defineProps({
  value: {
    type: Object,
    default: () => ref({}),
  },

  options: Array,
});

const emit = defineEmits(["input", "onfilter", "onreset"]);

function input(field, event) {
  const filterValue = {
    ...props.value,
  };

  filterValue[field] = event;
  emit("input", filterValue);
}
</script>

<template>
  <q-list>
    <q-item v-for="(option, index) in options" :key="index">
      <q-item-section v-if="option.type == 'select'">
        <q-select
          @update:model-value="(e) => input(option.field, e)"
          :model-value="value[option.field]"
          style="min-width: 200px"
          :options="option.options"
          emit-value
          map-options
          :label="option.label"
          filled
          hide-bottom-space
          dense
        />
      </q-item-section>
    </q-item>
    <q-item>
      <q-item-section>
        <q-btn color="primary" @click="emit('onfilter')">Filter</q-btn>
      </q-item-section>
    </q-item>
    <q-item>
      <q-item-section>
        <q-btn color="secondary" @click="emit('onreset')">Reset</q-btn>
      </q-item-section>
    </q-item>
    <q-item clickable v-close-popup>
      <q-item-section>
        <q-btn color="secondary">close</q-btn>
      </q-item-section></q-item
    >
  </q-list>
</template>>