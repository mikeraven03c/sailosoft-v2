<script setup>
const { items } = defineProps({
  items: Array,
});
</script>

<template>
  <q-list>
    <div v-for="(item, index) in items" :key="index">
      <q-expansion-item
        v-if="item.expansion"
        expand-separator
        :icon="item.icon"
        :label="item.title"
      >
        <q-item
          v-for="(cItem, cIndex) in item.children"
          :key="cIndex"
          clickable
          class="q-mx-md"
          :to="cItem.link"
        >
          <q-item-section v-if="cItem.icon" avatar>
            <q-icon :name="cItem.icon" />
          </q-item-section>

          <q-item-section>
            <q-item-label>{{ cItem.title }}</q-item-label>
            <q-item-label caption>{{ cItem.caption }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-expansion-item>
      <q-item v-else :key="index" clickable :to="item.link">
        <q-item-section v-if="item.icon" avatar>
          <q-icon :name="item.icon" />
        </q-item-section>

        <q-item-section>
          <q-item-label>{{ item.title }}</q-item-label>
          <q-item-label caption>{{ item.caption }}</q-item-label>
        </q-item-section>
      </q-item>
    </div>
  </q-list>
</template>