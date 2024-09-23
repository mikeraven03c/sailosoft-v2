import { ref } from "vue";

export function processFilter(filterOptions) {
  const model = ref({})
  const options = filterOptions?.options ?? []

  for (const [index, option] of options.entries()) {
    model.value[option.field] = null
  }

  const filterHooks = ({ previousParams, hooks }) => {
    const action = {
      updateModel(e) {
        model.value = e
        action.update()
      },
      refresh() {
        hooks.refresh()
      },
      reset() {
        model.value = {}
        hooks.hooksCycle.params.resolvedParams = previousParams;
        hooks.refresh()
      },
      update() {
        hooks.hooksCycle.params.resolvedParams = previousParams;
        if (typeof model.value == 'object') {
          hooks.hooksCycle.params.resolvedParams = (params) => {

            for (const [key, field] of Object.entries(model.value)) {
              if (field) {
                params.params[`filter[${key}]`] = field;
              }
            }

            return params;
          }
        }

        hooks.refresh();
      }
    }

    return action;
  }

  return {
    model: model,
    update(e) {
      model.value = e
    },
    hooks: filterHooks
  }
}


