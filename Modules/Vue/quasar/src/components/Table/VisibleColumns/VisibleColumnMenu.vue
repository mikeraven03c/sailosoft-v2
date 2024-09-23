<script setup>
import { capitalize, ref } from "vue";

const { config } = defineProps({
  config: Object,
});

const columns = config.value;
// const selection = ref(columns);
</script>
<template>
  <!-- <q-checkbox v-model="selection" val="teal" label="Teal" color="teal" /> -->
  <q-btn round size="sm" color="primary" icon="table_view">
    <q-menu>
      <q-list dense style="min-width: 200px">
        <q-item clickable v-close-popup @click="config.displayAll()">
          <q-item-section>Display all</q-item-section>
        </q-item>
        <q-item clickable v-close-popup @click="config.displayDefault()">
          <q-item-section>Default Columns</q-item-section>
        </q-item>
        <q-item v-for="(column, index) in columns" :key="index">
          <q-item-section>
            <q-checkbox
              :model-value="config.selection.value"
              @update:model-value="config.update"
              :val="column"
              :label="capitalize(column).replace(/_/g, ' ')"
              dense
            />
          </q-item-section>
        </q-item>
      </q-list>
    </q-menu>
  </q-btn>
</template>