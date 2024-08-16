<?php

namespace Modules\CustomEntity\Data\Resources\Crm;

use Illuminate\Support\Str;
use Modules\CustomEntity\Contracts\CustomAppFactoryInterface;
use Modules\CustomEntity\Contracts\CustomAppResourceInterface;
use Modules\CustomEntity\CustomApp;
use Modules\CustomEntity\CustomEntity;
use Modules\CustomEntity\Data\CustomEntity\CustomEntityColumnPropertyData;
use Modules\CustomEntity\Data\CustomEntity\CustomEntityDisplayColumnPropertyData;
use Modules\CustomEntity\Data\CustomEntity\CustomEntityPropertyData;
use Modules\CustomEntity\Data\CustomEntityData;

class CRMCustomerResourceData
implements
    \Modules\CustomEntity\Contracts\CustomAppFactoryInterface,
    \Modules\CustomEntity\Contracts\CustomAppResourceInterface
{
    const resource = 'customer';
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
                rules: 'required'
            ),
            CustomEntityColumnPropertyData::make()->setData(
                label: 'Description',
                column_name: 'description'
            ),
            CustomEntityColumnPropertyData::make()->setData(
                label: 'Email',
                column_name: 'email',
            ),
            CustomEntityColumnPropertyData::make()->setData(
                label: 'Phone Number',
                column_name: 'phone_number'
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

    public static function factory($options = [])
    {

        return [
            'name' => fake()->name(),
            'emails' => [fake()->email()],
            'phones' => [fake()->phoneNumber()],
        ];
    }
}
