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

  public function get_full_location(){
    header('Content-Type: application/json');
    $this->load->model('properties_model');
    echo $this->properties_model->get_full_location();
  }

	public function get_locations(){
    header('Content-Type: application/json');
    $this->load->model('search_model');
    echo $this->search_model->get_regions_by_term();
  }

  public function get_properties($page = 1){
    $this->load->model('properties_model');

    $properties = $this->properties_model->get_properties(array(
      'params' => array_merge(array(
        'pagination' => array(
          'limit' => 1,
          'page' => $page
        ),
        'visibility' => true
      ), $this->input->post())
    ));

    echo json_encode($properties);
  }
}