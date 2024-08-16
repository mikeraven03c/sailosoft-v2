<script setup>
import IndexManagement from "src/components/Index/Scripts/IndexManagement";
import FormManagement, {
  FormHandleManagement,
} from "components/Forms/Scripts/FormManagement";
import IndexMenu from "components/Menu/IndexMenu.vue";
import ContextMenu from "components/ContextMenu/ContextMenu.vue";
import { onMounted } from "vue";
import ResourceTestModal from "pages/test/ResourceTestModal.vue";

const resource = {
  title: "Contacts",
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
};
const hooks = IndexManagement({
  title: resource.title,
  url: resource.url,
});

const formHooks = FormManagement({
  title: resource.title,
  url: resource.url,
});

const { form, onFormNew, onFormEdit, onFormShow } = FormHandleManagement();

const tableRef = hooks.table;
const reference = hooks.reference;
const { selected, filter, loading, tableData, pagination } = reference;
const { deleteRecord, resetFetch } = hooks;

function onRequest(props) {
  Object.assign(pagination.value, props.pagination);

  hooks.refetch({
    emit: (data) => {
      Object.assign(pagination.value, {
        page: data.current_page,
        rowsPerPage: data.per_page,
        rowsNumber: data.total,
      });
    },
  });
}

function fetch() {
  tableRef.value.requestServerInteraction();
}

onMounted(() => {
  fetch();
});
</script>

<template>
  <div>
    <span>Test</span>
    <span>
      <q-table
        flat
        dense
        bordered
        ref="tableRef"
        title="Contacts"
        :rows="tableData"
        :columns="resource.columns"
        row-key="id"
        v-model:pagination="pagination"
        :loading="loading"
        :filter="filter"
        binary-state-sort
        @request="onRequest"
      >
        <template v-slot:top-left>
          <IndexMenu
            :loading="loading"
            @onNew="onFormNew"
            @onRefresh="fetch"
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
        <!-- Body Cell -->
        <template v-slot:body-cell="props">
          <q-td :props="props">
            {{ props.value }}
          </q-td>
          <!-- Context Menu -->
          <context-menu
            @onEdit="onFormEdit(props.row)"
            @onDelete="deleteRecord(props.row)"
            @onShow="onFormShow(props.row)"
          ></context-menu>
        </template>
      </q-table>
    </span>
    <ResourceTestModal
      ref="form"
      title="Contact"
      @onCreate="resetFetch"
      @onUpdate="fetch"
    ></ResourceTestModal>
  </div>
</template>src/components/Index/Scripts/IndexManagementsrc/components/Forms/Scripts/FormManagement