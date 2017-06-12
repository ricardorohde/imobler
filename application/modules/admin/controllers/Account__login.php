<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Account__login extends Admin_Controller {
  function __construct() {
    parent::__construct();
  }

  function index() {
    $data = array(
      'page' => array(
        'one' => 'account',
        'one' => 'login'
      ),

      'section' => array(),

      'assets' => array(
        'styles' => array(
        ),

        'scripts' => array(
          array('plugins/jquery-validation/js/jquery.validate.min.js')
        ),

        'script_page' => 'js/login.js'
      )
    );

    if($this->input->post()){
      $data['post'] = $this->input->post();

      $obter_usuario = $this->registros_model->obter_registros(
        'usuarios',
        array(
          'where' => array(
            'usuarios.status' => 1,
            'usuarios.perfil >' => 2,
            'usuarios.email' => $data['post']['email'],
            'usuarios.senha' => md5($data['post']['senha'])
          )
        ),
        true,
        '
          usuarios.id,
          usuarios.nome,
          usuarios.sobrenome,
          usuarios.email,
          usuarios.imagem,
          usuarios.status,
          usuarios_perfis.id as perfil_id,
          usuarios_perfis.nome as perfil_nome
        ',
        array(
          array(
            'usuarios_perfis',
            'usuarios.perfil = usuarios_perfis.id',
            'inner'
          )
        )
      );

      if($obter_usuario){
        $this->session->set_userdata('admin_logado', $obter_usuario);
        redirect($this->admin->get_redirect('admin'), 'location');
        exit;
      }else{
        $data = array_merge($data, array(
          'alerta' => array(
            'type' => 'danger',
            'message' => 'E-mail e/ou senha inválidos. Usuário não encontrado.',
            'status' => 'visible'
          )
        ));
      }
    }

    $this->template->view('admin/base', 'admin/account/login', $data);
  }
}
