<?php defined('BASEPATH') OR exit('No direct script access allowed');

class Account_model extends CI_Model {
  public function __construct() {
    parent::__construct();
  }

  public function get_login($params) {
    $this->db->select("id,nome,sobrenome,email,facebook_id,imagem,status");

    if(isset($params['facebook_id']) && !empty($params['facebook_id'])){
      $this->db->where('usuarios.facebook_id', $params['facebook_id']);
    }

    if(isset($params['email']) && isset($params['senha'])){
      $usuario = array(
        'email' => $params['email'],
        'senha' => md5($params['senha'])
      );

      $this->db->where($usuario);
    }

    $query = $this->db->get("usuarios");

    if ($query->num_rows() > 0) {
     return $query->row_array();
    }

    return false;
  }

  public function insert_facebook_login($params){
    $usuario = array(
      'nome' => $params['first_name'],
      'sobrenome' => $params['last_name'],
      'email' => $params['email'],
      'facebook_id' => $params['id'],
      'imagem' => $params['picture']['data']['url'],
      'status' => 1
    );

    $this->db->set('data_criado', 'NOW()', FALSE);
    $this->db->insert('usuarios', $usuario);

    $usuario['id'] = $this->db->insert_id();

    return $usuario;
  }

  public function login_facebook() {
    $post = $this->input->post();

    if($usuario_check = $this->get_login(array('facebook_id' => $post['id']))){
      $usuario = $usuario_check;
    }else{
      $usuario = $this->insert_facebook_login($post);
    }

    return $this->login_process($usuario);
  }

  public function login($params) {
    if($params && $usuario = $this->get_login($params)) {

      // Lembrar senha
      if(isset($params['lembrar']) && $params['lembrar'] == 1){
        $usuario = array_merge(array('lembrar' => 1), $usuario);
      }

      return $this->login_process($usuario);
    }

    return false;
  }

  public function login_process($usuario){
    if($usuario['status'] == 1){
      $return = array_merge(array('usuario_logado' => true), $usuario);

      if(isset($return['lembrar']) && $return['lembrar'] == 1){
        $acesso_guid = uniqid();
        set_cookie($this->config->item('login_cookie_name'), $acesso_guid, (60*60*24*30), $_SERVER['HTTP_HOST'], '/');
      }

      $this->session->set_userdata(array(
        'usuario_logado' => $return
      ));

      return $return;
    }

    return array('usuario_logado' => false);
  }

  // public function get_rows_count($sql){
  //   $query = $this->db->query($sql);
  //   return $query->num_rows();
  // }

  // public function get_properties($request = array(), $row = false){
  //   $return = array();
  //   $where = array();

  //   if(isset($request['params']['property_id'])){
  //     $this->db->where('imoveis.id', $request['params']['property_id']);
  //   }

  //   // SELECT
  //   $this->db->select((isset($request['select']) ? $request['select'] : "
  //     imoveis.id as imovel_id,
  //     imoveis.dormitorios as imovel_dormitorios,
  //     imoveis.banheiros as imovel_banheiros,
  //     imoveis.garagens as imovel_garagens,
  //     imoveis.status as imovel_status,
  //     imoveis_tipos.nome as tipo_nome,
  //     imoveis_tipos.slug as tipo_slug,
  //     format(sum(imoveis_negociacoes.valor), 2, 'de_DE') as negociacao_valor,
  //     imoveis_negociacoes.permalink as negociacao_permalink,
  //     enderecos.cep as endereco_cep,
  //     enderecos.logradouro as endereco_logradouro,
  //     enderecos.numero as endereco_numero,
  //     enderecos.latitude as endereco_latitude,
  //     enderecos.longitude as endereco_longitude,
  //     enderecos.latitude_site as endereco_latitude_site,
  //     enderecos.longitude_site as endereco_longitude_site,
  //     estados.nome as estado_nome,
  //     UCASE(estados.sigla) as estado_sigla,
  //     estados.sigla as estado_slug,
  //     cidades.nome as cidade_nome,
  //     cidades.slug as cidade_slug,
  //     bairros.nome as bairro_nome,
  //     bairros.slug as bairro_slug,
  //     transacoes.nome as transacao_nome,
  //     transacoes.slug as transacao_slug,
  //     periodos.nome as periodo_nome
  //   "));

  //   // FROM
  //   $this->db->from('imoveis');

  //   // JOINS
  //   $this->db->join("imoveis_tipos", "imoveis.tipo = imoveis_tipos.id", "inner"); // Negociações
  //   $this->db->join("imoveis_negociacoes", "imoveis_negociacoes.imovel = imoveis.id", "inner"); // Negociações
  //   $this->db->join("periodos", "imoveis_negociacoes.periodo = periodos.id", "inner"); // Períodos
  //   $this->db->join("transacoes", "imoveis_negociacoes.transacao = transacoes.id", "inner"); // Transações
  //   $this->db->join("imoveis_enderecos", "imoveis_enderecos.imovel = imoveis.id", "inner"); // Endereços (Relação)
  //   $this->db->join("enderecos", "imoveis_enderecos.endereco = enderecos.id", "inner"); // Endereços
  //   $this->db->join("estados", "enderecos.estado = estados.id", "inner"); // Estados
  //   $this->db->join("cidades", "enderecos.cidade = cidades.id", "inner"); // Cidades
  //   $this->db->join("bairros", "enderecos.bairro = bairros.id", "inner"); // Bairros

  //   // Tipo de imóvel
  //   if(isset($request['params']['property_type']) && !empty($request['params']['property_type'])){
  //     $this->db->where_in('imoveis_tipos.slug', $request['params']['property_type']);
  //   }



  //   if(isset($request['params']['location']) && !empty($request['params']['location'])){
  //     $this->db->group_start();

  //     $location_count = 0;
  //     foreach($request['params']['location'] as $location){
  //       if(!$location_count){
  //         $this->db->group_start();
  //       }else{
  //         $this->db->or_group_start();
  //       }

  //       // Estado
  //       if(isset($location['state']) && !empty($location['state'])){
  //         $this->db->where('estados.sigla', $location['state']);
  //       }

  //       // Cidade
  //       if(isset($location['city']) && !empty($location['city'])){
  //         $this->db->where('cidades.slug', $location['city']);
  //       }

  //       // Bairro
  //       if(isset($location['district']) && !empty($location['district'])){
  //         $this->db->where('bairros.slug', $location['district']);
  //       }

  //       $this->db->group_end();

  //       $location_count++;
  //     }

  //     $this->db->group_end();
  //   }


  //   // Transação
  //   if(isset($request['params']['transaction']) && !empty($request['params']['transaction'])){
  //     $this->db->where_in('transacoes.slug', $request['params']['transaction']);
  //   }

  //   // Preço Mínimo
  //   if(isset($request['params']['min_price']) && !empty($request['params']['min_price'])){
  //     $this->db->where('imoveis_negociacoes.valor >=', preg_replace("/[^0-9]/", "", $request['params']['min_price']));
  //   }

  //   // Preço Máximo
  //   if(isset($request['params']['max_price']) && !empty($request['params']['max_price'])){
  //     $this->db->where('imoveis_negociacoes.valor <=', preg_replace("/[^0-9]/", "", $request['params']['max_price']));
  //   }

  //   // Área mínima
  //   if(isset($request['params']['min_area']) && !empty($request['params']['min_area'])){
  //     $this->db->where('imoveis.area_util >=', preg_replace("/[^0-9]/", "", $request['params']['min_area']));
  //   }

  //   // Área máxima
  //   if(isset($request['params']['max_area']) && !empty($request['params']['max_area'])){
  //     $this->db->where('imoveis.area_util <=', preg_replace("/[^0-9]/", "", $request['params']['max_area']));
  //   }

  //   // Dormitórios
  //   if(isset($request['params']['bedrooms']) && !empty($request['params']['bedrooms'])){
  //     $this->db->where('imoveis.dormitorios >=', $request['params']['bedrooms']);
  //   }

  //   // Banheiros
  //   if(isset($request['params']['bathrooms']) && !empty($request['params']['bathrooms'])){
  //     $this->db->where('imoveis.banheiros >=', $request['params']['bathrooms']);
  //   }

  //   // Garagens
  //   if(isset($request['params']['garages']) && !empty($request['params']['garages'])){
  //     $this->db->where('imoveis.garagens >=', $request['params']['garages']);
  //   }

  //   // Visibilidade no site
  //   if(isset($request['params']['visibility']) && !empty($request['params']['visibility'])){
  //     $this->db->where('imoveis.status', $request['params']['visibility']);
  //   }

  //   // Características
  //   if(isset($request['params']['features']) && !empty($request['params']['features'])){

  //     $this->db->join("imoveis_caracteristicas", "imoveis_caracteristicas.imovel = imoveis.id", "inner"); // Imóveis características


  //     $this->db->group_start();

  //     $feature_count = 0;
  //     foreach ($request['params']['features'] as $feature) {
  //       if(!$feature_count){
  //         $this->db->group_start();
  //       }else{
  //         $this->db->or_group_start();
  //       }

  //       $this->db->where('imoveis_caracteristicas.caracteristica', $feature);

  //       $this->db->group_end();

  //       $feature_count++;
  //     }

  //     $this->db->group_end();

  //     $this->db->having('COUNT(imoveis.id)', count($request['params']['features']));
  //   }



  //   // WHERE
  //   if(isset($request['select']['where']) && !empty($request['select']['where'])){
  //     $this->db->where($request['select']['where']);
  //   }

  //   // ORDER BY
  //   if(isset($request['params']['orderby']) && !empty($request['params']['orderby'])){
  //     switch ($request['params']['orderby']) {
  //       case 'lowest_price':
  //         $this->db->order_by('imoveis_negociacoes.valor ASC');
  //       break;

  //       case 'biggest_price':
  //         $this->db->order_by('imoveis_negociacoes.valor DESC');
  //       break;

  //       case 'most_recent':
  //         $this->db->order_by('imoveis.id DESC');
  //       break;
  //     }
  //   }

  //   $this->db->group_by('imoveis.id');

  //   // GET ROWS COUNT
  //   $return['total_rows'] = $this->get_rows_count($this->db->_compile_select());
  //   $return['current_page'] = (isset($request['params']['pagination']['page']) ? $request['params']['pagination']['page'] : 1);


  //   // PAGINATION
  //   if(isset($request['params']['pagination']) && !empty($request['params']['pagination'])){
  //     if(isset($request['params']['pagination']['limit']) && !empty($request['params']['pagination']['limit'])){
  //       $limit = (isset($request['params']['pagination']['limit']) && !empty($request['params']['pagination']['limit']) ? $request['params']['pagination']['limit'] : 12);

  //       if(isset($request['params']['pagination']['page']) && !empty($request['params']['pagination']['page'])){
  //         $page = max(0, ($request['params']['pagination']['page'] - 1) * $limit);

  //         $return['pagination'] = $this->site->create_pagination($limit, $return['total_rows'], rtrim((isset($request['params']['base_url']) ? base_url($request['params']['base_url']) : current_url()), "/" . $request['params']['pagination']['page']), (isset($request['params']['url_suffix']) ? $request['params']['url_suffix'] : null));
  //       }
  //     }
  //   }

  //   if(isset($limit) && !empty($limit)){
  //     if(isset($page) && !empty($page)){
  //       $this->db->limit($limit, $page);
  //     }else{
  //       $this->db->limit($limit);
  //     }
  //   }

  //   $sql = $this->db->_compile_select();
  //   //$return['sql'] = $sql;

  //   $query = $this->db->get();

  //   if($query->num_rows()){
  //     if($row){
  //       $return = $query->row_array();
  //       $return_ids = $return['imovel_id'];
  //     }else{
  //       $return['results'] = array();

  //       $return_ids = array();
  //       $return_count = 0;
  //       foreach($query->result_array() as $result){
  //         $return['results'][$return_count] = $result;
  //         $return['results'][$return_count]['imovel_permalink'] = $this->site->get_property_url($result);
  //         $return_ids[$return_count] = $result['imovel_id'];
  //         $return_count++;
  //       }
  //     }

  //     $return = $this->get_properties_features($return_ids, false, $return);
  //     $return = $this->get_properties_images($return_ids, $return);

  //     return $return;
  //   }else{
  //     return false;
  //   }
  // }

  // public function get_properties_features($properties_ids = array(), $filters = false, $return = false) {
  //   $this->db->select("caracteristicas.id, caracteristicas.nome");
  //   $this->db->from('caracteristicas');


  //   if(!empty($properties_ids)){
  //     $this->db->select("imoveis_caracteristicas.imovel");
  //     $this->db->join("imoveis_caracteristicas", "imoveis_caracteristicas.caracteristica = caracteristicas.id", "inner");
  //     $this->db->where_in('imoveis_caracteristicas.imovel', $properties_ids);
  //   }

  //   if($filters){
  //     $this->db->where('caracteristicas.filtro', 1);
  //   }

  //   $this->db->order_by('caracteristicas.nome ASC');

  //   $query = $this->db->get();

  //   if ($query->num_rows() > 0) {
  //     if($return){
  //       foreach ($query->result_array() as $imovel_feature) {
  //         $property_key = array_search ($imovel_feature['imovel'], $properties_ids);
  //         $return['results'][$property_key]['features'][] = $imovel_feature['id'];
  //       }
  //       return $return;
  //     }
  //     return $query->result_array();
  //   }else{
  //     if($return) return $return;
  //   }

  //   return false;

  //   return $return;
  // }

  // public function get_properties_images($properties_ids, $return = null) {
  //   $this->db->select("*");

  //   $this->db->where_in('imoveis_imagens.imovel', $properties_ids);

  //   $this->db->order_by('imoveis_imagens.padrao DESC, imoveis_imagens.ordem ASC');

  //   $query = $this->db->get("imoveis_imagens");

  //   if ($query->num_rows() > 0) {
  //     if($return){
  //       foreach ($query->result_array() as $imovel_imagem) {
  //         $property_key = array_search ($imovel_imagem['imovel'], $properties_ids);
  //         $return['results'][$property_key]['imagens'][] = array(
  //           'arquivo' => $imovel_imagem['arquivo'],
  //           'legenda' => $imovel_imagem['legenda']
  //         );
  //       }
  //       return $return;
  //     }

  //     return $query->result_array();
  //   }else{
  //     if($return) return $return;
  //   }

  //   return false;
  // }

  // public function get_location($request = array()) {
  //   $this->db->from('estados');

  //   if(isset($request['params']['location'][0]['state'])){
  //     $this->db->select('UCASE(estados.sigla) as state_name, estados.sigla as state');
  //     $this->db->where('estados.sigla', $request['params']['location'][0]['state']);
  //     $label = '%state_name%';
  //   }

  //   if(isset($request['params']['location'][0]['city'])){
  //     $this->db->select('cidades.nome as city_name, cidades.slug as city');
  //     $this->db->where('cidades.slug', $request['params']['location'][0]['city']);
  //     $this->db->join("cidades", "cidades.estado = estados.id", "inner");
  //     $label = '%city_name% (%state_name%)';
  //   }

  //   if(isset($request['params']['location'][0]['district'])){
  //     $this->db->select('bairros.nome as district_name, bairros.slug as district');
  //     $this->db->where('bairros.slug', $request['params']['location'][0]['district']);
  //     $this->db->join("bairros", "bairros.cidade = cidades.id", "inner");
  //     $label = '%district_name% (%city_name%, %state_name%)';
  //   }

  //   $query = $this->db->get();

  //   if ($query->num_rows() > 0) {
  //     $row = $query->row_array();
  //     $location = array();
  //     foreach ($row as $key => $value) {
  //       $label = str_replace('%'.$key.'%', $value, $label);
  //       if(in_array($key, array('state', 'city', 'district'))){
  //         $location[$key] = $value;
  //       }
  //     }

  //     $result = array(
  //       'location' => $location,
  //       'label' => $label
  //     );

  //     return $result;
  //   }

  //   return false;
  // }

  // public function get_property_permalink($property){
  //   if (is_array($property) && isset($property['imovel_id']) && !empty($property['imovel_id'])) {
  //       $sample = true;
  //   } else {
  //       $property = $this->get_properties(array('params' => array('property_id' => $property)), true);
  //       $sample = false;
  //   }

  //   if(empty($property['imovel_id'])) {
  //     return false;
  //   }

  //   if(!empty($property['negociacao_permalink'])){
  //     return base_url($this->config->item('property_detail_url_prefix') . '/' . $property['negociacao_permalink']);
  //   }

  //   $url = array($this->config->item('property_detail_url_prefix'));
  //   $url_parts = array('estado_slug', 'cidade_slug', 'bairro_slug', 'tipo_slug', 'imovel_id');
  //   foreach($url_parts as $part){
  //     $url[] = $property[$part];
  //   }

  //   return base_url(implode('/', $url));
  // }

  // public function get_property_types($request = array()) {
  //   $this->db->select("imoveis_tipos.*, imoveis_tipos_segmentos.id as segmento_id, imoveis_tipos_segmentos.nome as segmento_nome, imoveis_tipos_segmentos.slug as segmento_slug");

  //   $this->db->join("imoveis_tipos_segmentos", "imoveis_tipos.segmento = imoveis_tipos_segmentos.id", "inner");

  //   $this->db->order_by('imoveis_tipos_segmentos.ordem ASC, imoveis_tipos.ordem ASC');

  //   $query = $this->db->get("imoveis_tipos");

  //   if ($query->num_rows() > 0) {
  //     $result_array = array();

  //     $count = array();
  //     foreach($query->result_array() as $result){
  //       if(!isset($result_array[$result['segmento_slug']])){
  //         $result_array[$result['segmento_slug']] = array(
  //           'segmento' => $result['segmento_nome'],
  //           'tipos' => array()
  //         );
  //         $count[$result['segmento_slug']] = 0;
  //       }

  //       $result_array[$result['segmento_slug']]['tipos'][$count[$result['segmento_slug']]] = array(
  //         'id' => $result['id'],
  //         'nome' => $result['nome'],
  //         'slug' => $result['slug']
  //       );

  //       if(isset($request['params']['property_type']) && $request['params']['property_type'] === $result['slug']){
  //         $result_array[$result['segmento_slug']]['tipos'][$count[$result['segmento_slug']]]['active'] = true;
  //       }

  //       $count[$result['segmento_slug']] = ($count[$result['segmento_slug']] + 1);
  //     }

  //     return $result_array;
  //   }

  //   return false;
  // }

  // public function get_locations_by_term() {

  //   $this->db->select("
  //     UCASE(estados.sigla) as estado_sigla,
  //     estados.sigla as estado_slug,
  //     cidades.nome as cidade_nome,
  //     cidades.slug as cidade_slug,
  //     '' as bairro_nome,
  //     '' as bairro_slug,
  //     'city' as category
  //   ");

  //   $this->db->from('estados');
  //   $this->db->join("cidades", "cidades.estado = estados.id", "inner");

  //   $this->db->like('cidades.nome', $this->input->get('term'));

  //   $query_city = $this->db->get_compiled_select();

  //   $this->db->select("
  //     UCASE(estados.sigla) as estado_sigla,
  //     estados.sigla as estado_slug,
  //     cidades.nome as cidade_nome,
  //     cidades.slug as cidade_slug,
  //     bairros.nome as bairro_nome,
  //     bairros.slug as bairro_slug,
  //     'district' as category
  //   ");

  //   $this->db->from('estados');
  //   $this->db->join("cidades", "cidades.estado = estados.id", "inner");
  //   $this->db->join("bairros", "bairros.cidade = cidades.id", "inner");

  //   $this->db->like('bairros.nome', $this->input->get('term'));

  //   $query_district = $this->db->get_compiled_select();

  //   $query = $this->db->query($query_city ." UNION ". $query_district);

  //   if($query->num_rows() > 0) {
  //     $return = array();

  //     foreach($query->result_array() as $row){
  //       array_push($return, array(
  //         'label' => ($row['category'] == 'city' ? $row['cidade_nome'] . ' ('. $row['estado_sigla'] .')' : $row['bairro_nome'] . ' ('. $row['cidade_nome'] . ', ' . $row['estado_sigla'] .')'),
  //         'location' => array(
  //           'state' => $row['estado_slug'],
  //           'city' => $row['cidade_slug'],
  //           'district' => $row['bairro_slug']
  //         ),
  //         'category' => array(
  //           'slug' => $row['category'],
  //           'name' => ($row['category'] == 'city' ? 'Cidades' : 'Bairros')
  //         )
  //       ));
  //     }

  //     return json_encode($return);
  //   }
  // }



}
