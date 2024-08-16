<?php

namespace Modules\CustomEntity\Contracts;

use Modules\CustomEntity\CustomApp;

interface CustomEntityFactoryContract
{
    public static function make(): static;
    public function newInstance(): static;

    public function inRandomOrGenerate(): CustomApp;
    public function initializeByResourceData(
        string $resource
    ): static;
}
