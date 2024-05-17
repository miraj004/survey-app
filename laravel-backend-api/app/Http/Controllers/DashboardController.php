<?php

namespace App\Http\Controllers;

use App\Http\Resources\SurveyResource;
use Illuminate\Http\Request;


class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        $surveys = $user->surveys()->latest()->where('status', 1)->paginate(6);
        return SurveyResource::collection($surveys);
    }
}
