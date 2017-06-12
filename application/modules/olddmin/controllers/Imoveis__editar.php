<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Imoveis__editar extends Site_Controller {
  public function __construct() {
    parent::__construct();
  }

  public function index($imovel_id = 0) {
    $acao = ($imovel_id ? 'editar' :'adicionar');

    $data = array(
      'page' => array(
        'one' => 'imoveis',
        'two' => $acao
      ),
      'form_action' => ($imovel_id ? 'admin/imoveis/'. $imovel_id .'/editar' :'admin/imoveis/adicionar'),
      'section' => array(
        'title' => ($imovel_id ? 'Editar imóvel' :'Adicionar imóvel'),
        'body_id' => 'imoveis_' . $acao,
        'body_class' => array(
        )
      ),
      'assets' => array(
        'styles' => array(
        ),
        'scripts' => array(
          array('assets/admin/js/pages/imoveis__editar.js', true)
        )
      ),
      'imoveis_tipos_segmentos' => $this->registros_model->obter_registros('imoveis_tipos_segmentos')
    );

    if($this->input->post()){
      $data['post'] = $this->input->post();
    }

    $this->template->view('admin/master', 'admin/imoveis/editar', $data);
  }

}
