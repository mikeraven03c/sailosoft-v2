<?php

namespace Modules\CustomEntity\Filament\Resources\CustomEntityResource\Actions;

use Filament\Tables\Actions\Action;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Schema\Blueprint;
use Filament\Actions\Concerns\CanCustomizeProcess;
use Modules\CustomEntity\Services\CustomEntityDatabaseService;

class CreateTableFilamentAction extends Action
{
    use CanCustomizeProcess;

    protected function setUp(): void
    {
        parent::setUp();

        $this->name('Create Table');

        $this->requiresConfirmation();

        $this->action(function () {
            $result = $this->process(function (Model $record) {
                $customEntityDatabaseService = app(CustomEntityDatabaseService::class);
                $customEntityDatabaseService->buildSchema($record);
            });

            if (! $result) {
                $this->failure();

                return;
            }

            $this->success();
        });
    }
}
