<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $admin = Role::create(['name' => 'super_admin']);

        Role::create(['name' => 'customer']);

        $user = User::factory()->create([
            'name' => 'Admin',
            'email' => 'admin@gmail.com'
        ]);

        $user->syncRoles($admin->name);

        $this->call([
            CategorySeeder::class,
            CarSeeder::class,
            DestinationSeeder::class,
            TravelPackageSeeder::class,
        ]);
    }
}