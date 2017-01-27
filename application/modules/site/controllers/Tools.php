<?php defined('BASEPATH') OR exit('No direct script access allowed');

class Tools extends Site_Controller {
	function __construct() {
		parent::__construct();
		$this->output->enable_profiler(FALSE);
	}

  function configjs() {
    $this->load->view('site/configjs');
  }

  function images($property_id, $dimensions, $quality, $file) {
    header('Content-type: image/jpeg');

    include APPPATH . 'third_party/ImageResize.php';

    $image = new \Eventviva\ImageResize(FCPATH . 'assets/uploads/imoveis/' . $property_id . '/' . $file);

    $dimensions = explode('x', $dimensions);
    $image->quality_jpg = $quality;
    $image->resize($dimensions[0], $dimensions[1]);

    echo (string) $image;
  }

	public function get_locations(){
    header('Content-Type: application/json');
    $this->load->model('properties_model');
    echo $this->properties_model->get_locations_by_term();
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