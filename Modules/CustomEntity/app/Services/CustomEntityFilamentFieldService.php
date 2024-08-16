<?php

namespace Modules\CustomEntity\Services;

use Filament\Tables\Columns\TextColumn;
use Modules\CustomEntity\CustomEntity;
use Modules\CustomEntity\Filament\CustomFields\Data\CustomComponentData;
use Modules\CustomEntity\Filament\CustomFields\Component\CustomToggleComponent;
use Modules\CustomEntity\Filament\CustomFields\Component\CustomTextInputComponent;
use Modules\CustomEntity\Filament\CustomFields\Data\CustomDisplayComponentData;

class CustomEntityFilamentFieldService
{
    public function __construct()
    {
    }

    public function fields(array $columns) : array
    {
        return array_map(function ($column) {
            $data = CustomComponentData::fromArray($column);

            $class = match($data->data_type) {
                CustomEntity::DATA_TYPE_VARCHAR => CustomTextInputComponent::class,
                CustomEntity::DATA_TYPE_BOOLEAN => CustomToggleComponent::class,
                default => CustomToggleComponent::class
            };

            return $class::make($data)->field();
        }, $columns);
    }

    public function displayFields(array $columns)
    {
        return array_map(function ($column) {
            $data = CustomDisplayComponentData::fromArray($column);

            return TextColumn::make(
                $data->column_name
            )->label($data->label);
        }, $columns);
    }
}
