<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Site {
  function __construct(){
    $this->ci =& get_instance();
  }

  public function get_property_url($property_id){
    return base_url('imovel/apartamento-a-venda-2-dormitorios-vila-hortolandia-54m2-RS198000-id-7646');
  }

}