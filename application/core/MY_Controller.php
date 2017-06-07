<?php (defined('BASEPATH')) OR exit('No direct script access allowed');

// Base Controller
class Default_Controller extends MX_Controller {
  function __construct() {
    parent::__construct();
    header('Content-Type: text/html; charset=utf-8');
    $this->output->enable_profiler(FALSE);
  }
}

// Site Controller
class Site_Controller extends Default_Controller {
  function __construct() {
    parent::__construct();

    $this->load->add_package_path(APPPATH . 'modules/site/');
    $this->load->library(array('site'));

//$this->load->model(array('search_model'));
//
//$this->form_validation->set_error_delimiters('<small class="help-block">', '</small>');

//require_once(APPPATH.'libraries/MY_Form_validation.php');
  }
}

// Admin Controller
class Admin_Controller extends Default_Controller {
  function __construct() {
    parent::__construct();
//$this->load->add_package_path(APPPATH . 'modules/admin/');
//$this->load->library(array('admin', 'gravatar'));
  }
}
