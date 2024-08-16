<?php

namespace Modules\CustomEntity\Data\Resources\Crm;

use Illuminate\Support\Str;
use Modules\CustomEntity\Contracts\CustomEntityFactoryContract;
use Modules\CustomEntity\CustomEntity;
use Modules\CustomEntity\Data\CustomEntity\CustomEntityColumnPropertyData;
use Modules\CustomEntity\Data\CustomEntity\CustomEntityDisplayColumnPropertyData;
use Modules\CustomEntity\Data\CustomEntity\CustomEntityPropertyData;
use Modules\CustomEntity\Data\CustomEntityData;

class CRMOpportunityResourceData
implements
    \Modules\CustomEntity\Contracts\CustomAppFactoryInterface,
    \Modules\CustomEntity\Contracts\CustomAppResourceInterface
{
    const resource = 'opportunity';
    public function __invoke(): CustomEntityPropertyData
    {
        $data = (new CustomEntityPropertyData(
            entity: Str::plural(self::resource),
            name: Str::ucfirst(self::resource),
            slug: Str::slug(self::resource),
            navigation: Str::plural(Str::kebab(self::resource)),
        ))->setColumns(
            CustomEntityColumnPropertyData::make()->setData(
                label: 'Title',
                column_name: 'title',
                rules: 'required|max:25'
            ),
            CustomEntityColumnPropertyData::make()->setData(
                label: 'Value',
                column_name: 'value'
            ),
            CustomEntityColumnPropertyData::make()->setData(
                label: 'Is lead',
                column_name: 'is_lead',
                data_type: CustomEntity::DATA_TYPE_BOOLEAN
            ),
            CustomEntityColumnPropertyData::make()->setData(
                label: 'Label',
                column_name: 'label'
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
        $label = ['Hot', 'Warm', 'Cold'];
        $leadSources = array(
            'Website',
            'Social Media',
            'Email Marketing',
            'Referral',
            'Trade Shows',
            'Partnerships',
            'Advertising',
            'Cold Calling',
            'Direct Mail',
            'Search Engines',
            'Online Directories',
            'Other'
        );

        $contact = $factory
            ->newInstance()
            ->initializeByResourceData(CRMContactResourceData::class)
            ->inRandomOrGenerate();

        $organization = $factory
            ->newInstance()
            ->initializeByResourceData(CRMOrganizationResourceData::class)
            ->inRandomOrGenerate();

        $pipeline = $factory
            ->newInstance()
            ->initializeByResourceData(CRMPipelineResourceData::class)
            ->inRandomOrGenerate();

        $pipelineStage = $factory
            ->newInstance()
            ->initializeByResourceData(CRMPipelineStageResourceData::class)
            ->inRandomOrGenerate();

        return [
            'is_lead' => false,
            'title' => fake()->bothify('Lead ####') . ': ' . $contact->name,
            'contact' => [
                'label' => $contact->name,
                'value' => $contact->id
            ],
            'contact_id' => $contact->id,
            'organization' => [
                'label' => $organization->name,
                'value' => $organization->id
            ],
            'organization_id' => $organization->id,
            'value' => fake()->numberBetween(50, 1000),
            'pipeline' => [
                'label' => $pipeline->name,
                'value' => $pipeline->id
            ],
            'pipeline_id' => $pipeline->id,
            'pipeline_stage' => [
                'label' => $pipelineStage->name,
                'value' => $pipelineStage->id
            ],
            'pipeline_stage_id' => $pipelineStage->id,
            'label' => fake()->randomElement($label),
            'source' => fake()->randomElement($leadSources)
        ];
    }
}
