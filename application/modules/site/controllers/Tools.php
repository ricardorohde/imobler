<?php defined('BASEPATH') OR exit('No direct script access allowed');

class Tools extends Site_Controller {
	function __construct() {
		parent::__construct();
		$this->output->enable_profiler(FALSE);
	}

  function configjs() {
    $this->load->view('site/configjs');
  }

  function mustache($template){
    $post = $this->input->post();
    echo $this->site->mustache($template, $post);
  }

  function images($property_id, $dimensions, $quality, $file) {
    //header('Content-type: image/jpeg');

    // $dimensions = explode('x', $dimensions);

    // $mthumb_config = array(
    //   'src' => '/Users/amadre/Projetos/imobler/assets/uploads/imoveis/3/110579637506.jpg',//FCPATH . 'assets/uploads/imoveis/' . $property_id . '/' . $file,
    //   'w' => 800,
    //   'h' => 600,
    //   'q' => 50
    // );

    // print_l($mthumb_config);

    require_once (APPPATH . 'third_party/mthumb.php');

    // header('Content-type: image/jpeg');

    // include APPPATH . 'third_party/ImageResize.php';

    // $image = new \Eventviva\ImageResize(FCPATH . 'assets/uploads/imoveis/' . $property_id . '/' . $file);

    // $dimensions = explode('x', $dimensions);
    // $image->quality_jpg = $quality;
    // $image->crop($dimensions[0], $dimensions[1]);

    // echo (string) $image;
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
          'limit' => $this->config->item('property_list_limit'),
          'page' => $page
        ),
        'visibility' => true
      ), $this->input->post())
    ));

    echo json_encode($properties);
  }

  public function login_facebook(){
    $this->load->model('account_model');
    echo json_encode($this->account_model->login_facebook());
  }

  public function login(){
    $this->load->model('account_model');
    $post = $this->input->post();
    echo json_encode($this->account_model->login($post));
  }

  public function property_favorite() {
    $this->load->model('properties_model');
    $params = $this->input->post();
    echo json_encode($this->properties_model->favorite($params));
  }

  public function set_listview() {
    if($this->input->post('listview')){
      $this->session->set_userdata('listview', $this->input->post('listview'));
    }
  }
}
