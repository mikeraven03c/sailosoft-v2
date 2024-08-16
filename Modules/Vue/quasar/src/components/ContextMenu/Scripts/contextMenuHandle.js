
export function contextMenuHandle({
  append = [],
  prepend = []
}, hooks) {
  const {
    formHandleHooks = () => { },
    indexHooks = () => { },
  } = hooks;

  function onClick(items, name, row) {
    const itemMenu = items.find((e) => e.name == name)

    itemMenu.onClick(row, { formHandleHooks, indexHooks })
  }

  return {
    onAppendClick: (name, row) => {
      onClick(append, name, row)
    },
    onPrependClick: (name, row) => {
      onClick(prepend, name, row)
    }
  }
}