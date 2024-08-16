<script setup>
import { format } from "quasar";
import { ref } from "vue";

const { capitalize } = format;
const NEW = "new";
const EDIT = "edit";
const SHOW = "show";

const props = defineProps({
  isShow: {
    type: Boolean,
    default: false,
  },
  formStyle: {
    type: String,
    default: "width: 500px; max-width:90vw;",
  },
  title: String,
  mode: {
    type: String,
    default: "new",
  },
  loading: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["onCreate", "onUpdate"]);

const maximized = ref(false);

function onSave() {
  if (props.mode == NEW) {
    emit("onCreate");
  } else {
    emit("onUpdate");
  }
}
</script>
<template>
  <q-dialog persistent :maximized="maximized">
    <!-- :style="formStyle"  -->
    <q-card :style="maximized ? '' : formStyle" class="relative">
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6">
          {{ capitalize(props.mode) + " " + props.title }}
        </div>
        <q-space />

        <q-btn
          icon="save"
          flat
          round
          dense
          @click="onSave"
          v-if="mode != 'show'"
        />
        <q-btn
          icon="fullscreen"
          flat
          round
          dense
          @click="() => (maximized = !maximized)"
        />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>

      <q-separator inset />

      <q-card-section>
        <slot name="form"></slot>
      </q-card-section>

      <q-separator inset />
      <q-card-actions align="right">
        <q-btn
          flat
          label="Cancel"
          color="primary"
          v-close-popup
          v-if="props.mode != SHOW"
        />
        <q-btn
          flat
          @click="onSave"
          v-if="props.mode != SHOW"
          @keyup.enter="prompt = false"
          color="primary"
          :disable="props.mode == SHOW"
          :label="props.mode == NEW ? 'Create' : 'Update'"
        />
      </q-card-actions>
      <q-inner-loading :showing="props.loading">
        <q-spinner size="3em" :thickness="2" color="primary"></q-spinner>
        <span class="text-primary">Processing ...</span>
      </q-inner-loading>
    </q-card>
  </q-dialog>
</template>
