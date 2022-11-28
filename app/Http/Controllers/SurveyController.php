<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreSurveyRequest;
use App\Http\Requests\UpdateSurveyRequest;
use App\Http\Resources\SurveyResource;
use App\Models\Survey;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Http\Response;

class SurveyController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection
     */
    public function index(Request $request): AnonymousResourceCollection
    {
        $user = $request->user();
        return SurveyResource::collection(Survey::where('user_id', $user->id)->paginate());
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreSurveyRequest  $request
     * @return \App\Http\Resources\SurveyResource
     */
    public function store(StoreSurveyRequest $request): SurveyResource
    {
        $result = Survey::create($request->validated());
        return new SurveyResource($result);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Survey  $survey
     * @param  \Illuminate\Http\Request  $request
     * @return \App\Http\Resources\SurveyResource
     */
    public function show(Survey $survey, Request $request): SurveyResource
    {
        $user = $request->user();
        if ($user->id !== $survey->user_id) {
            return abort(403);
        }
        return new SurveyResource($survey);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateSurveyRequest  $request
     * @param  \App\Models\Survey  $survey
     * @return \App\Http\Resources\SurveyResource
     */
    public function update(UpdateSurveyRequest $request, Survey $survey): SurveyResource
    {
        $user = $request->user();
        if ($user->id !== $survey->user_id) {
            return abort(403);
        }
        $result = $survey->update($request->validated());
        return new SurveyResource($result);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Survey  $survey
     * @return \Illuminate\Http\Response
     */
    public function destroy(Survey $survey, Request $request): Response
    {
        $user = $request->user();
        if ($user->id !== $survey->user_id) {
            return abort(403);
        }

        $survey->delete();

        return response()->noContent();
    }
}
