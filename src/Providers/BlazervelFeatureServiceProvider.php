<?php

namespace Blazervel\Feature\Providers;

use Blazervel\Feature\Commands\MakeCommand;
use Blazervel\Feature\View\TagCompiler;

use Blazervel\Lang\Lang;
use Tightenco\Ziggy\BladeRouteGenerator;
use Blazervel\Feature\Support\Feature;
use Illuminate\Foundation\AliasLoader;
use Illuminate\Support\Facades\{ Config, Blade };
use Illuminate\Support\ServiceProvider;

class BlazervelFeatureServiceProvider extends ServiceProvider 
{
  private string $pathTo = __DIR__ . '/../..';

	public function register()
	{
    $this->registerAnonymousClassAliases();
	}

  public function boot()
  {
    $this->loadViews();
    $this->loadComponents();
    $this->loadRoutes();
    $this->loadTranslations();
    $this->loadDirectives();

    if ($this->app->runningInConsole()) :
      $this->commands([
        MakeCommand::class,
      ]);
    endif;
  }

  private function loadDirectives(): void
  {
    Blade::directive('blazervel', fn ($group) => trim("
      <?php echo app('" . Lang::class . "')->generate({$group}) ?>
      <?php echo app('" . BladeRouteGenerator::class . "')->generate({$group}) ?>
    "));
  }

  public function registerAnonymousClassAliases(): void
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

  private function loadViews()
  {
    $this->loadViewsFrom(
      "{$this->pathTo}/resources/views", 'blazervel'
    );
  }

  private function loadComponents()
  {
    Blade::componentNamespace(
      'Blazervel\\Feature\\View\\Components', 
      'blazervel'
    );

    if (method_exists($this->app['blade.compiler'], 'precompiler')) {
      $this->app['blade.compiler']->precompiler(function ($string) {
        return app(TagCompiler::class)->compile($string);
      });
    }
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
      'blazervel'
    );
  }

}