<?php

namespace Modules\CustomEntity\Data\CustomEntity;

use Modules\CustomEntity\CustomEntity;
use Modules\CustomEntity\Data\CustomEntityData;

class CustomEntityDisplayColumnPropertyData extends CustomEntityData
{
    public function __construct(
        public $type = CustomEntity::BLOCK_TYPE_DEFAULT,
        public $data = []
    ) {
    }

    public function setData(
         string $label = '',
         string $column_name = '',
         string $data_type = CustomEntity::DATA_TYPE_VARCHAR
    ) {
        $this->data = [
            CustomEntity::COLUMN_PROPERTY_LABEL => $label,
            CustomEntity::COLUMN_PROPERTY_COLUMN_NAME => $column_name,
            CustomEntity::COLUMN_PROPERTY_DATA_TYPE => $data_type
        ];

        return $this;
    }
}
