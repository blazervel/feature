<?php

namespace Blazervel\Feature\Casts\Enums;

trait WithOptions {

  public static function options(): array
  {
    $calledClass = get_called_class();

    return collect($calledClass::cases())->map(function($c){ 
      return $c->value; 
    })->flatten()->all();
  }

}