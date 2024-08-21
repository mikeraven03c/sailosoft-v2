<script setup>
import { ref } from "vue";
import CommentTemplate from "pages/app/comments/CommentTemplate.vue";
import NoteIndexTemplate from "pages/app/notes/NoteIndexTemplate.vue";
import { selectRenderHooks } from "src/components/Select/Scripts/selectRenderHooks";
const { formHooks, hide } = defineProps({
  formHooks: Object,
  hide: {
    type: Array,
    default: () => [],
  },
});

const { formData, formReadonly, formError, hooksCycle, actions } = formHooks;

const statusOption = [
  {
    label: "To do",
    value: "to-do",
  },
  {
    label: "In Progress",
    value: "in-progress",
  },
  {
    label: "Need Review",
    value: "need-review",
  },
  {
    label: "Complete",
    value: "complete",
  },
];

const priorityOption = [
  {
    label: "Urgent",
    value: "urgent",
  },
  {
    label: "High",
    value: "high",
  },
  {
    label: "Normal",
    value: "normal",
  },
  {
    label: "Low",
    value: "low",
  },
];

const milestoneSelectHooks = selectRenderHooks({
  url: "custom-apps/milestones",
  map: (e) => ({
    label: e.title,
    value: e.id,
  }),
});

function formResolves(fields) {
  if (!hide.includes("milestone")) {
    if (fields.milestone) {
      fields.milestone_id = fields.milestone.value;
    }
  }

  return fields;
}
const afterResolve = hooksCycle.afterResolve;
hooksCycle.afterResolve = (fields) => {
  return formResolves(afterResolve(fields));
};

const tab = ref("comment");
</script>
<template>
  <div>
    <q-form class="q-gutter-md q-mt-xs">
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

      <q-editor
        v-model="formData.description"
        min-height="5rem"
        :readonly="formReadonly"
      />

      <!-- Status -->
      <q-select
        v-model="formData.status"
        :error-message="formError.status"
        :error="formError.status !== undefined"
        filled
        hide-bottom-space
        dense
        :options="statusOption"
        label="Status"
        :readonly="formReadonly"
      />

      <!-- Start Date -->
      <q-input
        filled
        v-model="formData.start_date"
        mask="date"
        hide-bottom-space
        dense
        label="Start Date"
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
              <q-date v-model="formData.start_date">
                <div class="row items-center justify-end">
                  <q-btn v-close-popup label="Close" color="primary" flat />
                </div>
              </q-date>
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>

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

      <!-- Priority -->
      <q-select
        v-model="formData.priority"
        :error-message="formError.priority"
        :error="formError.priority !== undefined"
        filled
        hide-bottom-space
        dense
        :options="priorityOption"
        label="Priority"
        :readonly="formReadonly"
      />

      <!-- Milestone -->
      <q-select
        v-if="!hide.includes('milestone')"
        filled
        use-input
        dense
        hide-bottom-space
        v-model="formData.milestone"
        :error-message="formError.milestone"
        :error="formError.milestone !== undefined"
        label="Milestone"
        input-debounce="1000"
        :options="milestoneSelectHooks.options.value"
        @filter="milestoneSelectHooks.filterFn"
        @filter-abort="milestoneSelectHooks.abortFilterFn"
        :readonly="formReadonly"
      >
        <template v-slot:no-option>
          <q-item>
            <q-item-section class="text-grey"> No results </q-item-section>
          </q-item>
        </template>
      </q-select>

      <!-- Put Tags here -->
      <!-- <q-select
        v-model="formData.priority"
        :error-message="formError.priority"
        :error="formError.priority !== undefined"
        filled
        hide-bottom-space
        dense
        :options="priorityOption"
        label="Priority"
      /> -->

      <!-- For Show -->
      <q-card v-if="actions.formMode.isShow() || actions.formMode.isUpdate()">
        <q-tabs
          v-model="tab"
          dense
          class="text-grey"
          active-color="primary"
          indicator-color="primary"
          align="justify"
          narrow-indicator
        >
          <q-tab name="comment" label="Comment" />
          <q-tab name="note" label="Note" />
        </q-tabs>
        <q-separator />
        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="comment">
            <CommentTemplate :id="formData.id" type="tasks"></CommentTemplate>
          </q-tab-panel>
          <q-tab-panel name="note">
            <NoteIndexTemplate :id="formData.id" type="tasks" />
          </q-tab-panel>
        </q-tab-panels>
      </q-card>
    </q-form>
  </div>
</template>