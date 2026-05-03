<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsurePermission
{
    /**
     * Usage: ->middleware('permission:tenants.approve')
     *        ->middleware('permission:reviews.moderate,reviews.reply')  (any-of)
     */
    public function handle(Request $request, Closure $next, string ...$keys): Response
    {
        $user = $request->user();
        if (!$user) {
            abort(403, 'Unauthorized');
        }

        foreach ($keys as $key) {
            if ($user->hasPermission($key)) {
                return $next($request);
            }
        }

        abort(403, 'Permission denied: '.implode(' | ', $keys));
    }
}
