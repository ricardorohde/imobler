<?php defined('BASEPATH') OR exit('No direct script access allowed');

class Properties_model extends CI_Model {
  public function __construct() {
    parent::__construct();
  }

  public function get_rows_count($sql){
    $query = $this->db->query($sql);
    return $query->num_rows();
  }

  public function get_properties($request = array(), $row = false){
    $return = array();
    $where = array();

    if(isset($request['params']['property_id'])){
      $this->db->where('imoveis.id', $request['params']['property_id']);
    }

    // SELECT
    $this->db->select((isset($request['select']) ? $request['select'] : "
      imoveis.id as imovel_id,
      imoveis.dormitorios as imovel_dormitorios,
      imoveis.banheiros as imovel_banheiros,
      imoveis.garagens as imovel_garagens,
      imoveis.status as imovel_status,
      imoveis_tipos.nome as tipo_nome,
      imoveis_tipos.slug as tipo_slug,
      imoveis_negociacoes.valor as negociacao_valor,
      imoveis_negociacoes.permalink as negociacao_permalink,
      enderecos.cep as endereco_cep,
      enderecos.logradouro as endereco_logradouro,
      enderecos.numero as endereco_numero,
      enderecos.latitude as endereco_latitude,
      enderecos.longitude as endereco_longitude,
      enderecos.latitude_site as endereco_latitude_site,
      enderecos.longitude_site as endereco_longitude_site,
      estados.nome as estado_nome,
      UCASE(estados.sigla) as estado_sigla,
      estados.sigla as estado_slug,
      cidades.nome as cidade_nome,
      cidades.slug as cidade_slug,
      bairros.nome as bairro_nome,
      bairros.slug as bairro_slug,
      transacoes.nome as transacao_nome,
      transacoes.slug as transacao_slug,
      periodos.nome as periodo_nome
    "));

    // FROM
    $this->db->from('imoveis');

    // JOINS
    $this->db->join("imoveis_tipos", "imoveis.tipo = imoveis_tipos.id", "inner"); // Negociações
    $this->db->join("imoveis_negociacoes", "imoveis_negociacoes.imovel = imoveis.id", "inner"); // Negociações
    $this->db->join("periodos", "imoveis_negociacoes.periodo = periodos.id", "inner"); // Períodos
    $this->db->join("transacoes", "imoveis_negociacoes.transacao = transacoes.id", "inner"); // Transações
    $this->db->join("imoveis_enderecos", "imoveis_enderecos.imovel = imoveis.id", "inner"); // Endereços (Relação)
    $this->db->join("enderecos", "imoveis_enderecos.endereco = enderecos.id", "inner"); // Endereços
    $this->db->join("estados", "enderecos.estado = estados.id", "inner"); // Estados
    $this->db->join("cidades", "enderecos.cidade = cidades.id", "inner"); // Cidades
    $this->db->join("bairros", "enderecos.bairro = bairros.id", "inner"); // Bairros

    // Tipo de imóvel
    if(isset($request['params']['property_type']) && !empty($request['params']['property_type'])){
      $this->db->where_in('imoveis_tipos.slug', $request['params']['property_type']);
    }

    // Estado
    if(isset($request['params']['state']) && !empty($request['params']['state'])){
      $this->db->where_in('estados.sigla', $request['params']['state']);
    }

    // Cidade
    if(isset($request['params']['city']) && !empty($request['params']['city'])){
      $this->db->where_in('cidades.slug', $request['params']['city']);
    }

    // Bairro
    if(isset($request['params']['district']) && !empty($request['params']['district'])){
      $this->db->where_in('bairros.slug', $request['params']['district']);
    }

    // Transação
    if(isset($request['params']['transaction']) && !empty($request['params']['transaction'])){
      $this->db->where_in('transacoes.slug', $request['params']['transaction']);
    }

    // Preço Mínimo
    if(isset($request['params']['min_price']) && !empty($request['params']['min_price'])){
      $this->db->where('imoveis_negociacoes.valor >=', preg_replace("/[^0-9]/", "", $request['params']['min_price']));
    }

    // Preço Máximo
    if(isset($request['params']['max_price']) && !empty($request['params']['max_price'])){
      $this->db->where('imoveis_negociacoes.valor <=', preg_replace("/[^0-9]/", "", $request['params']['max_price']));
    }

    // Área mínima
    if(isset($request['params']['min_area']) && !empty($request['params']['min_area'])){
      $this->db->where('imoveis.area_util >=', preg_replace("/[^0-9]/", "", $request['params']['min_area']));
    }

    // Área máxima
    if(isset($request['params']['max_area']) && !empty($request['params']['max_area'])){
      $this->db->where('imoveis.area_util <=', preg_replace("/[^0-9]/", "", $request['params']['max_area']));
    }

    // Dormitórios
    if(isset($request['params']['bedrooms']) && !empty($request['params']['bedrooms'])){
      $this->db->where('imoveis.dormitorios >=', $request['params']['bedrooms']);
    }

    // Banheiros
    if(isset($request['params']['bathrooms']) && !empty($request['params']['bathrooms'])){
      $this->db->where('imoveis.banheiros >=', $request['params']['bathrooms']);
    }

    // Garagens
    if(isset($request['params']['garages']) && !empty($request['params']['garages'])){
      $this->db->where('imoveis.garagens >=', $request['params']['garages']);
    }

    // Visibilidade no site
    if(isset($request['params']['visibility']) && !empty($request['params']['visibility'])){
      $this->db->where('imoveis.status', $request['params']['visibility']);
    }

    // WHERE
    if(isset($request['select']['where']) && !empty($request['select']['where'])){
      $this->db->where($request['select']['where']);
    }

    // GET ROWS COUNT
    $return['total_rows'] = $this->get_rows_count($this->db->_compile_select());

    // PAGINATION
    if(isset($request['params']['pagination']) && !empty($request['params']['pagination'])){
      if(isset($request['params']['pagination']['limit']) && !empty($request['params']['pagination']['limit'])){
        $limit = (isset($request['params']['pagination']['limit']) && !empty($request['params']['pagination']['limit']) ? $request['params']['pagination']['limit'] : 12);

        if(isset($request['params']['pagination']['page']) && !empty($request['params']['pagination']['page'])){
          $page = max(0, ($request['params']['pagination']['page'] - 1) * $limit);

          $return['pagination'] = $this->site->create_pagination($limit, $return['total_rows'], rtrim(current_url(), "/" . $request['params']['pagination']['page']));
        }
      }
    }

    if(isset($limit) && !empty($limit)){
      if(isset($page) && !empty($page)){
        $this->db->limit($limit, $page);
      }else{
        $this->db->limit($limit);
      }
    }

    $query = $this->db->get();

    if($query->num_rows()){
      if($row){
        $return = $query->row_array();
        $return_ids = $return['imovel_id'];
      }else{
        $return['results'] = array();
        $return_ids = array();
        $return_count = 0;
        foreach($query->result_array() as $result){
          $return['results'][$return_count] = $result;
          $return['results'][$return_count]['imovel_permalink'] = $this->site->get_property_url($result);
          $return_ids[$return_count] = $result['imovel_id'];
          $return_count++;
        }
      }

      return $this->get_properties_images($return_ids, $return);
    }else{
      return false;
    }
  }

  public function get_properties_images($properties_ids, $return = null) {
    $this->db->select("*");

    $this->db->where_in('imoveis_imagens.imovel', $properties_ids);

    $this->db->order_by('imoveis_imagens.padrao DESC, imoveis_imagens.ordem ASC');

    $query = $this->db->get("imoveis_imagens");

    if ($query->num_rows() > 0) {
      if($return){
        foreach ($query->result_array() as $imovel_imagem) {
          $property_key = array_search ($imovel_imagem['imovel'], $properties_ids);
          $return['results'][$property_key]['imagens'][] = array(
            'arquivo' => $imovel_imagem['arquivo'],
            'legenda' => $imovel_imagem['legenda']
          );
        }
        return $return;
      }

      return $query->result_array();
    }else{
      if($return) return $return;
    }

    return false;
  }

  public function get_location($request = array()) {
    $this->db->from('estados');

    if(isset($request['params']['state'])){
      $this->db->select('UCASE(estados.sigla) as state_name, estados.sigla as state');
      $this->db->where('estados.sigla', $request['params']['state']);
      $label = '%state_name%';
    }

    if(isset($request['params']['city'])){
      $this->db->select('cidades.nome as city_name, cidades.slug as city');
      $this->db->where('cidades.slug', $request['params']['city']);
      $this->db->join("cidades", "cidades.estado = estados.id", "inner");
      $label = '%city_name% (%state_name%)';
    }

    if(isset($request['params']['district'])){
      $this->db->select('bairros.nome as district_name, bairros.slug as district');
      $this->db->where('bairros.slug', $request['params']['district']);
      $this->db->join("bairros", "bairros.cidade = cidades.id", "inner");
      $label = '%district_name% (%city_name%, %state_name%)';
    }

    $query = $this->db->get();

    if ($query->num_rows() > 0) {
      $row = $query->row_array();
      $location = array();
      foreach ($row as $key => $value) {
        $label = str_replace('%'.$key.'%', $value, $label);
        if(in_array($key, array('state', 'city', 'district'))){
          $location[$key] = $value;
        }
      }

      $result = array(
        'location' => $location,
        'label' => $label
      );

      return $result;
    }

    return false;
  }

  public function get_property_permalink($property){
    if (is_array($property) && isset($property['imovel_id']) && !empty($property['imovel_id'])) {
        $sample = true;
    } else {
        $property = $this->get_properties(array('params' => array('property_id' => $property)), true);
        $sample = false;
    }

    if(empty($property['imovel_id'])) {
      return false;
    }

    if(!empty($property['negociacao_permalink'])){
      return base_url($this->config->item('property_detail_url_prefix') . '/' . $property['negociacao_permalink']);
    }

    $url = array($this->config->item('property_detail_url_prefix'));
    $url_parts = array('estado_slug', 'cidade_slug', 'bairro_slug', 'tipo_slug', 'imovel_id');
    foreach($url_parts as $part){
      $url[] = $property[$part];
    }

    return base_url(implode('/', $url));
  }

  public function get_property_types($request = array()) {
    $this->db->select("imoveis_tipos.*, imoveis_tipos_segmentos.id as segmento_id, imoveis_tipos_segmentos.nome as segmento_nome, imoveis_tipos_segmentos.slug as segmento_slug");

    $this->db->join("imoveis_tipos_segmentos", "imoveis_tipos.segmento = imoveis_tipos_segmentos.id", "inner");

    $this->db->order_by('imoveis_tipos_segmentos.ordem ASC, imoveis_tipos.ordem ASC');

    $query = $this->db->get("imoveis_tipos");

    if ($query->num_rows() > 0) {
      $result_array = array();

      $count = array();
      foreach($query->result_array() as $result){
        if(!isset($result_array[$result['segmento_slug']])){
          $result_array[$result['segmento_slug']] = array(
            'segmento' => $result['segmento_nome'],
            'tipos' => array()
          );
          $count[$result['segmento_slug']] = 0;
        }

        $result_array[$result['segmento_slug']]['tipos'][$count[$result['segmento_slug']]] = array(
          'id' => $result['id'],
          'nome' => $result['nome'],
          'slug' => $result['slug']
        );

        if(isset($request['params']['property_type']) && $request['params']['property_type'] === $result['slug']){
          $result_array[$result['segmento_slug']]['tipos'][$count[$result['segmento_slug']]]['active'] = true;
        }

        $count[$result['segmento_slug']] = ($count[$result['segmento_slug']] + 1);
      }

      return $result_array;
    }

    return false;
  }

  public function get_locations_by_term() {

    $this->db->select("
      UCASE(estados.sigla) as estado_sigla,
      estados.sigla as estado_slug,
      cidades.nome as cidade_nome,
      cidades.slug as cidade_slug,
      '' as bairro_nome,
      '' as bairro_slug,
      'city' as category
    ");

    $this->db->from('estados');
    $this->db->join("cidades", "cidades.estado = estados.id", "inner");

    $this->db->like('cidades.nome', $this->input->get('term'));

    $query_city = $this->db->get_compiled_select();

    $this->db->select("
      UCASE(estados.sigla) as estado_sigla,
      estados.sigla as estado_slug,
      cidades.nome as cidade_nome,
      cidades.slug as cidade_slug,
      bairros.nome as bairro_nome,
      bairros.slug as bairro_slug,
      'district' as category
    ");

    $this->db->from('estados');
    $this->db->join("cidades", "cidades.estado = estados.id", "inner");
    $this->db->join("bairros", "bairros.cidade = cidades.id", "inner");

    $this->db->like('bairros.nome', $this->input->get('term'));

    $query_district = $this->db->get_compiled_select();

    $query = $this->db->query($query_city ." UNION ". $query_district);

    if($query->num_rows() > 0) {
      $return = array();

      foreach($query->result_array() as $row){
        array_push($return, array(
          'label' => ($row['category'] == 'city' ? $row['cidade_nome'] . ' ('. $row['estado_sigla'] .')' : $row['bairro_nome'] . ' ('. $row['cidade_nome'] . ', ' . $row['estado_sigla'] .')'),
          'location' => array(
            'state' => $row['estado_slug'],
            'city' => $row['cidade_slug'],
            'district' => $row['bairro_slug']
          ),
          'category' => array(
            'slug' => $row['category'],
            'name' => ($row['category'] == 'city' ? 'Cidades' : 'Bairros')
          )
        ));
      }

      return json_encode($return);
    }
  }



}
