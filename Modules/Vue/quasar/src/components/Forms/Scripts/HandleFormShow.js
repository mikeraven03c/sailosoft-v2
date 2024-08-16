import { api } from "src/boot/axios";
import NotificationHandle from "src/components/Notifications/Scripts/NotificationHandle";
import { ref } from "vue";

export default function HandleFormShow({
  url = '',
  resolved = (data) => { }
}) {
  const loading = ref(false)
  const record = ref({})

  return {
    loading,
    record,
    fetch(id) {
      loading.value = true
      api.get(`${url}/${id}`).then(({ data }) => {
        record.value = data
        resolved(data)
      }).catch((error) => {
        const notification = NotificationHandle()
        notification.errorNotify('There is error fetching record.')
        console.error(error)
      }).finally(() => {
        loading.value = false
      })
    }
  }
}