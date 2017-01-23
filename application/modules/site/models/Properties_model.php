<?php defined('BASEPATH') OR exit('No direct script access allowed');

class Properties_model extends CI_Model {
  public function __construct() {
    parent::__construct();
  }

  public function get_property_types() {
    $this->db->select("imoveis_tipos.*, imoveis_tipos_segmentos.id as segmento_id, imoveis_tipos_segmentos.nome as segmento_nome, imoveis_tipos_segmentos.slug as segmento_slug");

    $this->db->join("imoveis_tipos_segmentos", "imoveis_tipos.segmento = imoveis_tipos_segmentos.id", "inner");

    $this->db->order_by('imoveis_tipos_segmentos.ordem ASC, imoveis_tipos.ordem ASC');

    $query = $this->db->get("imoveis_tipos");

    if ($query->num_rows() > 0) {
      $result_array = array();

      foreach($query->result_array() as $result){
        if(!isset($result_array[$result['segmento_slug']])){
          $result_array[$result['segmento_slug']] = array(
            'segmento' => $result['segmento_nome'],
            'tipos' => array()
          );
        }

        $result_array[$result['segmento_slug']]['tipos'][] = array(
          'id' => $result['id'],
          'nome' => $result['nome'],
          'slug' => $result['slug'],
        );
      }

      return $result_array;
    }

    return false;
  }

  // public function get_rows_count($sql){
  //   $query = $this->db->query($sql);
  //   return $query->num_rows();
  // }

  // public function get_properties($params = array(), $limit = false, $offset = false, $select = '', $join = array(), $order = false, $row = false){
  //   // SELECT
  //   $select = !empty($select) ? $select : "
  //     imoveis.*,
  //     tipos_de_imoveis.nome as tipo_nome,
  //     imoveis_imagens.arquivo as imovel_imagem
  //   ";
  //   $this->db->select($select);

  //   // FROM
  //   $this->db->from('imoveis');

  //   // JOIN
  //   if($join){
  //     foreach($join as $join_item){
  //       $this->db->join($join_item[0], $join_item[1], $join_item[2]);
  //     }
  //   }else{
  //     $this->db->join("tipos_de_imoveis", "imoveis.tipo_de_imovel = tipos_de_imoveis.id", "inner");
  //     $this->db->join("imoveis_imagens", "imoveis_imagens.imovel = imoveis.id", "left");

  //   }

  //   // WHERE
  //   if($params){
  //     foreach($params as $key => $value){
  //       if(is_array($value)){
  //         foreach($value as $value_item){
  //           $this->db->where($key, $value_item);
  //         }
  //       }else{
  //         $this->db->where($key, $value);
  //       }
  //     }
  //   }
  //   $this->db->where('imoveis.status', 1);

  //   if($order){
  //     if($order === 'rand'){
  //       $this->db->order_by('rand()');
  //     }else{
  //       $this->db->order_by($order);
  //     }
  //   }

  //   $this->db->group_by('imoveis.id');

  //   if($limit){
  //     if($offset){
  //       $paginar = true;
  //       $total_rows = $this->get_rows_count($this->db->_compile_select());

  //       $start = max(0, ( $offset -1 ) * $limit);

  //       $this->db->limit($limit, $start);
  //     }else{
  //       $this->db->limit($limit);
  //     }
  //   }

  //   $query = $this->db->get();
  //   if ($query->num_rows() > 0) {
  //     if($row){
  //       return $query->row_array();
  //     }

  //     if(isset($paginar) && $paginar){
  //       $arr_return = array(
  //         'total_rows' => $total_rows,
  //         'results' => $query->result_array()
  //       );
  //       return $arr_return;
  //     }else{
  //       return $query->result_array();
  //     }


  //   }
  //   return false;
  // }

  // public function get_properties_images($property_id) {
  //   $this->db->select("*");

  //   $this->db->where('imoveis_imagens.imovel', $property_id);

  //   $query = $this->db->get("imoveis_imagens");

  //   if ($query->num_rows() > 0) {
  //     return $query->result_array();
  //   }

  //   return false;
  // }

  // public function get_property_url($property_id){
  //   $property = $this->get_properties(array('imoveis.id' => $property_id), false, false,'
  //       imoveis.id,
  //       imoveis.permalink,
  //       imoveis.dormitorios,
  //       imoveis.suites,
  //       imoveis.garagens,
  //       imoveis.area,
  //       imoveis.valor,
  //       cidades.slug AS cidade,
  //       bairros.slug AS bairro,
  //       tipos_de_imoveis.slug AS tipo_de_imovel
  //     ', array(
  //     array('tipos_de_imoveis', 'imoveis.tipo_de_imovel = tipos_de_imoveis.id', 'inner'),
  //     array('cidades', 'imoveis.cidade = cidades.id', 'inner'),
  //     array('bairros', 'imoveis.bairro = bairros.id', 'inner')
  //   ), false, true);

  //   $permalink = $property['permalink'];

  //   if($property && empty($permalink)){
  //     $permalink = "/imoveis-a-venda/" . $property['cidade'] . "/" . $property['bairro'] . "/" . $property['tipo_de_imovel'] . "/" . $property['id'] . "/";
  //   }

  //   return base_url($permalink);
  // }

}