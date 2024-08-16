<?php

namespace Modules\CustomEntity\Filament\CustomFields\Component;

use Filament\Forms\Components\Select;
use Filament\Forms\Components\Component;
use Modules\CustomEntity\Filament\CustomFields\Data\CustomComponentData;

abstract class CustomComponent
{
    public CustomComponentData $data;

    public function __construct(
        CustomComponentData $customComponentData
    )
    {
        $this->data = $customComponentData;
    }

    public static function make(CustomComponentData $customComponentData) : self
    {
        return new static($customComponentData);
    }

    abstract function field() : Component;
}
