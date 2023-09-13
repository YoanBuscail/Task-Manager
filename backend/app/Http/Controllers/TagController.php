<?php

namespace App\Http\Controllers;

use App\Models\Tag;
use Illuminate\Http\Request;

class TagController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Tag::all();
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
        $label = $request->input('label');

        // On crée une nouvelle instance, puis on lui définit la propriété $label
        $tag = new Tag();
        $tag->label = $label;

        // On sauvegarde, puis on gère la réponse avec le code HTTP qui convient
        // 201 : Created
        // 500 : Internal Server Error
        if ($tag->save()) {
            return response()->json($tag, 201);
        } else {
            return response(null, 500);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $tag = Tag::find($id);
        return response()->json($tag);
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
        $tag= Tag::find($id);
        // Si on n'a rien, on ne peut pas faire de mise à jour
        // 404 : not found
        if (!$tag) {
            return response(null, 404);
        }

        // Extraction des valeurs passées de la body de la requête
        $label = $request->input('label');

        $tag->label = $label;

        // On sauvegarde, puis on gère la réponse avec le code HTTP qui convient
        // 500 : Internal Server Error
        if ($tag->save()) {
            return response()->json($tag);
        } else {
            return response(null, 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        // On recherche avec l'id
        $tag= Tag::find($id);
        // Si on n'a rien, on ne peut pas faire de mise à jour
        // 404 : not found
        if (!$tag) {
            return response(null, 404);
        }

        // On supprime puis on gère la réponse avec le code HTTP qui convient
        // 500 : Internal Server Error
        if ($tag->delete()) {
            return response(null, 200);
        } else {
            return response(null, 500);
        }
    }
}
