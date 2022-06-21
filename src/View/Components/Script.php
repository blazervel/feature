<?php

namespace Blazervel\Blazervel\View\Components;

use Illuminate\View\Component;

class Script extends Component
{
  protected string $src;

  public function __construct(string $src)
  {
    $this->src = $src;
  }

  public function render()
  {
    return (
      "<script src=\"{$this->src}\" defer></script>"
    );
  }
}