<?php

namespace Modules\CustomEntity\Data\Resources\Crm;

use Illuminate\Support\Str;
use Modules\CustomEntity\Data\CustomEntity\CustomEntityPropertyData;
use Modules\CustomEntity\Data\CustomEntity\CustomEntityColumnPropertyData;
use Modules\CustomEntity\Data\CustomEntity\CustomEntityDisplayColumnPropertyData;

class CRMNoteResourceData
{
    const resource = 'note';
    public function __invoke(): CustomEntityPropertyData
    {
        $data = (new CustomEntityPropertyData(
            entity: Str::plural(self::resource),
            name: Str::ucfirst(self::resource),
            slug: Str::slug(self::resource),
            navigation: Str::plural(Str::kebab(self::resource)),
        ))->setColumns(
            CustomEntityColumnPropertyData::make()->setData(
                label: 'Name',
                column_name: 'name',
                // rules: 'required'
            ),
            CustomEntityColumnPropertyData::make()->setData(
                label: 'Note',
                column_name: 'note'
            ),
            CustomEntityColumnPropertyData::make()->setData(
                label: 'Date',
                column_name: 'date',
            ),
            CustomEntityColumnPropertyData::make()->setData(
                label: 'Resource Type',
                column_name: 'resource_type'
            ),
            CustomEntityColumnPropertyData::make()->setData(
                label: 'Resource Id',
                column_name: 'resource_id'
            ),
        )->setDisplayColumns(
            CustomEntityDisplayColumnPropertyData::make()->setData(
                label: 'Id',
                column_name: 'id'
            ),
            CustomEntityDisplayColumnPropertyData::make()->setData(
                label: 'Name',
                column_name: 'name'
            ),
        );

        return $data;
    }
}
