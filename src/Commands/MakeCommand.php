<?php

namespace Blazervel\Feature\Commands;

use Illuminate\Console\Command;

class MakeCommand extends Command
{
  protected $signature = 'blazervel:make {action}';

  protected $description = 'Generate new Laravel Actions via Blazervel';

  public function handle()
  {
    $actionName = $this->argument('action');

    return 0;
  }
}
