import { Notify } from "quasar";

export default function NotificationHandle() {
  function notifyPositive(message) {
    Notify.create({
      message: message,
      icon: 'done',
      color: 'positive',
      position: 'bottom-right',
      timeout: 1500,
    })
  }

  function saveNotify({ mode = '', title = '' }) {
    Notify.create({
      message: title + ' ' + mode,
      icon: 'done',
      color: 'positive',
      position: 'top-right',
      timeout: 1500,
    })
  }

  function errorNotify(message = 'There is error on the form') {
    Notify.create({
      color: 'negative',
      message: message,
      position: 'top-right',
      html: true,
      timeout: 3500,
      actions: [{ icon: 'close', color: 'white' }]
    })
  }

  function errorIndexNotify() {
    Notify.create({
      color: "negative",
      position: "top",
      message: "Loading failed",
      icon: "report_problem",
    })
  }

  return {
    saveNotify,
    errorNotify,
    errorIndexNotify,
    notifyPositive
  }
}