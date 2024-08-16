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

  const hooks = {
    resolvedParams: (params) => params
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

    // console.log(params)

    api.get(url, params).then(({ data }) => {
      dataResolve(data)
    }).catch((error) => {
      error()
    })
  }
  return {
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
}
