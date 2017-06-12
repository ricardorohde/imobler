<?php defined('BASEPATH') OR exit('No direct script access allowed');

class Tools extends Site_Controller {
	function __construct() {
		parent::__construct();
		$this->output->enable_profiler(FALSE);
	}

	function configjs() {
		$this->load->view('admin/configjs');
	}

  function menu_pin($status) {

    if($status == 'true'){
      $status = 'fixed';
      set_cookie('menu-pin', true, (60*60*24*30*3), '', '/admin');
    }else{
      $status = 'unfixed';
      delete_cookie('menu-pin', '', '/admin');
    }

    echo json_encode(array('status' => $status));
  }
}