
<script setup>
import IndexManagement from "src/components/Index/Scripts/IndexManagement";
import ContextMenu from "components/ContextMenu/ContextMenu.vue";
import IndexMenu from "components/Menu/IndexMenu.vue";
import { onMounted } from "vue";
import { FormHandleManagement } from "src/components/Forms/Scripts/FormManagement";
import { contextMenuHandle } from "components/ContextMenu/Scripts/contextMenuHandle";

const {
  title,
  url,
  columns,
  formHandleHooks,
  indexHooks,
  contextMenuOption,
  bodyClass,
} = defineProps({
  title: String,
  url: String,
  columns: {
    type: Array,
    default: () => [
      { name: "id", align: "left", label: "Id", field: "id", sortable: true },
      {
        name: "name",
        align: "left",
        label: "Name",
        field: "name",
        sortable: true,
      },
    ],
  },
  formHandleHooks: {
    type: Object,
    default: () => FormHandleManagement(),
  },
  indexHooks: {
    type: Object,
    default: () => {},
  },
  contextMenuOption: {
    type: Object,
    default: () => ({
      append: [],
      prepend: [],
    }),
  },
  bodyClass: {
    type: String,
    default: "q-pa-md",
  },
});

// FormHandleManagement()
const { form, onFormNew, onFormEdit, onFormShow } = formHandleHooks;

const hooks =
  indexHooks ??
  IndexManagement({
    title: title,
    url: url,
  });

const { onAppendClick, onPrependClick } = contextMenuHandle(
  {
    append: contextMenuOption.append,
    prepend: contextMenuOption.prepend,
  },
  {
    indexHooks: hooks,
    formHandleHooks,
  }
);

const tableRef = hooks.table;
const reference = hooks.reference;
const { deleteRecord, onRequestFetch, resetFetch, refresh } = hooks;
const { selected, filter, loading, tableData, pagination } = reference;
</script>
<template>
  <div :class="bodyClass">
    <!-- <div class="q-pa-md"> -->
    <span class="text-h5 q-pa-sm text-bold">{{ title }}s</span>
    <span>
      <q-table
        flat
        dense
        bordered
        ref="tableRef"
        :title="title"
        :rows="tableData"
        :columns="columns"
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
            :append="contextMenuOption.append"
            :prepend="contextMenuOption.prepend"
            @onAppend="(name) => onAppendClick(name, props.row)"
            @onPrepend="(name) => onPrependClick(name, props.row)"
          ></context-menu>
        </template>
      </q-table>
    </span>
  </div>
</template>src/components/Forms/Scripts/FormManagement