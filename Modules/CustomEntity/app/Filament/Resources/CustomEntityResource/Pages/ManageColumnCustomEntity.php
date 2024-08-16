<?php

namespace Modules\CustomEntity\Filament\Resources\CustomEntityResource\Pages;

use Filament\Resources\Pages\EditRecord;
use Filament\Forms\Form;
use Filament\Forms\Components\Builder;
use Modules\CustomEntity\Filament\Resources\CustomEntityResource\Components\DefaultDisplayBlockColumn;

class ManageColumnCustomEntity extends EditRecord
{
    protected static string $navigateIcon = 'heroicon-o-pencil-square';
    protected static string $resource = \Modules\CustomEntity\Filament\Resources\CustomEntityResource::class;

    public function form(Form $form): Form
    {
        return $form->schema([
            Builder::make('display_columns')
            ->blocks([
                DefaultDisplayBlockColumn::make($this->record)
            ])
        ]);
    }
}
