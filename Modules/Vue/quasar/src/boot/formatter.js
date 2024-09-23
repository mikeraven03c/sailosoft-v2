import { date } from 'quasar'
import { boot } from 'quasar/wrappers'

const dateFormat = (dateInput, format = 'MMM DD YYYY') => {
  const myDate = new Date(Date.parse(dateInput));

  const dateString = date.formatDate(myDate, format);
  return dateString
}
export default boot(({ app }) => {
  app.config.globalProperties.$dateFormat = dateFormat
})

export { dateFormat }