import { api } from "src/boot/axios"
import { ref } from "vue"

const perPage = 10;

export function selectRenderHooks({
  url = '',
  map = (e) => ({
    label: e.name,
    value: e.id
  }),
  filters = ''
}) {
  const options = ref([])
  const customFilter = {};

  const hooks = {
    resolvedParams: (params) => params,
  }

  const actions = {
    addFilter(filter, value) {
      customFilter[filter] = value
    },
    addFilterAction(callback) {
      callback(actions)
      return selectRender;
    },
  }

  function resolveSearchParams(search = '') {
    const paramsOption = {
      params: {
        search: search,
        per_page: perPage,
      }
    }

    if (filters) {
      const filterObject = filters.split('&').reduce((acc, pair) => {
        const [key, value] = pair.split('=');
        acc[key] = decodeURIComponent(value);

        paramsOption.params[key] = acc[key]
        return acc;
      }, {});
    }

    if (customFilter) {
      for (const [key, item] of Object.entries(customFilter)) {
        paramsOption.params[`filter[${key}]`] = item
      }
    }

    return paramsOption;
  }

  function fetch(
    search = '',
    dataResolve = () => { },
    error = () => { }
  ) {
    const params = hooks.resolvedParams(
      resolveSearchParams(search)
    )

    api.get(url, params).then(({ data }) => {
      dataResolve(data)
    }).catch((error) => {
      console.error(error)
    })
  }
  const selectRender = {
    actions,
    hooks,
    options,
    filterFn(val, update, abort) {
      fetch(val, (data) => {
        update(() => {
          if (data.data) {
            const opt = data.data.map(map)
            options.value = opt
          }
        })
      })
    },
    abortFilter() { }
  }

  return selectRender;
}
