<?php

namespace Modules\CustomEntity\Data\CustomEntity;

use Modules\CustomEntity\CustomEntity;
use Modules\CustomEntity\Data\CustomEntityData;

class CustomEntityColumnData extends CustomEntityData
{
    public function __construct(
        public string $type,
        public string $label,
        public string $column_name,
        public ?int $length = 0,
        public ?string $data_type = '',
        public ?string $default = '',
        public ?string $rules = '',
    ) {
    }

    public static function fromArray(array $column): static
    {
        $data = $column['data'];
        return new self(
            type: $column['type'],
            label: $data['label'],
            column_name: $data['column_name'],
            length: $data['length'] ?? 125,
            data_type: $data['data_type'] ?? 'varchar',
            default: $data['default'] ?? '',
            rules: $data[CustomEntity::COLUMN_PROPERTY_RULES] ?? ''
        );
    }
}
