<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Config {
    public function __construct(){
        $this->CI = & get_instance();
    }

    public function ConfigDB(){
        $config = $this->CI->db->get_where(
            'configuracoes',
            array(
                'inicio' => 1,
                'status' => 1
            )
        );
        if($config->num_rows()){
            foreach($config->result() as $config_item){
                $config_item = get_object_vars($config_item);
                $this->CI->config->set_item($config_item["chave"], $config_item["valor"]);
            }
        }
    }
}