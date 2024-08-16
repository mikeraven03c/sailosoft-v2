<?php

namespace Modules\CustomEntity\Filament\Resources\CustomEntityResource\Actions;

use Filament\Tables\Actions\BulkAction;
use Illuminate\Database\Eloquent\Model;
use Modules\CustomEntity\Services\CustomEntityDatabaseService;

class CreateTableFilamentBulkAction extends BulkAction
{
    protected function setUp(): void
    {
        parent::setUp();

        $this->name('Create Bulk Table');

        $this->requiresConfirmation();


        $this->action(function () {
            $customEntityDatabaseService = app(CustomEntityDatabaseService::class);

            $customEntityDatabaseService->createCustomEntityTables();

            $this->success();
        });
    }
}
