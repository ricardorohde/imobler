<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Home extends Site_Controller {
  public function __construct() {
    parent::__construct();
    $this->load->model('properties_model');
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
          array('assets/site/js/pages/home.js', true),
          //array('https://maps.googleapis.com/maps/api/js?key=AIzaSyBcMOF9dMlKAtS7un_C8yrd9i3ppeOuE3Y&region=br&language=pt-BR&libraries=places&callback=initAutocomplete', true)
        )
      ),
      'imoveis_tipos' => $this->properties_model->get_property_types()
    );

    $this->template->view('site/master', 'site/home', $data);
  }
}
