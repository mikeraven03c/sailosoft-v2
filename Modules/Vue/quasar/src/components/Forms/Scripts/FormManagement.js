import { ref } from "vue"
import { api } from "src/boot/axios";
import HandleFormErrorManagement from "./HandleFormErrorManagement";
import NotificationHandle from "src/components/Notifications/Scripts/NotificationHandle";

export const MODE_NEW = 'new';
export const MODE_EDIT = 'edit';
export const MODE_SHOW = 'show';

export const FORM_ON_CREATE = 'onCreate';
export const FORM_ON_UPDATE = 'onUpdate';

export const formEmit = [FORM_ON_CREATE, FORM_ON_UPDATE];

export default function FormManagement({
  title,
  url,
  initialValues = {}
}) {
  /** @var component */
  const form = ref()
  /** @var boolean */
  const formProcessing = ref(false)
  const formShow = ref(false)
  const formReadonly = ref(false)

  /** @var object */
  const formData = ref({})
  const formDefaultData = ref({})
  const formError = ref({})

  /** @var formMode */
  const formMode = ref(MODE_NEW)

  // const formEmit = ["onCreate", "onUpdate"]

  const notification = NotificationHandle();

  const actions = {
    formProcessing: {
      start: () => formProcessing.value = true,
      stop: () => formProcessing.value = false
    },
    formMode: {
      isCreate: () => formMode.value == MODE_NEW,
      isUpdate: () => formMode.value == MODE_EDIT,
      isShow: () => formMode.value == MODE_SHOW
    },
    form: {
      create: createForm,
      edit: editForm,
      show: showForm
    },
    formData: {
      update: (data) => formData.value = clone(data)
    }
  }

  const hooksCycle = {
    beforeOpenForm: (fields) => fields,
    beforeCreate: (fields) => fields,
    beforeUpdate: (fields) => fields,
    afterResolve: (fields) => fields,
    afterCreate: (data) => { },
    afterUpdate: (data) => { },
    resolveCreate: (data) => { },
    resolveUpdate: (data) => { },
  }

  const reference = {
    form,
    formShow,
    formReadonly,
    formData,
    formProcessing,
    formError,
    formMode,
    formEmit,
    formDefaultData,
  }

  function onCreate(option = {}) {
    const {
      emit = (data) => { },
      token
    } = option

    if (!isProcessing()) {
      actions.formProcessing.start()

      const fields = formValue();
      const resolveFields = resolveFormFields({
        mode: MODE_NEW,
        fields: fields
      })

      api.post(url, resolveFields).then(({ data }) => {
        emit(data)
        hooksCycle.afterCreate(data)
        notification.saveNotify({
          mode: 'Created',
          title: title
        })

        formShow.value = false;
        actions.formProcessing.stop()

        hooksCycle.resolveCreate(data)
      }).catch((error) => {
        const errorHandle = HandleFormErrorManagement();

        errorHandle.handleError({
          error: error,
          formError,
          formProcessing
        })
        // formShow.value = false;
        actions.formProcessing.stop()
      })
    } else {
      console.info('Can not process')
    }
  }

  function onUpdate(option = {}) {
    const {
      emit = (data) => { },
      id = null
    } = option

    if (isProcessing()) {
      console.info('Can not process')
      return;
    }
    actions.formProcessing.start()
    const fields = formData.value
    const resolveFields = resolveFormFields({
      mode: MODE_NEW,
      fields: fields
    })
    api.put(url + '/' + (id ? id : formData.value.id), resolveFields).then(({ data }) => {
      emit(data)
      hooksCycle.afterUpdate(data)
      notification.saveNotify({
        mode: 'Saved',
        title: title
      })

      formShow.value = false
      actions.formProcessing.stop()

      hooksCycle.resolveUpdate(data)

    }).catch((error) => {
      const errorHandle = HandleFormErrorManagement();

      errorHandle.handleError({
        error: error,
        formError,
        formProcessing
      })
      // formShow.value = false;
      actions.formProcessing.stop()
      // afterCatch(error)
    })
  }

  function formValue() {
    return formData.value
  }

  function isProcessing() {
    return formProcessing.value
  }

  function resolveFormFields({
    mode = MODE_NEW,
    fields = {}
  }) {
    let unresolveFields = fields
    if (mode == MODE_NEW) {
      unresolveFields = hooksCycle.beforeCreate(fields)
    } else {
      unresolveFields = hooksCycle.beforeUpdate(fields)
    }

    return hooksCycle.afterResolve(unresolveFields)
  }

  function createForm() {
    formMode.value = "new";
    formData.value = clone(initialValues)
    formReadonly.value = false;
    resetForm()
  }

  function editForm(data) {
    resetForm()
    formMode.value = "edit"
    formReadonly.value = false
    formData.value = hooksCycle.beforeOpenForm(
      resolveForm(data)
    )
  }

  function showForm(data) {
    resetForm()
    formMode.value = "show"
    formReadonly.value = true
    formData.value = hooksCycle.beforeOpenForm(
      resolveForm(data)
    )
  }

  function resetForm() {
    formError.value = {}
    formShow.value = true;
    formProcessing.value = false
  }

  function resolveForm(data) {
    const obj = { ...initialValues, ...clone(data) }
    return obj
  }

  function handleFormEmit(contextEmit) {
    function onFormCreate(options = {}) {
      onCreate(configureOptions(FORM_ON_CREATE, options));
    }

    function onFormUpdate(options = {}) {
      onUpdate(configureOptions(FORM_ON_UPDATE, options));
    }

    function configureOptions(mode, options) {
      return {
        ...options,
        emit: (data) => {
          (options.emit || (() => { }))(data);
          contextEmit(mode, data);
        },
      };
    }

    return {
      onFormCreate,
      onFormUpdate
    }
  }

  function clone(data) {
    return JSON.parse(JSON.stringify(data));
  }


  function exposeFormFunction() {
    return {
      create: createForm,
      edit: editForm,
      show: showForm,
    }
  }

  const exposedFormFunction = {
    create: createForm,
    edit: editForm,
    show: showForm,
  }

  return {
    ...reference,
    reference,
    exposedFormFunction,
    hooksCycle,
    actions,
    getActions: () => actions,
    onCreate,
    onUpdate,
    exposeFormFunction,
    handleFormEmit,
  }
}

export function FormHandleManagement() {

  /** @var component */
  const form = ref()

  return {
    form,
    onFormNew: () => form.value.create(),
    onFormEdit: (data) => form.value.edit(data),
    onFormShow: (data) => form.value.show(data)
  }
}
