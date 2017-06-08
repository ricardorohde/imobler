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
      'property_types' => $this->site->get_filters('property_types')
    );

    $data['properties']['featured'] = $this->properties_model->get_properties(array(
      'params' => array_merge(array(
        'pagination' => array(
          'limit' => 9
        ),
        'orderby' => 'featured',
        'visibility' => true
      ))
    ));

    $data['campaigns'] = $this->registros_model->obter_registros('campanhas', array('where' => array('campanhas.status' => 1, 'campanhas_categorias.id' => 1)), false, 'campanhas.*, campanhas_categorias.nome as categoria', array(
      array('campanhas_categorias', 'campanhas.categoria = campanhas_categorias.id', 'inner')
    ));

    $this->template->view('site/master', 'site/home', $data);
  }
}
