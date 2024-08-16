import { api } from "src/boot/axios"
import { ref } from "vue"
import NotificationHandle from "components/Notifications/Scripts/NotificationHandle"
import DialogHandle from "components/Dialogs/Scripts/DialogHandle"

export const INDEX_PAGINATED = 'paginated';
export const INDEX_ALL = 'fetch_all';

const initialPagination = {
  sortBy: 'id',
  descending: true,
  page: 1,
  rowsPerPage: 10,
  rowsNumber: 10
};

export default function IndexManagement({
  title = '',
  url = '',
  conditions = ''
}) {
  const table = ref();
  const selected = ref([])
  const filter = ref("")
  const loading = ref(false)
  const tableData = ref([])
  const path = ref(url)
  const pagination = ref(initialPagination)

  const reference = {
    path,
    selected,
    filter,
    loading,
    tableData,
    pagination
  }

  const actions = {
    loading: {
      start: () => loading.value = true,
      stop: () => loading.value = false
    },
    pagination: {
      update: (property) => {
        Object.assign(pagination.value, property)
      }
    }
  }

  const hooksCycle = {
    params: {
      beforeInitial: (params) => params,
      beforeRefetch: (params) => params,
      resolvedParams: (params) => params
    }
  }

  const { errorIndexNotify, saveNotify } = NotificationHandle();
  const { deleteDialog } = DialogHandle()

  function getInitialData({
    mode = INDEX_PAGINATED,
    emit = (data) => { },

  }) {
    loading.value = true;

    const params = {
      params: {}
    }

    if (conditions) {
      getFilterParameter(conditions, (key, value) => {
        params.params[key] = value
      })
    }

    const resolvedParams = hooksCycle.params.resolvedParams(
      hooksCycle.params.beforeInitial(params)
    )

    api.get(url, resolvedParams).then(({ data }) => {
      tableData.value = data.data
      emit(data)
    }).catch((error) => {
      console.error(error)
      errorIndexNotify();
    }).finally(() => {
      loading.value = false
    })
  }

  function refetch({
    mode = INDEX_PAGINATED,
    emit = (data) => { },
  }) {
    const queryParams = resolvePaginationParams({
      mode: mode,
      pagination: pagination.value,
      search: filter.value,
      filters: conditions
    })

    const resolvedParams = hooksCycle.params.resolvedParams(
      hooksCycle.params.beforeRefetch(queryParams)
    )

    actions.loading.start()
    api.get(url, resolvedParams).then(({ data }) => {
      tableData.value = data.data
      actions.pagination.update(
        {
          page: data.current_page,
          rowsPerPage: data.per_page,
          rowsNumber: data.total,
        }
      )
      emit(data)
    }).catch((error) => {
      console.error(error)
      errorIndexNotify();
    }).finally(() => {
      actions.loading.stop()
    })
  }

  function deleteRecord(data) {
    const id = resolveId(data)

    const deleteAction = () => {
      actions.loading.start()
      api.delete(url + '/' + id).then(({ data }) => {
        selected.value = []
        refresh()
        saveNotify({
          mode: 'Deleted',
          title: title
        })
      }).catch((error) => {
      })
    }

    if (id) {
      deleteDialog(deleteAction)
    }
  }

  function onRequestFetch(props) {
    actions.pagination.update(props.pagination)

    refresh()
  }

  function resetFetch() {
    resetPagination()
    refresh()
  }

  function refresh() {
    refetch({})
  }

  function tableRequest() {
    table.value.requestServerInteraction();
  }

  function resetPagination() {
    Object.assign(pagination.value, {
      page: 1,
      sortBy: "id",
      descending: true,
    });
  }

  function resolvePaginationParams({
    mode = INDEX_PAGINATED,
    pagination = initialPagination,
    search = '',
    filters = ''
  }) {
    switch (mode) {
      case INDEX_PAGINATED:
        const params = {
          params: {
            page: pagination.page,
            per_page: pagination.rowsPerPage
          }
        }

        search && (params.params.search = search)

        if (pagination.sortBy) {
          params.params.sort = `${pagination.descending ? '-' : ''}${pagination.sortBy}`;
        }

        if (filters) {
          getFilterParameter(filters, (key, value) => {
            params.params[key] = value
          })
        }

        return params;
      case INDEX_ALL: return {}
      default: return {}
    }
  }

  function resolveId(data) {
    if (data === null) {
      return false;
    }

    if (Array.isArray(data)) {
      const firstItem = data[0];
      if (typeof firstItem === 'object' && firstItem !== null && 'id' in firstItem) {
        return data.map(item => item.id).join(',');
      } else {
        return data.join(',')
      }
    } else if (typeof data === 'object' && data !== null && 'id' in data) {
      return data.id;
    } else if (typeof data === 'number' || (typeof data === 'string' && /\d/.test(data))) {
      return data;
    } else {
      return false;
    }
  }

  function isRequestPaginated(mode) {
    return mode == INDEX_PAGINATED;
  }

  function getFilterParameter(filters, map = (key, value) => { }) {
    return filters.split('&').reduce((acc, pair) => {
      const [key, value] = pair.split('=');;
      map(key, decodeURIComponent(value))
      return acc;
    }, {});
  }

  /** @for INDEX_ALL */
  function removeRecordsFromTableData(ids) {
    for (let i in ids) {
      let index = tableData.value.findIndex((e) => e.id === ids[i]);
      if (index > -1) {
        tableData.value.splice(index, 1);
      }
    }
  }

  return {
    // reference hooks
    ...reference,
    // Others
    table,
    initialPagination,
    reference,
    hooksCycle,
    // Methods
    getInitialData,
    refetch,
    resetFetch,
    deleteRecord,
    resetPagination,
    refresh,
    onRequestFetch,
  }
}