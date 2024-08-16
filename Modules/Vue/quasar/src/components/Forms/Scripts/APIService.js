import { api } from "src/boot/axios";
export default function APIService({
  url
}) {
  const resourceUrl = url;

  function create(
    form,
    options
  ) {
    const {
      resolved = (data) => { },
      errorCatch = (data) => { }
    } = options

    api.post(resourceUrl, form).then(({ data }) => {
      resolved(data)
    }).catch((error) => {
      errorCatch(error)
    })
  }

  function update(
    id,
    form,
    options
  ) {
    const {
      resolved = (data) => { },
      errorCatch = (data) => { }
    } = options

    api.put(resourceUrl + `/${id}`, form).then(({ data }) => {
      resolved(data)
    }).catch((error) => {
      errorCatch(error)
    })
  }

  return {
    create,
    update
  }
}
