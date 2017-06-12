<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Home extends Site_Controller {
  public function __construct() {
    parent::__construct();
    // $this->load->model('properties_model');
  }

  public function index() {
    $data = array(
      'page' => array(
        'one' => 'home'
      ),
      'section' => array(
        'body_id' => 'home',
        'body_class' => array(
        )
      ),
      'assets' => array(
        'styles' => array(
        ),
        'scripts' => array(
          array('assets/admin/vendor/raphael/raphael.min.js', true),
          array('assets/admin/vendor/morrisjs/morris.min.js', true),
          array('assets/admin/data/morris-data.js', true),
        )
      )
    );

    $this->template->view('admin/master', 'admin/home', $data);
  }
}
