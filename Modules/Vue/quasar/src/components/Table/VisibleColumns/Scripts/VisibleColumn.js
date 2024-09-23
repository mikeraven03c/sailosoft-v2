import { ref } from "vue";
import VisibleColumnMenu from "../VisibleColumnMenu.vue";
const prefix = 'visible-columns';

export function manageVisibleColumns({
  key,
  columns,
  defaultColumns
}) {
  const resourceKey = `${prefix}:${key}:`;

  function getItem() {
    const item = localStorage.getItem(resourceKey);

    return item ? JSON.parse(item) : false;
  }
  function setItem(item) {
    localStorage.setItem(resourceKey, JSON.stringify(item))
  }

  const visibleColumns = {
    selection: ref([]),
    component: () => VisibleColumnMenu,
    value: [],
    displayAll() {
      visibleColumns.update(visibleColumns.value)
    },
    displayDefault() {
      visibleColumns.update(defaultColumns?.length ? defaultColumns : visibleColumns.value)
    },
    update(e) {
      visibleColumns.selection.value = e
      setItem(e)
    },
    calculate() {
      const cols = getItem()
      visibleColumns.value = columns.map((e) => e.name)

      const { selection } = visibleColumns

      if (cols) {
        selection.value = cols;
      } else {
        selection.value = defaultColumns?.length ? defaultColumns : visibleColumns.value
      }
    }
  }

  visibleColumns.calculate()

  return visibleColumns;
}