<script setup>
import { selectRenderHooks } from "src/components/Select/Scripts/selectRenderHooks";
import HandleFormShow from "components/Forms/Scripts/HandleFormShow";
import { onMounted, ref, watch } from "vue";
import FormManagement from "src/components/Forms/Scripts/FormManagement";
import FormModal from "components/Forms/FormModal.vue";
import OrganizationFormTemplate from "pages/app/organizations/OrganizationFormTemplate.vue";
import ContactFormTemplate from "pages/app/contacts/ContactFormTemplate.vue";
import { contactResource } from "../contacts/contactResource";
import NoteIndexTemplate from "pages/app/notes/NoteIndexTemplate.vue";

const { formHooks } = defineProps({
  formHooks: Object,
});

const { formData, formReadonly, formError, hooksCycle, actions } = formHooks;

const contactHooks = selectRenderHooks({
  url: "custom-apps/contacts",
  map: (e) => ({
    label: e.name,
    value: e.id,
  }),
});

const organizationHooks = selectRenderHooks({
  url: "custom-apps/organizations",
  map: (e) => ({
    label: e.name,
    value: e.id,
  }),
});

const organizationFormHooks = FormManagement({
  title: "Organization",
  url: "custom-apps/organizations",
});

organizationFormHooks.hooksCycle.afterCreate = (data) => {
  formData.value.organization = {
    label: data.name,
    value: data.id,
  };
};

organizationFormHooks.hooksCycle.afterUpdate = (data) => {
  handleOrganizationForm.record.value = data;
};

const contactFormHooks = FormManagement({
  title: contactResource.title,
  url: contactResource.url,
});

contactFormHooks.hooksCycle.afterCreate = (data) => {
  formData.value.contact = {
    label: data.name,
    value: data.id,
  };
};

contactFormHooks.hooksCycle.afterUpdate = (data) => {
  handleContactForm.record.value = data;
};

const pipelineSelectHooks = selectRenderHooks({
  url: "custom-apps/pipelines",
  map: (e) => ({
    label: e.name,
    value: e.id,
  }),
});

const pipelineStageSelectHooks = selectRenderHooks({
  url: "custom-apps/pipeline-stages",
  map: (e) => ({
    label: e.name,
    value: e.id,
  }),
});

pipelineStageSelectHooks.hooks.resolvedParams = (data) => {
  data.params["filter[pipeline_id]"] = formData.value.pipeline.value;
  return data;
};

const handleContactForm = HandleFormShow({
  url: "custom-apps/contacts",
});

const handleOrganizationForm = HandleFormShow({
  url: "custom-apps/organizations",
});

hooksCycle.afterResolve = (fields) => {
  fields.is_lead = false;
  if (fields.contact) {
    fields.contact_id = fields.contact.value;
  }
  if (fields.organization) {
    fields.organization_id = fields.organization.value;
  }
  return fields;
};

watch(
  () => formData.value.pipeline,
  (newValue, oldValue) => {
    if (newValue) {
      formData.value.pipeline_stage = null;
    }
  }
);

onMounted(() => {
  if (actions.formMode.isShow()) {
    if (formData.value.contact) {
      handleContactForm.fetch(
        formData.value.contact_id ?? formData.value.contact.value
      );
    }

    if (formData.value.organization) {
      handleOrganizationForm.fetch(
        formData.value.organization_id ?? formData.value.organization.value
      );
    }
  }
});

const tab = ref("contact");
</script>
<template>
  <div>
    <q-form class="q-gutter-md q-mt-xs">
      <!-- Contact -->
      <q-select
        filled
        use-input
        dense
        hide-bottom-space
        v-model="formData.contact"
        :error-message="formError.contact"
        :error="formError.contact !== undefined"
        label="Contact"
        input-debounce="1000"
        :options="contactHooks.options.value"
        @filter="contactHooks.filterFn"
        @filter-abort="contactHooks.abortFilterFn"
        :readonly="formReadonly"
        clearable
      >
        <template v-slot:append>
          <q-icon
            v-if="!formData.contact"
            class="cursor-pointer"
            name="add_circle"
            @click.stop.prevent="contactFormHooks.actions.form.create()"
          />
        </template>
        <template v-slot:no-option>
          <q-item>
            <q-item-section class="text-grey"> No results </q-item-section>
          </q-item>
        </template>
      </q-select>

      <!-- Organization -->
      <q-select
        filled
        use-input
        dense
        hide-bottom-space
        v-model="formData.organization"
        :error-message="formError.organization"
        :error="formError.organization !== undefined"
        label="Organization"
        input-debounce="1000"
        :options="organizationHooks.options.value"
        @filter="organizationHooks.filterFn"
        @filter-abort="organizationHooks.abortFilterFn"
        :readonly="formReadonly"
        clearable
      >
        <template v-slot:append>
          <q-icon
            v-if="!formData.organization"
            class="cursor-pointer"
            name="add_circle"
            @click.stop.prevent="organizationFormHooks.actions.form.create()"
          />
        </template>
        <template v-slot:no-option>
          <q-item>
            <q-item-section class="text-grey"> No results </q-item-section>
          </q-item>
        </template>
      </q-select>

      <!-- Title -->
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
      <!-- Value -->
      <q-input
        v-model="formData.value"
        filled
        label="Value"
        outlined
        hide-bottom-space
        dense
        :readonly="formReadonly"
        :error-message="formError.value"
        :error="formError.value !== undefined"
      />

      <!-- Pipelines -->
      <q-select
        filled
        use-input
        dense
        hide-bottom-space
        v-model="formData.pipeline"
        :error-message="formError.pipeline"
        :error="formError.pipeline !== undefined"
        label="Pipelines"
        input-debounce="1000"
        :options="pipelineSelectHooks.options.value"
        @filter="pipelineSelectHooks.filterFn"
        @filter-abort="pipelineSelectHooks.abortFilterFn"
        :readonly="formReadonly"
      >
        <template v-slot:no-option>
          <q-item>
            <q-item-section class="text-grey"> No results </q-item-section>
          </q-item>
        </template>
      </q-select>

      <!-- Pipeline Stages -->
      <q-select
        filled
        use-input
        dense
        hide-bottom-space
        v-model="formData.pipeline_stage"
        :error-message="formError.pipeline_stage"
        :error="formError.pipeline_stage !== undefined"
        label="Pipeline Stage"
        input-debounce="1000"
        :options="pipelineStageSelectHooks.options.value"
        @filter="pipelineStageSelectHooks.filterFn"
        @filter-abort="pipelineStageSelectHooks.abortFilterFn"
        :readonly="formReadonly"
      >
        <template v-slot:no-option>
          <q-item>
            <q-item-section class="text-grey"> No results </q-item-section>
          </q-item>
        </template>
      </q-select>

      <!-- Label -->
      <q-select
        v-model="formData.label"
        :error-message="formError.label"
        :error="formError.label !== undefined"
        filled
        hide-bottom-space
        dense
        :options="['Hot', 'Warm', 'Cold']"
        label="Label"
      />

      <!-- Source -->
      <q-input
        v-model="formData.source"
        filled
        label="Source"
        outlined
        hide-bottom-space
        dense
        :readonly="formReadonly"
        :error-message="formError.source"
        :error="formError.source !== undefined"
      />

      <q-card v-if="actions.formMode.isShow()">
        <q-tabs
          v-model="tab"
          dense
          class="text-grey"
          active-color="primary"
          indicator-color="primary"
          align="justify"
          narrow-indicator
        >
          <q-tab name="contact" label="Contact" />
          <q-tab name="organization" label="Organization" />
          <q-tab name="note" label="Notes" />
        </q-tabs>

        <q-separator />

        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="contact">
            <div v-if="handleContactForm.loading.value" class="q-ma-xl">
              <q-inner-loading
                :showing="handleContactForm.loading.value"
                color="primary"
              />
              <!-- <q-spinner-gears size="50px" color="primary" /> -->
            </div>
            <div v-else class="q-gutter-md q-mt-xs">
              <!-- Name -->
              <q-input
                v-model="handleContactForm.record.value.name"
                filled
                label="Name"
                outlined
                hide-bottom-space
                dense
                readonly
              />

              <div
                v-for="(email, index) in handleContactForm.record.value?.emails"
                :key="index"
              >
                <q-input
                  readonly
                  type="email"
                  dense
                  filled
                  :model-value="email"
                  label="Email"
                >
                </q-input>
              </div>

              <div
                v-for="(phone, index) in handleContactForm.record.value?.phones"
                :key="index"
              >
                <q-input
                  readonly
                  dense
                  filled
                  :model-value="phone"
                  label="Phone"
                >
                </q-input>
              </div>

              <q-btn
                label="Edit"
                color="primary"
                size="md"
                @click="
                  contactFormHooks.actions.form.edit(
                    handleContactForm.record.value
                  )
                "
              ></q-btn>
            </div>
          </q-tab-panel>

          <q-tab-panel name="organization">
            <div v-if="handleOrganizationForm.loading.value" class="q-ma-xl">
              <q-inner-loading
                :showing="handleOrganizationForm.loading.value"
                color="primary"
              />
            </div>
            <div v-else class="q-gutter-md q-mt-xs">
              <!-- Name -->
              <q-input
                v-model="handleOrganizationForm.record.value.name"
                filled
                label="Name"
                outlined
                hide-bottom-space
                dense
                readonly
              />

              <div
                v-for="(email, index) in handleOrganizationForm.record.value
                  ?.emails"
                :key="index"
              >
                <q-input
                  readonly
                  type="email"
                  dense
                  filled
                  :model-value="email"
                  label="Email"
                >
                </q-input>
              </div>

              <div
                v-for="(phone, index) in handleOrganizationForm.record.value
                  ?.phones"
                :key="index"
              >
                <q-input
                  readonly
                  dense
                  filled
                  :model-value="phone"
                  label="Phone"
                >
                </q-input>
              </div>
              <q-btn
                label="Edit"
                color="primary"
                size="md"
                @click="
                  organizationFormHooks.actions.form.edit(
                    handleOrganizationForm.record.value
                  )
                "
              ></q-btn>
            </div>
          </q-tab-panel>

          <!-- Note -->
          <q-tab-panel name="note">
            <NoteIndexTemplate :id="formData.id" type="opportunities" />
          </q-tab-panel>
        </q-tab-panels>
      </q-card>
    </q-form>

    <FormModal
      v-model="organizationFormHooks.formShow.value"
      :mode="organizationFormHooks.formMode.value"
      title="Organization"
      :loading="organizationFormHooks.formProcessing.value"
      @onCreate="organizationFormHooks.onCreate({})"
      @onUpdate="organizationFormHooks.onUpdate({})"
    >
      <template #form>
        <OrganizationFormTemplate
          :formHooks="organizationFormHooks"
        ></OrganizationFormTemplate>
      </template>
    </FormModal>

    <FormModal
      v-model="contactFormHooks.formShow.value"
      :mode="contactFormHooks.formMode.value"
      :title="contactResource.title"
      :loading="contactFormHooks.formProcessing.value"
      @onCreate="contactFormHooks.onCreate({})"
      @onUpdate="contactFormHooks.onUpdate({})"
    >
      <template #form>
        <ContactFormTemplate
          :formHooks="contactFormHooks"
        ></ContactFormTemplate>
      </template>
    </FormModal>
  </div>
</template>