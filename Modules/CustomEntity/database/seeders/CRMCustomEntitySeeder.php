<?php

namespace Modules\CustomEntity\Database\Seeders;

use Illuminate\Database\Seeder;
use Modules\CustomEntity\CustomEntity;
use Modules\CustomEntity\Data\Resources\Crm\CRMPipelineData;
use Modules\CustomEntity\Data\Resources\Crm\CRMOpportunityData;
use Modules\CustomEntity\Data\Resources\Crm\CRMPipelineStageData;
use Modules\CustomEntity\Data\Resources\Crm\CRMContactResourceData;
use Modules\CustomEntity\Data\Resources\Crm\CRMCustomerResourceData;
use Modules\CustomEntity\Data\Resources\Crm\CRMNoteResourceData;
use Modules\CustomEntity\Data\Resources\Crm\CRMPipelineResourceData;
use Modules\CustomEntity\Data\Resources\Crm\CRMOpportunityResourceData;
use Modules\CustomEntity\Data\Resources\Crm\CRMOrganizationResourceData;
use Modules\CustomEntity\Data\Resources\Crm\CRMPipelineStageResourceData;

class CRMCustomEntitySeeder extends Seeder
{
    /**
     * Run the database seeds.
     * run the following for tenant
     * php artisan tenants:run "module:seed" --argument="module=CustomEntity" --option="class=CRMCustomEntitySeeder"
     */
    public function run(): void
    {
        $customer = (new CRMCustomerResourceData)();
        // CustomEntity::firstOrCreate([
        CustomEntity::updateOrCreate([
            CustomEntity::PROPERTY_SLUG => $customer->slug
        ], $customer->toArray());

        $organization = (new CRMOrganizationResourceData)();
        CustomEntity::firstOrCreate([
            CustomEntity::PROPERTY_SLUG => $organization->slug
        ], $organization->toArray());

        $contact = (new CRMContactResourceData)();
        CustomEntity::firstOrCreate([
            CustomEntity::PROPERTY_SLUG => $contact->slug
        ], $contact->toArray());

        $data = (new CRMPipelineStageResourceData)();
        CustomEntity::updateOrCreate([
            CustomEntity::PROPERTY_SLUG => $data->slug
        ], $data->toArray());

        $data = (new CRMPipelineResourceData)();
        CustomEntity::updateOrCreate([
            CustomEntity::PROPERTY_SLUG => $data->slug
        ], $data->toArray());

        $data = (new CRMOpportunityResourceData)();
        CustomEntity::updateOrCreate([
            CustomEntity::PROPERTY_SLUG => $data->slug
        ], $data->toArray());

        $data = (new CRMNoteResourceData)();
        CustomEntity::updateOrCreate([
            CustomEntity::PROPERTY_SLUG => $data->slug
        ], $data->toArray());
    }
}
