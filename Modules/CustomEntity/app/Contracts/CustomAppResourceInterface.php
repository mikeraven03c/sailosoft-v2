<?php

namespace Modules\CustomEntity\Contracts;

interface CustomAppResourceInterface
{
    public function __invoke(): \Modules\CustomEntity\Data\CustomEntity\CustomEntityPropertyData;
}
