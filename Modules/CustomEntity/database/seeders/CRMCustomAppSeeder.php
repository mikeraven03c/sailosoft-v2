<?php

namespace Modules\CustomEntity\Database\Seeders;

use Illuminate\Database\Seeder;
use Modules\CustomEntity\Services\CustomEntityFactoryService;
use Modules\CustomEntity\Data\Resources\Crm\CRMContactResourceData;
use Modules\CustomEntity\Data\Resources\Crm\CRMOpportunityResourceData;
use Modules\CustomEntity\Data\Resources\Crm\CRMPipelineResourceData;
use Modules\CustomEntity\Data\Resources\Crm\CRMOrganizationResourceData;
use Modules\CustomEntity\Data\Resources\Crm\CRMPipelineStageResourceData;

class CRMCustomAppSeeder extends Seeder
{
    public function __construct(
        public CustomEntityFactoryService $factory
    ) {}
    /**
     * Run the database seeds.
     * run the following for tenant
     * php artisan tenants:run "module:seed" --argument="module=CustomEntity" --option="class=CRMCustomAppSeeder"
     */
    public function run(): void
    {
        $this->factory
            ->newInstance()
            ->initializeByResourceData(CRMOrganizationResourceData::class)
            ->setCount(30)
            ->create();

        $this->factory
            ->newInstance()
            ->initializeByResourceData(CRMContactResourceData::class)
            ->setCount(30)
            ->create();

        $pipeline = $this->factory
            ->newInstance()
            ->initializeByResourceData(CRMPipelineResourceData::class)
            ->customApp()->firstOrCreate([
                'data->name' => 'Pipeline'
            ], [
                'name' => 'Pipeline',
                'is_active' => true,
                'description' => 'pipeline'
            ]);

        $pipelineStage = $this->factory
            ->newInstance()
            ->initializeByResourceData(CRMPipelineStageResourceData::class)
            ->customApp();

        $pipelineStages = [
            ['name' => 'Prospecting', 'description' => 'Identifying potential customers'],
            ['name' => 'Qualification', 'description' => 'Assessing potential customers\' needs and fit'],
            ['name' => 'Proposal', 'description' => 'Creating and presenting a solution'],
            ['name' => 'Negotiation', 'description' => 'Discussing terms and conditions'],
            ['name' => 'Closing', 'description' => 'Finalizing the deal'],
        ];

        $pipelineId = $pipeline->id; // Replace with actual pipeline ID

        foreach ($pipelineStages as $stage) {
            $pipelineStage->firstOrCreate([
                'data->name' => $stage['name'],
                'data->pipeline_id' => $pipelineId
            ], [
                'description' => $stage['description'],
                'name' => $stage['name'],
                'pipeline_id' => $pipelineId
            ]);
        }

        $this->factory
            ->newInstance()
            ->initializeByResourceData(CRMOpportunityResourceData::class)
            ->setPayload([
                'is_lead' => true
            ])
            ->setCount(20)
            ->create();

        $this->factory
            ->newInstance()
            ->initializeByResourceData(CRMOpportunityResourceData::class)
            ->setPayload([
                'is_lead' => false
            ])
            ->setCount(20)
            ->create();
    }
}
