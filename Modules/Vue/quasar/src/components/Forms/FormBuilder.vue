<script setup>
import TextComponent from "src/components/Forms/Components/TextComponent.vue";
import EditorComponent from "src/components/Forms/Components/EditorComponent.vue";
import MoneyComponent from "src/components/Forms/Components/MoneyComponent.vue";
import NumberComponent from "src/components/Forms/Components/NumberComponent.vue";
import SelectComponent from "src/components/Forms/Components/SelectComponent.vue";
import ColorPickerComponent from "src/components/Forms/Components/ColorPickerComponent.vue";
import { computed, defineAsyncComponent } from "vue";

const props = defineProps({
  fields: Array,
  formData: Object,
  formError: Object,
  formReadonly: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["update"]);
const formComponent = computed(() => {
  let components = {};

  const asyncComponents = {
    text: TextComponent,
    editor: EditorComponent,
    money: MoneyComponent,
    number: NumberComponent,
    select: SelectComponent,
    color: ColorPickerComponent,
    default: defineAsyncComponent(() =>
      import("src/components/Forms/Components/TextComponent.vue")
    ),
  };

  props.fields.forEach((field) => {
    components[field["field"]] = asyncComponents[field["type"]];
  });

  return components;
});

function update(field, value) {
  emit("update", field, value);
}
</script>
<template>
  <!-- <q-input v-for="(component, index) in props.fields" :key="index"></q-input> -->
  <component
    v-for="(field, index) in props.fields"
    :key="index"
    :is="formComponent[field['field']]"
    :value="formData[field['field']]"
    :error="formError[field['field']]"
    :readonly="formReadonly"
    @input="(e) => update(field['field'], e)"
    v-bind="field['property']"
  ></component>
</template>