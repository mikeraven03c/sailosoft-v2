<?php

namespace Modules\CustomEntity\Contracts;

interface CustomAppFactoryInterface
{
    public static function factory(CustomEntityFactoryContract $factory);
}
