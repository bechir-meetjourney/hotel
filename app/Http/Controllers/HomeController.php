<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class HomeController extends Controller
{
    public function index()
    {
        syncLangFiles('messages');

        return Inertia::render('public/Home');
    }
}
