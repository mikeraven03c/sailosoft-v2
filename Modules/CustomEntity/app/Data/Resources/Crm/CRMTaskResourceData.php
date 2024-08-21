<?php

namespace Modules\CustomEntity\Data\Resources\Crm;

use Illuminate\Support\Str;
use Modules\CustomEntity\Data\CustomEntity\CustomEntityPropertyData;
use Modules\CustomEntity\Data\CustomEntity\CustomEntityColumnPropertyData;

class CRMTaskResourceData implements \Modules\CustomEntity\Contracts\CustomAppResourceInterface
{
    const resource = 'task';
    public function __invoke(): CustomEntityPropertyData
    {
        return CustomEntityPropertyData::fromResourceName(self::resource)->setColumns(
            CustomEntityColumnPropertyData::make()->setData(
                label: 'Name',
                column_name: 'name',
            ),
            CustomEntityColumnPropertyData::make()->setData(
                label: 'Resource Type',
                column_name: 'resource_type'
            ),
            CustomEntityColumnPropertyData::make()->setData(
                label: 'Resource Id',
                column_name: 'resource_id'
            ),
        );
    }
}
