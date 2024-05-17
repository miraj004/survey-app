<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\Sluggable\HasSlug;
use Spatie\Sluggable\SlugOptions;

class Survey extends Model
{
    use HasFactory;
    use HasSlug;

    protected $guarded = [];

    public function author(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function survey_questions(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(SurveyQuestion::class);
    }

    public function survey_answers(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(SurveyAnswer::class);
    }

    public function getSlugOptions(): SlugOptions
    {
        return SlugOptions::create()->generateSlugsFrom('title')
            ->saveSlugsTo('slug');
    }

    public function getRouteKeyName():String
    {
        return 'slug';
    }
}
