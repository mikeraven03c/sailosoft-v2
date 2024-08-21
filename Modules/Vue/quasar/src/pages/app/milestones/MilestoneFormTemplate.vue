<script setup>
import { format } from "quasar";
import TaskIndexTemplate from "pages/app/tasks/TaskIndexTemplate.vue";
import { onMounted, watch } from "vue";

const { capitalize } = format;
const { formHooks } = defineProps({
  formHooks: Object,
});

const { formData, formReadonly, formError, hooksCycle, actions } = formHooks;
const custom = {
  params: {},
  resolvedFields: (fields) => {
    fields.milestone_id = formData.value.id;
    return fields;
  },
};
const tabsConfig = {
  tabs: [
    {
      name: "to-do",
      label: "To Do",
      params: (params) => {
        params.params["filter[status.value]"] = "to-do";

        return params;
      },
    },
    {
      label: "In Progress",
      name: "in-progress",
      params: (params) => {
        params.params["filter[status.value]"] = "in-progress";
        return params;
      },
    },
    {
      label: "Need Review",
      name: "need-review",
      params: (params) => {
        params.params["filter[status.value]"] = "need-review";
        return params;
      },
    },
    {
      label: "Complete",
      name: "complete",
      params: (params) => {
        params.params["filter[status.value]"] = "complete";
        return params;
      },
    },
  ],
};
custom.params["filter[milestone_id]"] = formData.value.id;
</script>
<template>
  <div>
    <q-form class="q-gutter-md q-mt-xs">
      <!-- Name -->
      <q-input
        v-model="formData.title"
        filled
        label="Title *"
        outlined
        hide-bottom-space
        dense
        :readonly="formReadonly"
        :error-message="formError.title"
        :error="formError.title !== undefined"
      />

      <!-- Due Date -->
      <q-input
        filled
        hide-bottom-space
        dense
        v-model="formData.due_date"
        mask="date"
        label="Due Date"
        :rules="['date']"
        :readonly="formReadonly"
      >
        <template v-slot:append>
          <q-icon name="event" class="cursor-pointer">
            <q-popup-proxy
              cover
              transition-show="scale"
              transition-hide="scale"
            >
              <q-date v-model="formData.due_date">
                <div class="row items-center justify-end">
                  <q-btn v-close-popup label="Close" color="primary" flat />
                </div>
              </q-date>
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>

      <!-- description -->
      <q-input
        v-model="formData.description"
        filled
        :label="capitalize('description')"
        outlined
        hide-bottom-space
        dense
        type="textarea"
        :readonly="formReadonly"
        :error-message="formError.description"
        :error="formError.description !== undefined"
      />
    </q-form>
    <q-card v-if="actions.formMode.isShow()" class="q-mt-md">
      <TaskIndexTemplate
        is-custom
        :custom="custom"
        :tabsConfig="tabsConfig"
        :hide="['milestone']"
      />
    </q-card>
  </div>
</template>