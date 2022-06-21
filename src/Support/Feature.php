<?php

namespace Blazervel\Blazervel\Support;

use Illuminate\Support\Str;
use Illuminate\Filesystem\Filesystem;

class Feature
{
  public static function anonymousClasses(): array
  {
    $actions = [];
    $files = (new Filesystem)->allFiles(
      app_path('Features')
    );

    foreach($files as $file) :
      $path      = $file->getPathName();
      $namespace = explode('/app/Features/', $path)[1];
      $namespace = Str::remove('.php', $namespace);
      $namespace = "App/Features/{$namespace}";
      $namespace = Str::replace('/', '\\', $namespace);

      if (gettype(
        $class = require($path)
      ) !== 'object') :
        continue;
      endif;

      $class = get_class($class);

      if (!Str::contains($class, '@anonymous')) :
        continue;
      endif;

      $actions[$namespace] = $class;
    endforeach;

    return $actions;
  }
}