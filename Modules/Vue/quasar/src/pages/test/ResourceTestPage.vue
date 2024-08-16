 <script setup>
import IndexManagement from "src/components/Index/Scripts/IndexManagement";
import { onMounted } from "vue";

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
const tableRef = hooks.table;
const reference = hooks.reference;
const { selected, filter, loading, tableData, pagination } = reference;
console.log(hooks.reference);

function onRequest(props) {
  console.log(props);
  Object.assign(pagination.value, props.pagination);

  hooks.refetch({
    emit: (data) => {
      console.log(data);
      Object.assign(pagination.value, {
        page: data.current_page,
        rowsPerPage: data.per_page,
        rowsNumber: data.total,
      });
    },
  });
}

onMounted(() => {
  tableRef.value.requestServerInteraction();
  // hooks.getInitialData({});
});
console.log(hooks.reference);
</script>

<template>
  <div>
    <span>Test</span>
    <span>
      <q-table
        flat
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
      </q-table>
    </span>
  </div>
</template>src/components/Index/Scripts/IndexManagement