<?php

namespace Modules\CustomEntity\Filament\Resources\CustomEntityResource\Components;

use Filament\Forms\Set;

use Illuminate\Support\Str;

use Filament\Forms\Components\Select;

use Filament\Forms\Components\Builder;

use Modules\CustomEntity\CustomEntity;
use Filament\Forms\Components\TextInput;

class DefaultBlockColumn
{
    public static function make(): Builder\Block
    {
        return Builder\Block::make(CustomEntity::BLOCK_TYPE_DEFAULT)
            ->schema([
                TextInput::make('column_name')
                    ->label('Column Name')
                    ->required()->live(debounce: 1000)->autocomplete(false)
                    ->afterStateUpdated(fn (Set $set, ?string $state) => $set('label', Str::title($state))),
                TextInput::make('label')
                    ->required(),
                Select::make('data_type')
                    ->label('Data Type')
                    ->options(CustomEntity::DATA_TYPES)
                    ->required(),
                TextInput::make('length')
                    ->label('Length')
                    ->numeric(),
                TextInput::make('default')
                    ->label('default'),
                TextInput::make(CustomEntity::COLUMN_PROPERTY_RULES)
                    ->label('Rules')
            ]);
    }
}
