<?php

namespace Database\Factories;

use App\Models\Survey;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Arr;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\SurveyQuestion>
 */
class SurveyQuestionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $types = ['text', 'select', 'checkbox', 'radio'];
        $type = Arr::random($types);
        $options = $type === 'text' ? null : json_encode(fake()->words(rand(2, 5)));

        return [
            'survey_id' => Survey::factory(),
            'type' => $type,
            'question' => fake()->sentence(),
            'options' => $options,
        ];
    }
}
