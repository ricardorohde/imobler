<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Account__forgot_password extends Admin_Controller {
  function __construct() {
    parent::__construct();
  }

  function index() {
    $data = array(
      'page' => array(
        'one' => 'account',
        'one' => 'forgot-password'
      ),

      'section' => array(),

      'assets' => array(
        'styles' => array(
        ),

        'scripts' => array(
        ),

        'script_page' => ''
      )
    );

    $this->template->view('admin/base', 'admin/account/forgot-password', $data);
  }
}