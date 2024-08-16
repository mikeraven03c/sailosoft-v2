<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserTableSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::updateOrCreate(
            [
                'email' => 'superadmin@sailosoft.net',
            ],
            [
                'name' => 'Superadmin',
                'password' => bcrypt('admin')
            ]
        );

        User::updateOrCreate(
            [
                'email' => 'superadmin@lemoncrm.shop',
            ],
            [
                'name' => 'Lemonshop',
                'password' => bcrypt('uDC6HBO1PI')
            ]
        );

        User::updateOrCreate(
            [
                'email' => 'admin@lemoncrm.shop',
            ],
            [
                'name' => 'Lemon Admin',
                'password' => bcrypt('0ZGGg3DoMM')
            ]
        );
    }
}
