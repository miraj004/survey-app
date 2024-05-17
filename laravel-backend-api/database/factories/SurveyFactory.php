<?php

namespace Database\Factories;

use App\Models\Survey;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;

/**
 * @extends Factory<Survey>
 */
class SurveyFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'thumbnail' => null,
            'thumbnail_url' => null,
            'title' => fake()->sentence(),
            'slug' => fake()->unique()->slug(),
            'status' => fake()->boolean(),
            'description' => fake()->paragraph(),
            'expire_date' => now()->addDays(rand(1, 10)),
        ];
    }
}
