<script setup>
import { h } from "vue";
import { identifyTextColor } from "components/Colors/Scripts/IndentifyTextColor";

const myProps = defineProps({
  props: Object,
});

// const { col, value, row } = props;

// if (col.type == "tags") {
//   console.log(props);
//   console.log(row);
// }

const color = () =>
  h("span", { style: `color: ${myProps.props.value};` }, myProps.props.value);
</script>
<template>
  <q-td>
    <!-- With Color -->
    <color v-if="props.col.type == 'color'"></color>

    <!-- Tags -->
    <div v-else-if="props.col.type == 'tags'">
      <q-chip
        v-for="(item, index) in props.value"
        :key="index"
        :style="'background-color:' + item.color"
      >
        <span :class="identifyTextColor(item.color)"> {{ item.label }}</span>
      </q-chip>
    </div>

    <!-- Default -->
    <span v-else>{{ props.value }}</span>
  </q-td>
</template>