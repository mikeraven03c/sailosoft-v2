import { Dialog } from "quasar";

export default function DialogHandle() {
  return {
    deleteDialog: (action = () => { }) => Dialog.create({
      title: 'Delete',
      message: 'Are you sure you want to delete the selected record(s)?',
      ok: 'Yes',
      cancel: 'No',
      persistent: true
    }).onOk(() => action()).onCancel(() => { })
  }
}