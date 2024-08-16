export function sequeceInputHooks(formData, key = '', initialValue = '') {
  if (typeof formData.value[key] === 'undefined') {
    formData.value[key] = ['']
  }

  function add() {
    formData.value[key].push(initialValue)
  }

  function remove(index) {
    formData.value[key].splice(index, 1)
  }

  function isDisplayAdd(index) {
    return index === formData.value[key].length - 1
  }

  function isDisplayRemove(index) {
    return index === formData.value[key].length - 1 && formData.value[key].length > 1
  }

  return {
    add,
    remove,
    isDisplayAdd,
    isDisplayRemove
  }
}