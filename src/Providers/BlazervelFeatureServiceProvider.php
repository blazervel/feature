<?php

namespace Blazervel\Feature\Providers;

use Lorisleiva\Actions\Facades\Actions;
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
    $this->ensureDirectoryExists();
    $this->registerAnonymousClassAliases();
	}

  public function boot()
  {
    $this->loadDefaultRoutes();
    $this->loadFeatureRoutes();
    $this->loadTranslations();
    $this->loadConfig();

    if ($this->app->runningInConsole()) :
      $this->commands([
        MakeCommand::class,
      ]);
    endif;
  }
  
  private function ensureDirectoryExists()
  {
    File::ensureDirectoryExists(
      Config::get('blazervel.features_dir') ?: app_path('Features')
    );
  }

  private function loadFeatureRoutes()
  {
    Actions::registerRoutes(
      Feature::directories()
    );
  }

  private function loadConfig()
  {
    $this->publishes([
      "{$this->pathTo}/config/blazervel.php" => config_path('blazervel.php'),
    ], 'blazervel');
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
  }

  private function loadDefaultRoutes() 
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