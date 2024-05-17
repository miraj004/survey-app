<?php

namespace App\Http\Controllers;

use App\Enums\QuestionTypeEnum;
use App\Http\Resources\SurveyResource;
use App\Models\Survey;
use App\Models\SurveyQuestion;
use DateTime;
use http\Client\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rules\Enum;
use Mockery\Exception;


class SurveyController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        $surveys = $user->surveys()->latest()->paginate(6);
        return SurveyResource::collection($surveys);
    }

    public function destroy(Survey $survey): \Illuminate\Http\JsonResponse
    {
        $user = \request()->user();
        if ($user->id !== $survey->user_id) {
            return abort(403, 'Unauthorized action.');
        }
        $prev_image = $survey->thumbnail;
        $survey->delete();
        if ($prev_image) {
            File::delete($prev_image);
        }
        return response()->json(['message' => 'Survey deleted successfully']);
    }

    public function show(Survey $survey): SurveyResource|\Illuminate\Http\JsonResponse
    {
        // 07:38 PAUSED VIDEO
//        if (!$survey->status) {
//            return response()->json('', 404);
//        }
//
//        $current_date = new DateTime();
//        $expire_date = new DateTime($survey->expire_date);
//
//        if ($current_date > $expire_date) {
//            return response()->json('', 404);
//        }

        return new SurveyResource($survey);
    }

    public function store(): \Illuminate\Http\JsonResponse
    {
        $attributes = $this->validateAttributes();
        $attributes['user_id'] = auth()->user()->id;
        try {
            DB::beginTransaction();
            if ($attributes['thumbnail']) {
                $attributes['thumbnail'] = $this->saveImage($attributes['thumbnail']);
                $attributes['thumbnail_url'] = $attributes['thumbnail'];
            }
            $questions = $attributes['questions'];
            unset($attributes['questions']);
            /** @var $survey Survey */
            $survey = Survey::create($attributes);
            $this->createManyQuestions($survey, $questions);

            DB::commit();
            return response()->json(['message' => 'Record inserted successfully'], 201);
        } catch (Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }


    private function validateAttributes(): array
    {
        return \request()->validate([
            'title' => 'required|string|max:255',
            'thumbnail' => 'nullable|string',
            'thumbnail_url' => 'nullable|string',
            'status' => 'required|boolean',
            'description' => 'nullable|string',
            'expire_date' => 'required|date|after_or_equal:today',
            'questions' => 'array',
            'questions.*.id' => 'numeric',
            'questions.*.question' => 'required|string',
            'questions.*.type' => ['required', new Enum(QuestionTypeEnum::class)],
            'questions.*.survey_id' => 'exists:surveys,id',
            'questions.*.options' => 'array',
            'questions.*.options.*' => 'required',
        ]);
    }

    private function saveImage($base64String): string
    {
        preg_match('/^data:image\/(\w+);base64,/', $base64String, $matches);
        if (!$matches || !isset($matches[1])) {
            throw new \InvalidArgumentException('Invalid or unsupported image format');
        }
        $imageType = $matches[1];
        $thumbnailBinary = base64_decode(preg_replace('#^data:image/\w+;base64,#i', '', $base64String));
        $filename = 'thumbnail_' . time() . '.' . $imageType;
        $path = storage_path('app/public/thumbnails/' . $filename);
        file_put_contents($path, $thumbnailBinary);
        return 'storage/thumbnails/' . $filename;
    }


    protected function createManyQuestions(Survey $survey, array $questions)
    {
        foreach ($questions as &$question) {
            if ($question['type'] === 'text') {
                continue;
            }
            $question['options'] = json_encode($question['options']);
        }
        $survey->survey_questions()->createMany($questions);
    }


    public function update(Survey $survey): \Illuminate\Http\JsonResponse
    {

        $attributes = $this->validateAttributes();
        $attributes['user_id'] = auth()->user()->id;
        $questions = $attributes['questions'];

        try {
            DB::beginTransaction();
            unset($attributes['questions']);
            if (isset($attributes['thumbnail'])) {
                $attributes['thumbnail'] = $this->saveImage($attributes['thumbnail']);
                $attributes['thumbnail_url'] = $attributes['thumbnail'];
                $prev_image = $survey->thumbnail;
                File::delete($prev_image);
            } else {
                unset($attributes['thumbnail']);
                unset($attributes['thumbnail_url']);
            }

            $survey->update($attributes);
            $existing_ids = $survey->survey_questions()->pluck('id')->toArray();
            $new_ids = Arr::pluck($questions, 'id');
            $to_delete = array_diff($existing_ids, $new_ids);

            foreach ($questions as &$question) {
                $question['options'] = json_encode($question['options'] ?? null);
                if (isset($question['id']) && !in_array($question['id'], $to_delete)) {
                     SurveyQuestion::where('id', $question['id'])->first()->update($question);
                } else {
                    $survey->survey_questions()->create($question);
                }
            }

            if (count($to_delete)) {
                SurveyQuestion::destroy($to_delete);
            }

            DB::commit();
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['message' => $e->getMessage()], 500);
        }
        return response()->json(['message' => 'Record updated successfully']);
    }




}
