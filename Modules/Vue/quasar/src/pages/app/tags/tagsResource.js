import { columnHandle, resourceHandle } from "src/components/Resources/Scripts/ResourceHandle";
import { resourceListOptions } from "src/pages/resources/resourceList";

export const tagResource = resourceHandle({})
  .setTitle("Tag")
  .setUrl("custom-apps/tags")
  .set('filterOption', {
    options: [{
      label: 'Resource',
      type: 'select',
      options: resourceListOptions(),
      field: 'resource',
    }]
  })
  .setColumns([
    columnHandle().column('resource'),
    columnHandle().column('name'),
    columnHandle().column('description'),
    columnHandle().column('color', null, {
      type: 'color',
    }),
  ])
  .setFormInitialValue({
    resource: '',
    name: '',
    color: '',
    description: ''
  })
  .setFormTemplate(() => import("pages/app/tags/TagsFormTemplate.vue"))
  .get();

