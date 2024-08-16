<?php

namespace Modules\CustomEntity\Database\Seeders;

use Illuminate\Database\Seeder;

class CustomEntityDatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $this->call([
            CRMCustomEntitySeeder::class
        ]);
    }
}
