<?php

namespace Modules\CustomEntity\Filament\Imports;

use App\Models\CustomEntity;
use Filament\Actions\Imports\ImportColumn;
use Filament\Actions\Imports\Importer;
use Filament\Actions\Imports\Models\Import;

class CustomEntityImporter extends Importer
{
    protected static ?string $model = \Modules\CustomEntity\CustomEntity::class;

    public static function getColumns(): array
    {
        return [
            ImportColumn::make('name'),
            ImportColumn::make('data'),
            ImportColumn::make('entity'),
            ImportColumn::make('navigation'),
            ImportColumn::make('columns'),
        ];
    }

    public function resolveRecord(): ?\Modules\CustomEntity\CustomEntity
    {
        return \Modules\CustomEntity\CustomEntity::firstOrNew([
            'name' => $this->data['name'],
        ]);

        return new \Modules\CustomEntity\CustomEntity();
    }

    public static function getCompletedNotificationBody(Import $import): string
    {
        $body = 'Your custom entity import has completed and ' . number_format($import->successful_rows) . ' ' . str('row')->plural($import->successful_rows) . ' imported.';

        if ($failedRowsCount = $import->getFailedRowsCount()) {
            $body .= ' ' . number_format($failedRowsCount) . ' ' . str('row')->plural($failedRowsCount) . ' failed to import.';
        }

        return $body;
    }

    public function getJobQueue(): ?string
    {
        return 'sync';
    }
}
