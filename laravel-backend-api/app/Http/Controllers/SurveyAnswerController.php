<?php

namespace App\Http\Controllers;

use App\Models\Survey;
use App\Models\SurveyAnswer;
use App\Models\SurveyQuestionAnswer;

use Illuminate\Support\Arr;
use Illuminate\Support\Facades\DB;

class SurveyAnswerController extends Controller
{

    public function index(Survey $survey)
    {
        $survey->load(['survey_questions' => function ($query) {
            $query->with('survey_question_answers');
        }, 'survey_answers' => function ($query){
            $query->latest()->first();
        }]);

//        $survey->load('survey_questions.survey_question_answers', 'survey_answers');

        return response()->json($survey);
    }

    public function store(Survey $survey)
    {
        $attributes = request()->validate([
            'answers' => 'array|min:1',
            'answers.*.question_id' => 'required',
            'answers.*.answer' => 'required|array|min:1'
        ]);

        try {
            DB::beginTransaction();

            $survey_answer = SurveyAnswer::create([
                'survey_id' => $survey->id,
                'start_date' => request()->start_time,
                'end_date' => request()->end_time
            ]);

            $existing_ids = $survey->survey_questions()->pluck('id')->toArray();
            $new_ids = Arr::pluck($attributes['answers'], 'question_id');
            $missing_ids = array_diff($existing_ids, $new_ids);

            if (count($missing_ids)) {
                return response()->json(['message' => 'Please answer to the all questions ' . implode(', ', $missing_ids)], 422);
            }

            foreach ($attributes['answers'] as $attribute) {
                $data = [
                   'survey_question_id' => $attribute['question_id'],
                   'survey_answer_id' => $survey_answer->id,
                   'answer' => is_array($attribute['answer']) ? json_encode($attribute['answer']):$attribute['answer']
                ];
                SurveyQuestionAnswer::create($data);
            }
            DB::commit();
            return response()->json(['message' => 'You have answered to the questions']);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['message' => $e->getMessage()], 422);
        }
    }
}
