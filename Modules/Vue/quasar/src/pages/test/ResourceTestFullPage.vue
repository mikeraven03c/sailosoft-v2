<script setup>
import IndexManagement from "src/components/Index/Scripts/IndexManagement";
import ContextMenu from "components/ContextMenu/ContextMenu.vue";
import IndexMenu from "components/Menu/IndexMenu.vue";
import ResourceTestModal from "pages/test/ResourceTestModal.vue";
import { onMounted } from "vue";
import { FormHandleManagement } from "src/components/Forms/Scripts/FormManagement";

const resource = {
  title: "Organization",
  url: "custom-apps/organizations",
  columns: [
    { name: "id", align: "left", label: "Id", field: "id", sortable: true },
    {
      name: "name",
      align: "left",
      label: "Name",
      field: "name",
      sortable: true,
    },
  ],
  formInitialValues: {
    name: "test",
    label: "test",
  },
};
const { form, onFormNew, onFormEdit, onFormShow } = FormHandleManagement();

const hooks = IndexManagement({
  title: resource.title,
  url: resource.url,
});
const tableRef = hooks.table;
const reference = hooks.reference;
const { deleteRecord, onRequestFetch, resetFetch, refresh } = hooks;
const { selected, filter, loading, tableData, pagination } = reference;

onMounted(() => {
  refresh();
  // hooks.getInitialData({});
});
</script>

<template>
  <div>
    <span class="text-h5 q-pa-sm text-bold">Organizations</span>
    <span>
      <q-table
        flat
        dense
        bordered
        ref="tableRef"
        :title="resource.title"
        :rows="tableData"
        :columns="resource.columns"
        row-key="id"
        v-model:pagination="pagination"
        :loading="loading"
        :filter="filter"
        binary-state-sort
        @request="onRequestFetch"
        v-model:selected="selected"
        selection="multiple"
      >
        <template v-slot:top-left>
          <IndexMenu
            :loading="loading"
            @onNew="onFormNew"
            @onRefresh="refresh"
            @onDelete="deleteRecord(selected)"
          ></IndexMenu>
        </template>
        <template v-slot:top-right>
          <q-input
            borderless
            dense
            debounce="1000"
            v-model="filter"
            placeholder="Search"
          >
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </template>
        <template v-slot:body-cell="props">
          <q-td :props="props">
            {{ props.value }}
          </q-td>
          <!-- Context Menu -->
          <context-menu
            @onEdit="onFormEdit(props.row)"
            @onShow="onFormShow(props.row)"
            @onDelete="deleteRecord(props.row)"
          ></context-menu>
        </template>
      </q-table>
    </span>
    <ResourceTestModal
      ref="form"
      :title="resource.title"
      :url="resource.url"
      :initial-values="resource.formInitialValues"
      @onCreate="resetFetch"
      @onUpdate="refresh"
    ></ResourceTestModal>
  </div>
</template>src/components/Index/Scripts/IndexManagementsrc/components/Forms/Scripts/FormManagement