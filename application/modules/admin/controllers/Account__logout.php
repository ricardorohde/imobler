<?php defined('BASEPATH') OR exit('No direct script access allowed');

class Account__logout extends Admin_Controller {
  function __construct() {
    parent::__construct();
  }

  public function index() {
    $this->session->sess_destroy();
    redirect(base_url('admin/login'), 'location');
  }
}