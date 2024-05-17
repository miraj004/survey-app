<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\Survey;
use App\Models\SurveyQuestion;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
//        \App\Models\User::factory()->create([
//            'name' => 'Admin',
//            'username' => 'admin239',
//            'email' => 'admin@gmail.com',
//            'password' => bcrypt('admin@143')
//        ]);
        Survey::factory(10)->create(['user_id' => 1]);
    }
}
