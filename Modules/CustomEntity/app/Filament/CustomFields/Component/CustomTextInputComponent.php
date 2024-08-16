<?php

namespace Modules\CustomEntity\Filament\CustomFields\Component;

use Filament\Forms\Components\Component;
use Filament\Forms\Components\TextInput;
use Modules\CustomEntity\Filament\CustomFields\Component\CustomComponent;

class CustomTextInputComponent extends CustomComponent
{
    public function field(): Component
    {
        $data = $this->data;
        return TextInput::make(
            $data->column_name
        )->label(
            $data->label
        );
    }
}
