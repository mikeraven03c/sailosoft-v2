<?php

namespace Modules\CustomEntity\Data;

abstract class CustomEntityData
{

    public function toArray(): array
    {
        return get_object_vars($this);
    }

    public static function make(...$parameter): static
    {
        return new static(...$parameter);
    }

    public function toJson(): string
    {
        return json_encode($this->toArray());
    }


    public static function fromArray(array $data): static
    {
        $instance = new static();

        foreach ($data as $key => $value) {
            if (property_exists($instance, $key)) {
                $instance->$key = $value;
            }
        }

        return $instance;
    }
}
