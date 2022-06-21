<?php

namespace Blazervel\Feature\View\Components;

use Illuminate\View\Component;

class Styles extends Component
{
  protected string $href;

  public function __construct(string $href)
  {
    $this->href = $href;
  }

  public function render()
  {
    return (
      "<link href=\"{$this->href}\" rel=\"stylesheet\"/>"
    );
  }
}