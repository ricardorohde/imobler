<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Properties extends Site_Controller {
  public function list($route_params = null) {
    echo 'Lista de imóveis: ' . print_r($route_params, true);

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
        )
      )
    );

    $this->template->view('site/master', 'site/properties/properties_list', $data);
  }

  public function property_details($route_params = null) {
    echo 'Ficha do imóvel: ' . print_r($route_params, true);

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
        )
      )
    );

    $this->template->view('site/master', 'site/properties/property_details', $data);
  }

  public function compare_properties() {
    $data = array(
      'page' => array(
        'one' => 'comparar-imoveis'
      ),
      'section' => array(
        'body_id' => 'comparar-imoveis',
        'body_class' => array(
        )
      ),
      'assets' => array(
        'styles' => array(
        ),
        'scripts' => array(
        )
      )
    );

    $this->template->view('site/master', 'site/properties/compare_properties', $data);
  }

  public function add_properties() {
    $data = array(
      'page' => array(
        'one' => 'anunciar-imoveis'
      ),
      'section' => array(
        'body_id' => 'anunciar-imoveis',
        'body_class' => array(
        )
      ),
      'assets' => array(
        'styles' => array(
        ),
        'scripts' => array(
        )
      )
    );

    $this->template->view('site/master', 'site/properties/add_properties', $data);
  }



  public function property_details_redirect($property_term, $field){
    echo 'Redirect para Ficha do imóvel: ' . $property_term . ' - (' . $field . ')';
  }
}
