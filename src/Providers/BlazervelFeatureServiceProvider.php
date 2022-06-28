<?php

namespace Blazervel\Feature\Providers;

use Blazervel\Feature\Commands\MakeCommand;
use Blazervel\Feature\Support\Feature;
use Illuminate\Foundation\AliasLoader;
use Illuminate\Support\Facades\{ File, Config };
use Illuminate\Support\ServiceProvider;

class BlazervelFeatureServiceProvider extends ServiceProvider 
{
  private string $pathTo = __DIR__ . '/../..';

	public function register()
	{
    $this->ensureFeaturesDirectoryExists();
    $this->registerAnonymousClassAliases();
	}

  public function boot()
  {
    $this->loadRoutes();
    $this->loadTranslations();

    if ($this->app->runningInConsole()) :
      $this->commands([
        MakeCommand::class,
      ]);
    endif;
  }
  
  private function ensureFeaturesDirectoryExists()
  {
    File::ensureDirectoryExists(
      app_path('Features')
    );
  }

  private function registerAnonymousClassAliases(): void
  {
    if (!Config::get('blazervel.anonymous_classes', true)) :
      return;
    endif;

    $anonymousClasses = Feature::anonymousClasses();

    $this->app->booting(function ($app) use ($anonymousClasses) {

      $loader = AliasLoader::getInstance();

      foreach($anonymousClasses as $namespace => $class) :
        $loader->alias(
          $namespace, 
          $class
        );
      endforeach;

    });

    $this->app->booting(fn ($app) => (
      AliasLoader::getInstance()->alias(
        'Blazervel\\Feature', 
        'Blazervel\\Feature\\Feature'
      )
    ));
  }

  private function loadRoutes() 
  {
    $this->loadRoutesFrom(
      "{$this->pathTo}/routes/routes.php"
    );
  }

  private function loadTranslations() 
  {
    $this->loadTranslationsFrom(
      "{$this->pathTo}/lang", 
      'blazervel-features'
    );
  }

}