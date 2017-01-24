<?php defined('BASEPATH') OR exit('No direct script access allowed');

class Tools extends Site_Controller {
	function __construct() {
		parent::__construct();
		$this->output->enable_profiler(FALSE);
	}

	function configjs() {
		$this->load->view('site/configjs');
	}

	public function get_search_url_by_location(){
		header('Content-Type: application/json');
    $this->load->model('search_model');
    echo $this->search_model->get_search_url_by_location();
	}

	public function get_locations(){
		header('Content-Type: application/json');
    $this->load->model('search_model');
    echo $this->search_model->get_regions_by_term();
	}
}