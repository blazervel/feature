<?php

namespace Blazervel\Blazervel;

use Illuminate\Support\{ Str, Collection };
use Illuminate\Support\Facades\{ Route, View };
use Illuminate\Filesystem\Filesystem;
use Illuminate\Http\Request;

class Feature
{
  public string $name;
  public string $namespace;
  public string $path;
  public array $operations = [];

  public function __construct(string $name, string $namespace, string $path)
  {
    $this->name = $name;
    $this->namespace = $namespace;
    $this->path = $path;

    $this->retrieveOperations();
  }

  public static function componentLookup(string $componentNameOrPath): string|null
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
    $blazervelComponent = "Blazervel\\Blazervel\\View\\Components\\{$componentName}";

    if ($featureComponent && class_exists($featureComponent)) :

      return $featureComponent;

    elseif (class_exists($sharedComponent)) :

      return $sharedComponent;

    elseif (class_exists($blazervelComponent)) :

      return $blazervelComponent;

    endif;

    return null;
  }

  public static function viewLookup(string $componentNameOrPath): string|null
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