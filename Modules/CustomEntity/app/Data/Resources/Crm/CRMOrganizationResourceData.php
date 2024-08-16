<?php

namespace Modules\CustomEntity\Data\Resources\Crm;

use Illuminate\Support\Str;
use Modules\CustomEntity\CustomEntity;
use Modules\CustomEntity\Data\CustomEntity\CustomEntityColumnPropertyData;
use Modules\CustomEntity\Data\CustomEntity\CustomEntityDisplayColumnPropertyData;
use Modules\CustomEntity\Data\CustomEntity\CustomEntityPropertyData;
use Modules\CustomEntity\Data\CustomEntityData;

class CRMOrganizationResourceData
implements
    \Modules\CustomEntity\Contracts\CustomAppFactoryInterface,
    \Modules\CustomEntity\Contracts\CustomAppResourceInterface
{
    const resource = 'organization';
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
                rules: 'required|max:25'
            ),
            CustomEntityColumnPropertyData::make()->setData(
                label: 'Label',
                column_name: 'label'
            ),
            CustomEntityColumnPropertyData::make()->setData(
                label: 'Is Show',
                column_name: 'is_show',
                data_type: CustomEntity::DATA_TYPE_BOOLEAN
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

    public static function factory($factory)
    {
        return [
            'name' => fake()->company(),
            'emails' => [fake()->email()],
            'phones' => [fake()->phoneNumber()],
        ];
    }
}
