<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Models\Tag;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $tasks = Task::all()->load('category', 'tags');

        //return $tasks->toJson();
        //return $tasks
        return response()->json($tasks);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|min:3|max:255',
            'category_id' => 'nullable|integer|exists:categories,id',
            'tags' => 'nullable|array'
        ]);


        /* $title = $request->input('title'); */
        // On crée une nouvelle instance, puis on lui définit la propriété title
        /* $task = new Task();
        $task->title = $title; */

        $task = Task::create($validated);

        if($request->get('tags')){
            foreach($request->get('tags') as $tag_id){
                $tag = Tag::find($tag_id);
                if($tag){
                    $task->tags()->attach($tag);
                }
            }
        }

        return response()->json([
            'status' => 'success',
            'message' => 'Task created!',
            'task' => $task->load('category', 'tags')
        ], 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return Task::findOrFail($id)->load(['category', 'tags']);;
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        // On recherche avec l'id
        $task= Task::findOrFail($id);

        $validated = $request->validate([
            'title' => 'required|string|min:3|max:255'
        ]);

        $task->update($validated);

        /* // Extraction des valeurs passées de la body de la requête
        $title = $request->input('title');

        $task->title = $title; */

        return response()->json([
            'status' => 'success',
            'message' => 'Task updated!',
            'task' => $task
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id){
        $task = Task::findOrFail($id);

        $task->tags()->detach();
        $task->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Task deleted!'
        ]);
    }
}
