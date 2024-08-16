<script setup>
const EDIT = "edit";
const DELETE = "delete";
const SHOW = "show";

const props = defineProps({
  hide: {
    type: Array,
    default: () => [],
  },
  append: {
    type: Array,
    default: () => [],
  },
  prepend: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits([
  "onEdit",
  "onDelete",
  "onShow",
  "onAppend",
  "onPrepend",
]);
</script>
<template>
  <q-menu touch-position context-menu>
    <q-list dense style="min-width: 100px">
      <!-- Prepend -->
      <q-item
        v-for="(item, index) in prepend"
        :key="index"
        @click="emit('onPrepend', item.name)"
        clickable
        v-close-popup
      >
        <q-item-section>{{ item.label }}</q-item-section>
      </q-item>
      <q-item
        v-if="!props.hide.includes(SHOW)"
        @click="$emit('onShow')"
        clickable
        v-close-popup
      >
        <q-item-section> Show </q-item-section>
      </q-item>
      <!-- Edit -->
      <q-item
        v-if="!props.hide.includes(EDIT)"
        @click="$emit('onEdit')"
        clickable
        v-close-popup
      >
        <q-item-section> Edit </q-item-section>
      </q-item>

      <!-- Delete -->
      <q-item
        v-if="!props.hide.includes(DELETE)"
        @click="$emit('onDelete')"
        clickable
        v-close-popup
      >
        <q-item-section> Delete </q-item-section>
      </q-item>

      <!-- Append -->
      <q-item
        v-for="(item, index) in append"
        :key="index"
        @click="emit('onAppend', item.name)"
        clickable
        v-close-popup
      >
        <q-item-section>{{ item.label }}</q-item-section>
      </q-item>

      <!-- Show -->
    </q-list>
  </q-menu>
</template>