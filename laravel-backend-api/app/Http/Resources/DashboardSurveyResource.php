<?php

namespace App\Http\Resources;

use App\Models\SurveyAnswer;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\URL;

class DashboardSurveyResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'slug' => $this->slug,
            'thumbnail' => $this->thumbnail,
            'thumbnail_url' => $this->thumbnail_url ? URL::to($this->thumbnail_url):null,
            'status' => $this->status,
            'created_at' => $this->created_at,
            'expire_date' => $this->expire_date,
            'answers_count' => $this->survey_answers()->count(),
            'questions_count' => $this->survey_questions()->count()
        ];
    }
}
