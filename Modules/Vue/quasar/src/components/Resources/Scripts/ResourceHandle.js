
export function columnHandle() {
  const column = {
    value: {
      name: '',
      align: 'left',
      label: '',
      field: '',
      sortable: true
    },
    set: (field, label = undefined, property = {}) => {
      column.value.label = label ? label : titleCase(field);
      column.value.field = field;
      column.value.name = field;
      column.value = { ...column.value, ...property }


      return column
    },
    setProperty: (property) => {
      column.value = {
        ...column.value,
        ...property
      }

      return column
    },
    column: (field, label = undefined, property = {}) => {
      column.set(field, label, property)
      return column.value
    },
    get: () => column.value,
  }

  return column;
}

export function resourceHandle(options = {}) {
  const {
    title = '',
    url = ''
  } = options
  const resource = {
    value: {
      title: title,
      url: url,
      columns: [],
      formStyle: "width: 600px; max-width:90vw;",
      formInitialValues: {},
      formTemplate: () => { }
    },
    set(field, value) {
      resource.value[field] = value;
      return resource
    },
    setTitle: (title) => {
      resource.value.title = title
      return resource
    },
    setUrl: (url) => {
      resource.value.url = url
      return resource
    },
    setFormTemplate: (template) => {
      resource.value.formTemplate = template
      return resource
    },
    setFormInitialValue: (form) => {
      resource.value.formInitialValues = form
      return resource
    },
    addColumn: (field, label = '', property = {}) => {
      resource.value.columns.push(
        columnHandle().set(field, label, property).get()
      )
      return resource
    },
    setColumns: (columns) => {
      resource.value.columns = columns
      return resource
    },

    get: () => resource.value
  }

  return resource;
}

const titleCase = (s) =>
  s.replace(/^_*(.)|_+(.)/g, (s, c, d) => c ? c.toUpperCase() : ' ' + d.toUpperCase())