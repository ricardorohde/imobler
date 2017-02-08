<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Site {
  function __construct(){
    $this->ci =& get_instance();

    // Tentar Autologin
    if(!$this->ci->session->userdata('tentativa_autologin')){
      $this->autologin();
    }
  }

  public function autologin(){
    if($this->user_logged(FALSE)){
      $this->ci->load->model('account_model');

      $get_cookie = get_cookie($this->ci->config->item('login_cookie_name'));
      if($get_cookie){
        if($usuario = $this->ci->account_model->login(array('login_cookie' => $get_cookie))){
          $this->ci->account_model->login_process($usuario);
        }else{
          $this->ci->session->set_userdata('tentativa_autologin', true);
        }
      }else{
        $this->ci->session->set_userdata('tentativa_autologin', true);
      }
    }
  }

  public function mustache($template, $data){
    require_once APPPATH.'third_party/Mustache/Autoloader.php';

    Mustache_Autoloader::register();

    $entry = new Mustache_Engine;

    $this->ci->load->helper('file');
    $template = read_file("application/modules/site/views/includes/templates/" . $template);

    $data['base_url'] = base_url();

    $rendered = $entry->render($template, $data);

    return $rendered;
  }

  public function get_property_url($property = 0){
    $this->ci->load->model('properties_model');
    return $this->ci->properties_model->get_property_permalink($property);
  }

  public function get_filter($item, $params = array()) {
    $return = '';

    if($item == 'property_types'){
      $return = $this->ci->properties_model->get_property_types($params);
    }

    if($item == 'property_location'){
      $return = $this->ci->properties_model->get_location($params);
    }

    if($item == 'property_features'){
      $return = $this->ci->properties_model->get_properties_features(array(), true);
    }

    return $return;
  }

  public function get_filters($item = 'all', $params = array()){
    $this->ci->load->model('properties_model');

    if($item != 'all'){
      $return = $this->get_filter($item, $params);
    }else{
      foreach(array('property_types', 'property_location', 'property_features') as $filter){
        $return[$filter] = $this->get_filter($filter, $params);
      }
    }

    return $return;
  }

  public function get_templates($templates = array()) {
    if(!empty($templates)){
      foreach ($templates as $template) {
        ?>
        <script id="template__<?php echo $template; ?>" type="x-tmpl-mustache">
          <?php $this->ci->load->view('site/includes/templates/'. $template .'.mustache'); ?>
        </script>
        <?php
      }
    }
  }

  public function create_pagination($limit, $total_rows, $base_url, $url_suffix = null){
    $this->ci->load->library('pagination');

    $config = array();
    $config["base_url"] = $base_url; // Set base_url for every links
    if($url_suffix){
      $config['suffix'] = '#filter' . base64_encode($url_suffix);//$url_suffix;
      $config['first_url'] = $config['base_url'] . $config['suffix'];
    }
    $config["total_rows"] = $total_rows; // Set total rows in the result set you are creating pagination for.
    $config["per_page"] = $limit; // Number of items you intend to show per page.
    $config['reuse_query_string'] = TRUE;
    $config['use_page_numbers'] = TRUE; // Use pagination number for anchor URL.
    $config['num_links'] = 5; //Set that how many number of pages you want to view.
    $config['full_tag_open'] = '<hr><div class="pagination-main"><ul class="pagination">';
    $config['full_tag_close'] = '</ul></div><!--pagination-->';
    $config['first_link'] = '<i class="fa fa-angle-double-left" aria-hidden="true"></i>';
    $config['first_tag_open'] = '<li class="prev page">';
    $config['first_tag_close'] = '</li>';
    $config['last_link'] = '<i class="fa fa-angle-double-right" aria-hidden="true"></i>';
    $config['last_tag_open'] = '<li class="next page">';
    $config['last_tag_close'] = '</li>';
    $config['next_link'] = '<span aria-hidden="true"><i class="fa fa-angle-right"></i></span>';
    $config['next_tag_open'] = '<li class="next page">';
    $config['next_tag_close'] = '</li>';
    $config['prev_link'] = '<span aria-hidden="true"><i class="fa fa-angle-left"></i></span>';
    $config['prev_tag_open'] = '<li class="prev page">';
    $config['prev_tag_close'] = '</li>';
    $config['cur_tag_open'] = '<li class="active"><a>';
    $config['cur_tag_close'] = '</a></li>';
    $config['num_tag_open'] = '<li class="page">';
    $config['num_tag_close'] = '</li>';
    $config['anchor_class'] = 'follow_link';
    $config['attributes'] = array('class' => 'pagination-item');

    // To initialize "$config" array and set to pagination library.
    $this->ci->pagination->initialize($config);

    return $this->ci->pagination->create_links();
  }

  public function user_logged($condition = TRUE, $redirect = NULL, $section = 'usuario_logado'){
    $login_check = $this->ci->session->userdata($section);
    $is_logged = $login_check ? TRUE : FALSE;

    if($is_logged == $condition){
      if($redirect){
        if($redirect === TRUE){
          $redirect = 'minha-conta/login';
        }
        $this->ci->session->set_flashdata('redirect', base_url($this->ci->uri->uri_string()));
        redirect(base_url($redirect), 'location');
      }
      return TRUE;
    }
    return FALSE;
  }

  public function userinfo($slug, $section = 'usuario_logado'){
    if($this->user_logged(TRUE, NULL, $section)){
      $usuario = $this->ci->session->userdata($section);
      if(isset($usuario[$slug])){
        return $usuario[$slug];
      }
    }
    return false;
  }

}
