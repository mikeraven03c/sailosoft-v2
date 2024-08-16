<script setup>
import { selectRenderHooks } from "src/components/Select/Scripts/selectRenderHooks";

const { formHooks } = defineProps({
  formHooks: Object,
});

const { formData, formReadonly, formError, hooksCycle } = formHooks;

const pipelineHooks = selectRenderHooks({
  url: "custom-apps/pipelines",
  map: (e) => ({
    label: e.name,
    value: e.id,
  }),
});

hooksCycle.afterResolve = (fields) => {
  if (fields.pipeline) {
    fields.pipeline_id = fields.pipeline.value;
  }
  return fields;
};

const pipelineOption = pipelineHooks.options;
</script>
<template>
  <div>
    <q-form class="q-gutter-md q-mt-xs">
      <q-select
        filled
        use-input
        v-model="formData.pipeline"
        label="Pipeline"
        input-debounce="1000"
        :options="pipelineOption"
        dense
        @filter="pipelineHooks.filterFn"
        @filter-abort="pipelineHooks.abortFilterFn"
        :readonly="formReadonly"
      >
        <template v-slot:no-option>
          <q-item>
            <q-item-section class="text-grey"> No results </q-item-section>
          </q-item>
        </template>
      </q-select>

      <!-- Name -->
      <q-input
        v-model="formData.name"
        filled
        label="Name *"
        outlined
        hide-bottom-space
        dense
        :readonly="formReadonly"
        :error-message="formError.name"
        :error="formError.name !== undefined"
      />
      <!-- Label -->
      <q-input
        v-model="formData.description"
        filled
        label="description"
        outlined
        hide-bottom-space
        dense
        :readonly="formReadonly"
        :error-message="formError.description"
        :error="formError.description !== undefined"
      />
    </q-form>
  </div>
</template>