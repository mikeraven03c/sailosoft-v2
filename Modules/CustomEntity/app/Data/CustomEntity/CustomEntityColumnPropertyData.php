<?php

namespace Modules\CustomEntity\Data\CustomEntity;

use Modules\CustomEntity\CustomEntity;
use Modules\CustomEntity\Data\CustomEntityData;

class CustomEntityColumnPropertyData extends CustomEntityData
{
    public function __construct(
        public $type = CustomEntity::BLOCK_TYPE_DEFAULT,
        public $data = []
    ) {
    }

    public function setData(
        string $label,
        string $column_name,
        int $length = 128,
        string $data_type = CustomEntity::DATA_TYPE_VARCHAR,
        string $default = '',
        string $rules = ''
    ) {
        $this->data = [
            CustomEntity::COLUMN_PROPERTY_LABEL => $label,
            CustomEntity::COLUMN_PROPERTY_COLUMN_NAME => $column_name,
            CustomEntity::COLUMN_PROPERTY_LENGTH => $length,
            CustomEntity::COLUMN_PROPERTY_DATA_TYPE => $data_type,
            CustomEntity::COLUMN_PROPERTY_DEFAULT => $default,
            CustomEntity::COLUMN_PROPERTY_RULES => $rules
        ];

        return $this;
    }

    public function setType($type)
    {
        $this->type = $type;

        return $this;
    }
}
