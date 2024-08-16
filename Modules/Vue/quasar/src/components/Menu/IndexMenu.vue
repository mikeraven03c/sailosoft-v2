<script setup>
const emit = defineEmits(["onNew", "onDelete", "onShow", "onRefresh"]);
const props = defineProps({
  loading: Boolean,
});
</script>
<template>
  <div>
    <q-btn
      @click="$emit('onNew')"
      round
      color="primary"
      size="sm"
      icon="add"
      :disable="props.loading"
    />
    <span class="q-mx-xs"></span>
    <q-btn
      @click="$emit('onDelete')"
      :disable="props.loading"
      round
      color="red"
      size="sm"
      icon="delete"
    />
    <span class="q-mx-xs"></span>
    <q-btn
      :disable="props.loading"
      round
      color="green"
      size="sm"
      icon="refresh"
      @click="$emit('onRefresh')"
    />
    <span class="q-mx-xs"></span>
    <q-btn
      :disable="props.loading"
      round
      color="secondary"
      size="sm"
      icon="more_horiz"
    />
  </div>
</template>
