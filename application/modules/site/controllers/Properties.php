<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Properties extends Site_Controller {
  public function __construct() {
    parent::__construct();
    $this->load->model('properties_model');
  }

  public function list($route_params = null, $page = 1) {
    $route_params = json_decode($route_params, true);

    $properties = $this->properties_model->get_properties(array(
      'params' => array_merge(array(
        'pagination' => array(
          'limit' => $this->config->item('property_list_limit'),
          'page' => $page
        ),
        'visibility' => true
      ), $route_params)
    ));

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
          array('assets/site/js/jquery.mask.js', true),
          array('assets/site/js/select2.js', true),
          array('assets/site/js/mustache.js', true),
          array('assets/site/js/base64.js', true),
          array('assets/site/js/pages/properties_list.js', true)
        )
      ),
      'paging' => $page,
      'filters' => $this->site->get_filters('all', array('params' => $route_params)),
      'properties' => $properties,
      'route_params' => $route_params
    );

    $this->template->view('site/master', 'site/properties/properties_list', $data);
  }

  public function property_details($route_params = null) {
    $route_params = json_decode($route_params, true);

    $property = $this->properties_model->get_properties(array(
      'params' => array_merge(array(
        'visibility' => true
      ), $route_params)
    ), TRUE);

    // print_l($property);

    if(isset($route_params['route_type']) && $route_params['route_type'] == 'structure' && isset($property['negociacao_permalink']) && !empty($property['negociacao_permalink'])){
      redirect($this->properties_model->get_property_permalink($property), 'location', 301);
      exit;
    }

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
          array('assets/site/js/slick.min.js', true),
          array('assets/site/js/jquery.prettyPhoto.js', true),
          array('assets/site/js/pages/property_details.js', true),
          array('https://maps.googleapis.com/maps/api/js?key=AIzaSyANK5keJe6la_A-bWPQg4IP8mEv5WywRHY&libraries=places&callback=app.property_detail.mapa', true)
        )
      ),
      'property' => $property
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
    redirect($this->site->get_property_url($property_term), 'location');
  }
}
