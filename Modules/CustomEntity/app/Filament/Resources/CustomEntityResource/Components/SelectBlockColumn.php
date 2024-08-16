<?php

namespace Modules\CustomEntity\Filament\Resources\CustomEntityResource\Components;

use Filament\Forms\Set;

use Illuminate\Support\Str;

use Filament\Forms\Components\Select;

use Filament\Forms\Components\Builder;

use Filament\Forms\Components\TagsInput;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Modules\CustomEntity\CustomEntity;

class SelectBlockColumn
{
    public static function make(): Builder\Block
    {
        return Builder\Block::make(CustomEntity::BLOCK_TYPE_SELECT)
            ->schema([
                TextInput::make('column_name')
                    ->label('Column Name')
                    ->required()->live(debounce: 1000)->autocomplete(false)
                    ->afterStateUpdated(fn (Set $set, ?string $state) => $set('label', Str::title($state))),
                TextInput::make('label')
                    ->required(),
                Toggle::make('multiple')->default(false),
                TagsInput::make('options')
            ]);
    }
}
