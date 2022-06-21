<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" class="dark:bg-gray-900">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title inertia>{{ config('app.name', 'Blazervel') }}</title>
    @blazervel
    <script src="https://kit.fontawesome.com/360509c7d2.js" crossorigin="anonymous"></script>
    <b:styles :href="mix('css/app.css')"/>
    <b:script :src="mix('js/app.js')"/>
  </head>
  <body class="font-sans antialiased">
    @inertia
  </body>
</html>
