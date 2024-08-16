<?php

namespace Modules\CustomEntity\Filament\CustomFields\Component;

use Filament\Forms\Components\Component;
use Filament\Forms\Components\Toggle;

class CustomToggleComponent extends CustomComponent
{
    public function field(): Component
    {
        $data = $this->data;
        return Toggle::make($data->column_name, $data->label);
    }
}
