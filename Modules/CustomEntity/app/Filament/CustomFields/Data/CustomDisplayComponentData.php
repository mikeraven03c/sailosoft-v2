<?php

namespace Modules\CustomEntity\Filament\CustomFields\Data;

class CustomDisplayComponentData
{
    public function __construct(
        public string $type,
        public string $label,
        public string $column_name,
        public ?string $data_type = ''
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
            data_type: $data['data_type'] ?? 'varchar'
        );
    }
}
