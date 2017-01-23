<?php
defined('BASEPATH') OR exit('No direct script access allowed');

/*
| -------------------------------------------------------------------------
| Hooks
| -------------------------------------------------------------------------
| This file lets you define "hooks" to extend CI without hacking the core
| files.  Please see the user guide for info:
|
|	https://codeigniter.com/user_guide/general/hooks.html
|
*/

$hook['pre_system'] = array(
  array(
    'function' => 'print_l',
    'filename' => 'functions.php',
    'filepath' => 'hooks'
  ),
);

$hook['pre_controller'] = array(
  array(
    'class'    => 'Config',
    'function' => 'ConfigDB',
    'filename' => 'config.php',
    'filepath' => 'hooks',
    'params'   => array(1)
  ),
);