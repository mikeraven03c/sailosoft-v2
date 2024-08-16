<?php

namespace Modules\CustomEntity\Filament\CustomFields\Data;

class CustomComponentData
{
    public function __construct(
        public string $type,
        public string $label,
        public string $column_name,
        public ?int $length = 0,
        public ?string $data_type = '',
        public ?string $default = ''
    )
    {
    }

    public static function fromArray(array $column) : self
    {
        $data = $column['data'];
        return new self(
            type: $column['type'],
            label: $data['label'],
            column_name: $data['column_name'],
            length: $data['length'] ?? 0,
            data_type: $data['data_type'] ?? 'varchar',
            default: $data['default'] ?? ''
        );
    }
}
