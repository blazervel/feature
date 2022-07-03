<?php

namespace Blazervel\Feature\Support;

use Symfony\Component\Finder\Finder;
use Illuminate\Support\{ Str, Collection };
use Illuminate\Support\Facades\{ Config, View };
use Illuminate\Filesystem\Filesystem;

class Feature
{
  static function directories(): array
  {
    $directory = Config::get('blazervel.features_dir') ?: app_path('Features');
    $directories = Finder::create()->in($directory)->directories()->sortByName();
    
    return (new Collection($directories))->map(fn ($dir) => Str::remove(base_path() . '/', $dir->getPathname()))->all();
  }

  static function anonymousClasses(): array
  {
    $actions = [];
    $files = (new Filesystem)->allFiles(
      Config::get('blazervel.features_dir') ?: app_path('Features')
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

  static function componentLookup(string $componentNameOrPath): string|null
  {
    $featureComponent = null;

    if (Str::of($componentNameOrPath)->contains(['.', '/'])) :
      $componentPath      = Str::replace('.', '/', $componentNameOrPath);
      $componentPath      = explode('/', $componentPath);
      $componentName      = Str::ucfirst(Str::camel(end($componentPath)));
      $componentNamespace = (new Collection($componentPath))->map(function($value){ return Str::ucfirst(Str::camel($value)); })->join('\\');
      $featureComponent   = "App\\Features\\{$componentNamespace}";
    else :
      $componentName      = Str::ucfirst(Str::camel($componentNameOrPath));
    endif;

    $sharedComponent = "App\\View\\Components\\{$componentName}";
    $blazervelComponent = "Blazervel\\Feature\\View\\Components\\{$componentName}";

    if ($featureComponent && class_exists($featureComponent)) :

      return $featureComponent;

    elseif (class_exists($sharedComponent)) :

      return $sharedComponent;

    elseif (class_exists($blazervelComponent)) :

      return $blazervelComponent;

    endif;

    return null;
  }

  static function viewLookup(string $componentNameOrPath): string|null
  {
    $featureView = null;

    if (Str::of($componentNameOrPath)->contains(['.', '/'])) :

      $componentPath = Str::replace('.', '/', $componentNameOrPath);
      $featureName   = explode('/', $componentPath)[0];
      $componentName = end(explode('/', $componentPath));
      $componentName = Str::snake($componentName, '-');
      $featureView   = "blazervel.{$featureName}::{$componentName}";

    else :
      
      $componentName = Str::snake($componentNameOrPath, '-');
      
    endif;

    if ($featureView && View::exists($featureView)) :
      return $featureView;
    endif;
    
    if (View::exists($view = "components.{$componentName}")) :
      return $view;
    endif;
    
    if (View::exists($view = "blazervel::{$componentName}")) :
      return $view;
    endif;

    return null;
  }
}