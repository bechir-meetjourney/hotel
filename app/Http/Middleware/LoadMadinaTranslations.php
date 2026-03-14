<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Symfony\Component\HttpFoundation\Response;

/**
 * Middleware لتحميل ترجمات قالب المدينة
 * Loads Madina template translations independent of other templates
 */
class LoadMadinaTranslations
{
    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, Closure $next): Response
    {
        // Get current locale
        $locale = App::getLocale();
        
        // Load Madina-specific translations
        $madinaTranslations = trans('madina', [], $locale);
        
        // Share with Inertia
        \Inertia\Inertia::share([
            'madinaTranslations' => $madinaTranslations,
        ]);
        
        return $next($request);
    }
}
