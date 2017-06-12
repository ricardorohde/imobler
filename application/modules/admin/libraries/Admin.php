<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Admin {
  function __construct(){
    $this->ci =& get_instance();
  }

  public function usuario_logado($condicao = TRUE, $redirecionar = NULL, $sessao_nome = 'admin_logado'){
    $checa_login = $this->ci->session->userdata($sessao_nome);
    $usuario_logado = $checa_login ? TRUE : FALSE;

    if($usuario_logado == $condicao){
      if($redirecionar){
        if($redirecionar === TRUE){
          $redirecionar = "admin/login";
        }
        $this->ci->session->set_tempdata('redirect', base_url($this->ci->uri->uri_string()), 180);
        redirect(base_url($redirecionar), 'location');
      }
      return TRUE;
    }
    return FALSE;
  }

  public function userinfo($slug){
    if($this->usuario_logado()){
      $usuario = $this->ci->session->userdata('admin_logado');
      if(isset($usuario[$slug])){
        return $usuario[$slug];
      }
    }
  }

  public function get_redirect($local = null) {
    $redirect = base_url($local ? $local : '');
    if($this->ci->input->post("redirect")) {
      $redirect = $this->ci->input->post("redirect");
    }else{
      if($this->ci->session->tempdata('redirect')) {
        $redirect = $this->ci->session->tempdata('redirect');
        $this->ci->session->unset_tempdata('redirect');
      }
    }
    return $redirect;
  }

  public function form_error($erros){
    $return = array();
    $erro_item = '';
    if($erros){
      foreach($erros as $key => $value){
        $erro_item .= '&bull; ' . $value . '<br>';
        $return['erros'][$key] = $value;
      }
    }

    $return['alerta'] = array(
      'type' => 'danger',
      'message' => $erro_item,
      'status' => 'visible'
    );

    return $return;
  }

  public function alerta_redirect($alertaClass = 'danger', $mensagem = 'Ocorreu um erro inesperado.', $redirect = null, $status = 'visible', $extraClass = array()){
    $alerta = array(
      'alerta' => array(
        'type' => $alertaClass,
        'message' => $mensagem,
        'status' => $status,
        'class' => $extraClass
      )
    );

    if($redirect){
      $this->ci->session->set_flashdata('alerta', $alerta);
      $redirect = (strpos($redirect, '//') === false) ? base_url($redirect) : $redirect;
      redirect($redirect, 'location');
      exit;
    }

    return $alerta;
  }

  // public function enviar_email($destinatario, $assunto, $template_slug, $parametros = array(), $header = false){
  //   // Inicia helper de acesso ao template do e-mail
  //   $this->ci->load->helper('file');
  //   $template_path = "assets/site/emails/" . $template_slug;
  //   $template = read_file($template_path . '/template.html');

  //   if($parametros){
  //     foreach($parametros as $chave => $valor){
  //       $template = str_replace('{{'. $chave .'}}', $valor, $template);
  //     }
  //   }
  //   $template = str_replace("{{site_nome}}", $this->ci->config->item('site_nome'), $template);
  //   $template = str_replace("{{site_email}}", $this->ci->config->item('site_email'), $template);
  //   $template = str_replace("{{site_sigla}}", $this->ci->config->item('site_sigla'), $template);
  //   $template = str_replace("{{data_hora}}", date("d/m/Y H:i", time()), $template);
  //   $template = str_replace("{{template_url}}", base_url($template_path), $template);
  //   $template = str_replace("{{base_url}}", base_url(), $template);

  //   // Inicia class de envio de e-mail
  //   $this->ci->load->library('email');
  //   $this->ci->email->initialize(array('mailtype'=>'html'));

  //   $this->ci->email->from($this->ci->config->item('site_email_envio'), $this->ci->config->item('site_nome'), $this->ci->config->item('site_email_envio'));
  //   $this->ci->email->to($destinatario);
  //   //$this->ci->email->reply_to($post["email"], $post["nome"]);
  //   //$this->ci->email->bcc('desenvolvedor@digitalaction.com.br', 'Digital Action - Desenvolvedor');

  //   $this->ci->email->subject($assunto);
  //   $this->ci->email->message($template);

  //  //return $this->ci->email->send();
  // }

  // public function enviar_email_admin($assunto, $mensagem, $local = null){
  //   $this->ci->load->library('email');
  //   $this->ci->email->initialize(array('mailtype'=>'html'));

  //   $this->ci->email->from($this->ci->config->item('site_email_envio'), $this->ci->config->item('site_nome'), $this->ci->config->item('site_email_envio'));
  //   $this->ci->email->to($this->ci->config->item('site_email'));

  //   $mensagem_body = '<p>Mensagem:<br />' . nl2br($mensagem) . '</p>';
  //   if($local){
  //     $mensagem_body .= '<p>Local:<br />' . $local . '</p>';
  //   }
  //   $mensagem_body .= '<p>Data:<br />' . date("d/m/Y H:i", time()) . '</p>';

  //   $this->ci->email->subject($assunto);
  //   $this->ci->email->message($mensagem_body);

  //   //return $this->ci->email->send();
  // }
}