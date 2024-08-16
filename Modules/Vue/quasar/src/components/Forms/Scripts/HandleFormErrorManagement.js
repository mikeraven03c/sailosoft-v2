import { Notify } from "quasar"
import NotificationHandle from "../../Notifications/Scripts/NotificationHandle"
import UnauthenticatedHandle from "src/components/Authentications/Scripts/UnauthenticatedHandle";


export default function HandleFormErrorManagement() {
  function handleError({
    error,
    formError
  }) {
    const errorNotify = NotificationHandle().errorNotify;
    const { reloadPageUnauthenticated } = UnauthenticatedHandle()
    if (error.response) {
      let response = error.response

      reloadPageUnauthenticated(error)

      if (response.status === 422) {
        let formErrorData = response.data
        const { message, errors } = formErrorTransform(formErrorData)
        formError.value = errors

        errorNotify('Please check the following fields:<br>' + message)
      } else {
        errorNotify(error.response.data.message)
      }
    } else {
      errorNotify('There is error when saving a record.')
      console.error(error)
    }
  }

  function formErrorTransform(errorData) {
    let message = ''
    let errors = {};
    let count = 1
    for (const [key, messages] of Object.entries(errorData)) {
      if (messages.length > 0) {
        let data = messages.join(', ')
        message += '<br> ' + count + '. ' + data
        count++
        errors[key] = data
      }
    }

    return { message, errors }
  }

  return {
    handleError
  }
}

