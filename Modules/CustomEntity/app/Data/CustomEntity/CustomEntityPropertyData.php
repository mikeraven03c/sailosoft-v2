<?php

namespace Modules\CustomEntity\Data\CustomEntity;

use Illuminate\Support\Str;
use Modules\CustomEntity\CustomEntity;
use Modules\CustomEntity\Data\CustomEntityData;
use Modules\CustomEntity\Data\CustomEntity\CustomEntityColumnPropertyData;

class CustomEntityPropertyData extends CustomEntityData
{
    public function __construct(
        public string $entity = '',
        public string $name = '',
        public string $slug = '',
        public string $navigation = '',
        public string $group = '',
        public bool $is_active = true,
        public int $priority = 1,
        /** @var CustomEntityColumnPropertyData[] */
        public array $columns = [],
        public array $display_columns = []
    )
    {}

    public static function fromResourceName(string $resource) : static
    {
        return new static(
            entity: Str::plural(Str::snake($resource)),
            name: Str::ucfirst($resource),
            slug: Str::slug($resource),
            navigation: Str::plural(Str::kebab($resource)),
        );
    }

    public function setColumns(CustomEntityColumnPropertyData ...$columns): self
    {
        $columnsArray = array_map(function($column) {
            return $column->toArray();
        }, $columns);

        $this->columns = array_merge($columnsArray, $this->columns);

        return $this;
    }

    public function setDisplayColumns(CustomEntityDisplayColumnPropertyData ...$columns): self
    {
        $columnsArray = array_map(function($column) {
            return $column->toArray();
        }, $columns);

        $this->display_columns = array_merge($columnsArray, $this->display_columns);

        return $this;
    }
}
