import { columnHandle, resourceHandle } from "src/components/Resources/Scripts/ResourceHandle";

export const productResource = resourceHandle({})
  .setTitle("Product")
  .setUrl("custom-apps/products")
  .setColumns([
    columnHandle().column('name'),
    columnHandle().column('price'),
  ])
  .setFormInitialValue({
    name: '',
    description: ''
  })
  .setFormTemplate(() => import("pages/app/products/ProductFormTemplate.vue"))
  .get();

