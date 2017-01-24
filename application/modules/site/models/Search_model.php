<?php defined('BASEPATH') OR exit('No direct script access allowed');

class Search_model extends CI_Model {
  public function __construct() {
    parent::__construct();
  }

  public function get_search_url_by_location() {
    $post = $this->input->post();

    $select = array(
      'estados.sigla as estado',
      'cidades.slug as cidade'
    );

    if($post['category'] == 'district'){
      $select[] = 'bairros.slug as bairro';
    }

    $this->db->select($select);

    $this->db->from('estados');
    $this->db->join("cidades", "cidades.estado = estados.id", "inner");

    // Se for bairro
    if($post['category'] == 'city'){
      $this->db->where('cidades.id', $post['id']);
    }else if($post['category'] == 'district'){
      $this->db->join("bairros", "bairros.cidade = cidades.id", "inner");
      $this->db->where('bairros.id', $post['id']);
    }

    $query = $this->db->get();

    if ($query->num_rows() > 0) {
      $result = array_merge(array('transaction'=>$post['transaction']), $query->row_array());
      if(isset($post['type'])) $result['type'] = $post['type'];
      return json_encode(array('url'=>implode('/', $result)));
    }

  }

  public function get_regions_by_term() {

    $query = $this->db->query("
      SELECT
        cidades.id as id,
        estados.sigla as estado_sigla,
        cidades.nome as cidade_nome,
        '' as bairro_nome,
        'city' as category
      FROM
        cidades
      INNER JOIN
        estados
      ON
        cidades.estado = estados.id
      WHERE
        cidades.nome
      LIKE
        '%". $this->input->get('term') ."%'

      UNION

      SELECT
        bairros.id as id,
        estados.sigla as estado_sigla,
        cidades.nome as cidade_nome,
        bairros.nome as bairro_nome,
        'district' as category
      FROM
        bairros
      INNER JOIN
        cidades
      ON
        bairros.cidade = cidades.id
      INNER JOIN
        estados
      ON
        cidades.estado = estados.id
      WHERE
        bairros.nome
      LIKE
        '%". $this->input->get('term') ."%'
    ");

    if ($query->num_rows() > 0) {
      $return = array();

      foreach($query->result_array() as $row){
        array_push($return, array(
          'id' => $row['id'],
          'label' => ($row['category'] == 'city' ? $row['cidade_nome'] . ' ('. strtoupper($row['estado_sigla']) .')' : $row['bairro_nome'] . ' ('. $row['cidade_nome'] . ', ' . strtoupper($row['estado_sigla']) .')'),
          'category' => array(
            'slug' => $row['category'],
            'name' => ($row['category'] == 'city' ? 'Cidades' : 'Bairros')
          )
        ));
      }

      return json_encode($return);
    }

    return false;
  }
}
