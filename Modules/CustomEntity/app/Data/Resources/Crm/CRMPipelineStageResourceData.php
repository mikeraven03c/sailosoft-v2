<?php

namespace Modules\CustomEntity\Data\Resources\Crm;

use Illuminate\Support\Str;
use Modules\CustomEntity\CustomEntity;
use Modules\CustomEntity\Data\CustomEntityData;
use Modules\CustomEntity\Contracts\CustomAppFactoryInterface;
use Modules\CustomEntity\Contracts\CustomEntityFactoryContract;
use Modules\CustomEntity\Data\CustomEntity\CustomEntityPropertyData;
use Modules\CustomEntity\Data\CustomEntity\CustomEntityColumnPropertyData;
use Modules\CustomEntity\Data\CustomEntity\CustomEntityDisplayColumnPropertyData;

class CRMPipelineStageResourceData
implements
    \Modules\CustomEntity\Contracts\CustomAppFactoryInterface,
    \Modules\CustomEntity\Contracts\CustomAppResourceInterface
{
    const resource = 'pipeline stage';
    public function __invoke(): CustomEntityPropertyData
    {
        $data = (new CustomEntityPropertyData(
            entity: Str::plural(Str::snake(self::resource)),
            name: Str::ucfirst(self::resource),
            slug: Str::slug(self::resource),
            navigation: Str::plural(Str::kebab(self::resource)),
        ))->setColumns(
            CustomEntityColumnPropertyData::make()->setData(
                label: 'Name',
                column_name: 'name',
                rules: 'required|max:100'
            ),
            CustomEntityColumnPropertyData::make()->setData(
                label: 'Pipeline ID',
                column_name: 'pipeline_id',
                data_type: CustomEntity::DATA_TYPE_INTEGER,
                rules: 'required|integer'
            ),
            CustomEntityColumnPropertyData::make()->setData(
                label: 'Pipeline',
                column_name: 'pipeline',
                rules: 'required'
            ),
            CustomEntityColumnPropertyData::make()->setData(
                label: 'Description',
                column_name: 'description'
            ),
            CustomEntityColumnPropertyData::make()->setData(
                label: 'Is Active',
                column_name: 'is_active',
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

    public static function factory(CustomEntityFactoryContract $factory)
    {
        $newFactory = $factory->newInstance();
        $newFactory->initializeByResourceData(CRMPipelineResourceData::class);
        $pipeline = $newFactory->inRandomOrGenerate();

        $map = [
            ['name' => 'Prospecting', 'description' => 'Identifying potential customers'],
            ['name' => 'Qualification', 'description' => 'Assessing potential customers\' needs and fit'],
            ['name' => 'Proposal', 'description' => 'Creating and presenting a solution'],
            ['name' => 'Negotiation', 'description' => 'Discussing terms and conditions'],
            ['name' => 'Closing', 'description' => 'Finalizing the deal']
        ];
        $rand = fake()->rand(0, count($map) - 1);
        return [
            'name' => $map[$rand]['name'],
            'description' => $map[$rand]['description'],
            'pipeline_id' => $pipeline->id,
            'is_active' => true,
        ];
    }
}
