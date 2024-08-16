<?php

namespace Modules\CustomEntity\Services;

use Modules\CustomEntity\CustomEntity;
use Illuminate\Support\Facades\Validator;
use Modules\CustomEntity\Data\CustomEntity\CustomEntityColumnData;

class CustomEntityValidatorService
{
    public function validator(
        \Illuminate\Http\Request $request,
        CustomEntity $customEntity
    ): \Illuminate\Contracts\Validation\Validator {
        $columnFields = $customEntity->getCustomFields();

        $validateFields = array_reduce($columnFields, function ($carry, $item) {
            $data = CustomEntityColumnData::fromArray($item);

            if ($data->rules) {
                $carry[$data->column_name] = $data->rules;
            }

            return $carry;
        }, []);

        $validator = \Illuminate\Support\Facades\Validator::make(
            $request->all(),
            $validateFields
        );

        return $validator;
    }
}
