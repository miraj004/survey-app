<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SurveyQuestion extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function survey(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(Survey::class);
    }

    public function survey_question_answers(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(SurveyQuestionAnswer::class);
    }

}
