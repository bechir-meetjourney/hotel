<!DOCTYPE html>
<html lang="{{ str_replace('_','-', app()->getLocale()) }}"
      dir="{{ app()->getLocale() === 'ar' ? 'rtl' : 'ltr' }}"
      @class(['dark' => ($appearance ?? 'light') == 'dark'])>
   
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="description" content="نظام ضيافة - حل متكامل لإدارة الفنادق والشقق المفروشة وأماكن الإقامة السياحية. سهل الحجوزات وأتمتة العمليات اليومية وحسن تجربة الضيوف.">
        <meta name="keywords" content="نظام إدارة فنادق, حجوزات فندقية, إدارة شقق مفروشة, برنامج ضيافة, إدارة الإيرادات, حلول فندقية, أتمتة الفنادق, نظام حجز, إدارة الغرف, إدارة الحجوزات">
        <meta name="author" content="ضيافة">
        <meta name="robots" content="index, follow">
        <meta property="og:title" content="{{ config('app.name', 'ضيافة - نظام إدارة الفنادق المتكامل') }}">
        <meta property="og:description" content="نظام متكامل لإدارة المنشآت الفندقية وأماكن الإقامة السياحية. سهل عملية الحجوزات وأتمتة عمليات الاستقبال والمغادرة.">
        <meta property="og:image" content="/logo.png">
        <meta property="og:url" content="{{ url('/') }}">
        <meta property="og:type" content="website">
        <meta name="twitter:card" content="summary_large_image">
        <meta name="twitter:title" content="{{ config('app.name', 'ضيافة - نظام إدارة الفنادق المتكامل') }}">
        <meta name="twitter:description" content="نظام متكامل لإدارة المنشآت الفندقية وأماكن الإقامة السياحية. سهل عملية الحجوزات وأتمتة عمليات الاستقبال والمغادرة.">
        <meta name="twitter:image" content="/logo.png">

        {{-- Inline script to detect system dark mode preference and apply it immediately --}}
        <script>
            (function() {
                const appearance = '{{ $appearance ?? "light" }}';

                if (appearance === 'dark') {
                    document.documentElement.classList.add('dark');
                } else if (appearance === 'system') {
                    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

                    if (prefersDark) {
                        document.documentElement.classList.add('dark');
                    }
                }
            })();
        </script>

        {{-- Inline style to set the HTML background color based on our theme in app.css --}}
        <style>
            html {
                background-color: oklch(1 0 0);
            }

            html.dark {
                background-color: oklch(0.145 0 0);
            }
        </style>

        <title inertia>{{ config('app.name', 'ضيافة - نظام إدارة الفنادق والشقق المفروشة المتكامل') }}</title>

        <link rel="icon" href="/favicon.ico" sizes="any">
        <link rel="icon" href="/favicon.svg" type="image/svg+xml">
        <link rel="apple-touch-icon" href="/apple-touch-icon.png">
        <link rel="canonical" href="{{ url()->current() }}"

        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />

        @routes
        @viteReactRefresh
        @vite(['resources/js/app.tsx', "resources/js/pages/{$page['component']}.tsx"])
        @inertiaHead
    </head>
    <body class="font-sans antialiased">
        @inertia
    </body>
</html>
