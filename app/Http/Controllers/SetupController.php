<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class SetupController extends Controller
{
public function plan()          
{ 
syncLangFiles('messages');
return Inertia::render('public/setup/Plan'); 
}
public function template()      
{
syncLangFiles('messages');
return Inertia::render('public/setup/Template'); 
}
public function org()           {  syncLangFiles('messages'); return Inertia::render('public/setup/Org'); }
public function account()       {  syncLangFiles('messages'); return Inertia::render('public/setup/Account'); }
public function review()        {  syncLangFiles('messages'); return Inertia::render('public/setup/Review'); }
public function paymentMethod() {  syncLangFiles('messages'); return Inertia::render('public/setup/PaymentMethod'); }
public function pay()           {  syncLangFiles('messages'); return Inertia::render('public/setup/Pay'); }
}
