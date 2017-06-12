<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Properties__edit extends Admin_Controller {
  function __construct() {
    parent::__construct();
  }

  function index($property_id = null) {
    $data = array(
      'page' => array(
        'one' => 'properties',
        'two' => ($property_id ? 'edit' : 'add')
      ),

      'section' => array(),

      'assets' => array(
        'styles' => array(
        ),

        'scripts' => array(
          array('plugins/jquery.mask/jquery.mask.min.js'),
          array('https://maps.googleapis.com/maps/api/js?key='. $this->config->item('google_api_key') .'&callback=properties_edit__init_mapa', array('attributes' => array('async', 'defer')))
        ),

        'script_page' => 'js/properties_edit.js'
      ),

      'estados' => $this->registros_model->obter_registros('estados'),
      'caracteristicas' => $this->registros_model->obter_registros('caracteristicas')
    );

    $imoveis_tipos_segmentos = $this->registros_model->obter_registros('imoveis_tipos', array(), false, '
      imoveis_tipos.id,
      imoveis_tipos.nome,
      imoveis_tipos.slug,
      imoveis_tipos_segmentos.nome as segmento,
      imoveis_tipos_segmentos.slug as segmento_slug,
    ', array(
      array('imoveis_tipos_segmentos', 'imoveis_tipos.segmento = imoveis_tipos_segmentos.id', 'inner')
    ), array('imoveis_tipos_segmentos.ordem' => 'ASC', 'imoveis_tipos.ordem' => 'ASC', ));

    $imoveis_tipos = array();
    foreach($imoveis_tipos_segmentos as $tipo) {
        $imoveis_tipos[$tipo['segmento_slug']]['nome'] = $tipo['segmento'];
        $imoveis_tipos[$tipo['segmento_slug']]['tipos'][] = $tipo;
    }

    $data['imoveis_tipos'] = $imoveis_tipos;

    $this->template->view('admin/master', 'admin/properties/edit', $data);
  }
}