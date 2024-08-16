<script setup>
import { onMounted, ref } from "vue";
import { sequeceInputHooks } from "components/Inputs/Scripts/sequenceInputHooks";
import { selectRenderHooks } from "src/components/Select/Scripts/selectRenderHooks";

const { formHooks } = defineProps({
  formHooks: Object,
});

const { formData, formReadonly, formError, hooksCycle } = formHooks;

const sequenceEmail = sequeceInputHooks(formData, "emails");
const sequencePhone = sequeceInputHooks(formData, "phones");

hooksCycle.afterResolve = (fields) => {
  if (fields.organization) {
    fields.organization_id = fields.organization.value;
  }
  return fields;
};
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
      <!-- Label -->
      <q-input
        v-model="formData.label"
        filled
        label="Label"
        outlined
        hide-bottom-space
        dense
        :readonly="formReadonly"
      />

      <div v-for="(email, index) in formData.emails" :key="index">
        <q-input
          :readonly="formReadonly"
          type="email"
          dense
          filled
          v-model="formData.emails[index]"
          label="Email"
        >
          <template v-slot:append>
            <q-btn
              v-if="sequenceEmail.isDisplayAdd(index)"
              round
              dense
              flat
              icon="add"
              @click="sequenceEmail.add"
            />
            <q-btn
              v-if="sequenceEmail.isDisplayRemove(index)"
              round
              dense
              flat
              icon="close"
              @click="sequenceEmail.remove(index)"
            />
          </template>
        </q-input>
      </div>

      <div v-for="(phone, index) in formData.phones" :key="index">
        <q-input
          :readonly="formReadonly"
          type="email"
          dense
          filled
          v-model="formData.phones[index]"
          label="Phone"
        >
          <template v-slot:append>
            <q-btn
              v-if="sequencePhone.isDisplayAdd(index)"
              round
              dense
              flat
              icon="add"
              @click="sequencePhone.add"
            />
            <q-btn
              v-if="sequencePhone.isDisplayRemove(index)"
              round
              dense
              flat
              icon="close"
              @click="sequencePhone.remove(index)"
            />
          </template>
        </q-input>
      </div>

      <div class="text-h6 q-my-md">Address</div>
      <!-- House/Unit Number -->
      <q-input
        v-model="formData.house_unit"
        filled
        label="House/Unit Number"
        outlined
        hide-bottom-space
        dense
        :readonly="formReadonly"
        :error-message="formError.house_unit"
        :error="formError.house_unit !== undefined"
      />

      <!-- Street Name -->
      <q-input
        v-model="formData.street_name"
        filled
        label="Street Name"
        outlined
        hide-bottom-space
        dense
        :readonly="formReadonly"
        :error-message="formError.street_name"
        :error="formError.street_name !== undefined"
      />

      <!-- Subdivision  -->
      <q-input
        v-model="formData.subdivision"
        filled
        label="Subdivision"
        outlined
        hide-bottom-space
        dense
        :readonly="formReadonly"
        :error-message="formError.subdivision"
        :error="formError.subdivision !== undefined"
      />

      <!-- Barangay -->
      <q-input
        v-model="formData.barangay"
        filled
        label="Barangay"
        outlined
        hide-bottom-space
        dense
        :readonly="formReadonly"
        :error-message="formError.barangay"
        :error="formError.barangay !== undefined"
      />

      <!-- City/Municipality -->
      <q-input
        v-model="formData.city"
        filled
        label="City/Municipality"
        outlined
        hide-bottom-space
        dense
        :readonly="formReadonly"
        :error-message="formError.city"
        :error="formError.city !== undefined"
      />

      <!-- Province -->
      <q-input
        v-model="formData.province"
        filled
        label="Province"
        outlined
        hide-bottom-space
        dense
        :readonly="formReadonly"
        :error-message="formError.province"
        :error="formError.province !== undefined"
      />

      <!-- Postal Code -->
      <q-input
        v-model="formData.postal_code"
        filled
        label="Postal Code "
        outlined
        hide-bottom-space
        dense
        :readonly="formReadonly"
        :error-message="formError.postal_code"
        :error="formError.postal_code !== undefined"
      />
    </q-form>
  </div>
</template>