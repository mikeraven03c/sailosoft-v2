<?php

namespace Modules\CustomEntity\Services;

use Modules\CustomEntity\CustomApp;
use Modules\CustomEntity\CustomEntity;
use Illuminate\Database\Eloquent\Builder;
use Modules\CustomEntity\Contracts\CustomAppFactoryInterface;
use Modules\CustomEntity\Contracts\CustomEntityFactoryContract;
use Modules\CustomEntity\Data\CustomEntity\CustomEntityPropertyData;

class CustomEntityFactoryService implements CustomEntityFactoryContract
{
    protected CustomEntityPropertyData $property;
    protected CustomAppFactoryInterface $factoryResource;
    protected CustomApp $customApp;
    protected int $count = 1;
    protected array $payload = [];

    public function __construct() {}

    public static function make(): static
    {
        return new static;
    }

    public function newInstance(): static
    {
        return new $this;
    }

    public function initializeByResourceData(
        string $resource
    ): static {
        $resourceInstance = new $resource;
        $this->property = $resourceInstance();
        $this->factoryResource = $resourceInstance;
        $this->customApp = CustomApp::make($this->property->entity);

        return $this;
    }

    public function customAppQuery(): Builder
    {
        return $this->customApp->newQuery();
    }

    public function customApp(): CustomApp
    {
        return $this->customApp;
    }

    public function setCount(int $count = 1)
    {
        $this->count = $count;

        return $this;
    }

    public function inRandomOrGenerate(): CustomApp
    {
        $data = $this->generateRandom();

        if (!$data) {
            $data = $this->generate();
        }

        return $data;
    }

    /**
     * Generate random data from entity
     */
    public function generateRandom()
    {
        return $this->customApp
            ->newQuery()
            ->inRandomOrder()
            ->first();
    }

    public function setPayload(array $payload)
    {
        $this->payload = $payload;
        return $this;
    }

    public function appendPayload(array $payload)
    {
        $this->payload = array_merge($this->payload, $payload);
        return $this;
    }

    public function generate()
    {
        return $this->customApp->create(
            array_merge(
                $this->factoryResource::factory($this),
                $this->payload
            )
        );
    }

    public function create()
    {
        for ($count = 0; $count < $this->count; $count++) {
            $this->generate();
        }

        return $this;
    }
}
