<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\URL;

class SurveyResource extends JsonResource
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
            'description' => $this->description,
            'expire_date' => $this->expire_date,
            'questions' => SurveyQuestionResource::collection($this->survey_questions)
        ];
    }
}
