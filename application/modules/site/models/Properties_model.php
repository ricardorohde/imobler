<?php defined('BASEPATH') OR exit('No direct script access allowed');

class Properties_model extends CI_Model {
  public function __construct() {
    parent::__construct();
  }

  public function get_rows_count($sql){
    $query = $this->db->query($sql);
    return $query->num_rows();
  }

  public function get_properties($request = array(), $row = false) {
    $return = array();
    $where = array();

    // ID
    if(isset($request['params']['property_id'])){
      $this->db->where('imoveis.id', $request['params']['property_id']);
    }

    // Slug
    if(isset($request['params']['slug']) && !empty($request['params']['slug'])){
      $this->db->where('imoveis_negociacoes.permalink', $request['params']['slug']);
    }

    // SELECT
    $this->db->select((isset($request['select']) ? $request['select'] : "
      imoveis.id as imovel_id,

      imoveis.dormitorios as imovel_dormitorios,
      imoveis.salas as imovel_salas,
      imoveis.banheiros as imovel_banheiros,
      imoveis.suites as imovel_suites,
      imoveis.garagens as imovel_garagens,

      imoveis.status as imovel_status,
      imoveis.breve_descricao,
      imoveis.descricao,
      imoveis.destaque,
      imoveis.area_util,
      imoveis.area_total,
      imoveis_tipos.nome as tipo_nome,
      imoveis_tipos.slug as tipo_slug,
      format(sum(imoveis_negociacoes.valor), 0, 'de_DE') as negociacao_valor,
      imoveis_negociacoes.permalink as negociacao_permalink,
      imoveis_negociacoes.referencia as negociacao_referencia,
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

    if(isset($request['params']['property_types']) && !empty($request['params']['property_types'])){
      $this->db->where_in('imoveis_tipos.slug', $request['params']['property_types']);
    }


    // Localização
    if(isset($request['params']['location']) && !empty($request['params']['location'])){
      $this->db->group_start();

      $location_count = 0;
      foreach($request['params']['location'] as $location){
        if(!$location_count){
          $this->db->group_start();
        }else{
          $this->db->or_group_start();
        }

        // Estado
        if(isset($location['state']) && !empty($location['state'])){
          $this->db->where('estados.sigla', $location['state']);
        }

        // Cidade
        if(isset($location['city']) && !empty($location['city'])){
          $this->db->where('cidades.slug', $location['city']);
        }

        // Bairro
        if(isset($location['district']) && !empty($location['district'])){
          $this->db->where('bairros.slug', $location['district']);
        }

        $this->db->group_end();

        $location_count++;
      }

      $this->db->group_end();
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
    $visibility = (isset($request['params']['visibility']) ? $request['params']['visibility'] : 1);
    $this->db->where('imoveis.status', $visibility);

    // Características
    if(isset($request['params']['features']) && !empty($request['params']['features'])){

      $this->db->join("imoveis_caracteristicas", "imoveis_caracteristicas.imovel = imoveis.id", "inner"); // Imóveis características


      $this->db->group_start();

      $feature_count = 0;
      foreach ($request['params']['features'] as $feature) {
        if(!$feature_count){
          $this->db->group_start();
        }else{
          $this->db->or_group_start();
        }

        $this->db->where('imoveis_caracteristicas.caracteristica', $feature);

        $this->db->group_end();

        $feature_count++;
      }

      $this->db->group_end();

      $this->db->having('COUNT(imoveis.id)', count($request['params']['features']));
    }

    // WHERE
    if(isset($request['select']['where']) && !empty($request['select']['where'])){
      $this->db->where($request['select']['where']);
    }

    // NOT IN
    if(isset($request['params']['not_in']) && !empty($request['params']['not_in'])){
      foreach ($request['params']['not_in'] as $key => $value) {
        $this->db->where_not_in($key, $value);
      }
    }

    // ORDER BY
    if(isset($request['params']['orderby']) && !empty($request['params']['orderby'])){
      switch ($request['params']['orderby']) {
        case 'lowest_price':
          $this->db->order_by('imoveis_negociacoes.valor ASC');
        break;

        case 'biggest_price':
          $this->db->order_by('imoveis_negociacoes.valor DESC');
        break;

        case 'most_recent':
          $this->db->order_by('imoveis.id DESC');
        break;

        case 'featured':
          $this->db->where('destaque', 1);
          $this->db->order_by('imoveis.id', 'RANDOM');
        break;

        case 'recommend':
          $this->db->order_by('imoveis.id', 'RANDOM');
        break;

      }
    }

    $this->db->group_by('imoveis.id');

    // GET ROWS COUNT
    $return['total_rows'] = $this->get_rows_count($this->db->_compile_select());
    $return['current_page'] = (isset($request['params']['pagination']['page']) ? $request['params']['pagination']['page'] : 1);


    // PAGINATION
    if(isset($request['params']['pagination']) && !empty($request['params']['pagination'])){
      if(isset($request['params']['pagination']['limit']) && !empty($request['params']['pagination']['limit'])){
        $limit = (isset($request['params']['pagination']['limit']) && !empty($request['params']['pagination']['limit']) ? $request['params']['pagination']['limit'] : 12);

        if(isset($request['params']['pagination']['page']) && !empty($request['params']['pagination']['page'])){
          $page = max(0, ($request['params']['pagination']['page'] - 1) * $limit);

          $return['pagination'] = $this->site->create_pagination($limit, $return['total_rows'], rtrim((isset($request['params']['base_url']) ? base_url($request['params']['base_url']) : current_url()), "/" . $request['params']['pagination']['page']), (isset($request['params']['url_suffix']) ? $request['params']['url_suffix'] : null));
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

    $sql = $this->db->_compile_select();
    $return['sql'] = $sql;

    $query = $this->db->get();

    if($query->num_rows()){
      if($row){
        $return = $query->row_array();
        if(isset($return['destaque']) && $return['destaque'] == 0){
          unset($return['destaque']);
        }
        $return_ids = array($return['imovel_id']);
      }else{
        $return['results'] = array();

        $return_ids = array();
        $return_count = 0;
        foreach($query->result_array() as $result){
          $return['results'][$return_count] = $result;

          $endereco_latitude = (!empty($result['endereco_latitude_site']) ? $result['endereco_latitude_site'] : $result['endereco_latitude']);
          $endereco_longitude = (!empty($result['endereco_longitude_site']) ? $result['endereco_longitude_site'] : $result['endereco_longitude']);

          $result['endereco_latitude'] = $endereco_latitude;
          $result['endereco_longitude'] = $endereco_longitude;

          if(isset($return['results'][$return_count]['destaque']) && $return['results'][$return_count]['destaque'] == 0){
            unset($return['results'][$return_count]['destaque']);
          }

          $return['results'][$return_count]['imovel_permalink'] = $this->site->get_property_url($result);
          $return_ids[$return_count] = $result['imovel_id'];
          $return_count++;
        }
      }

      $return = $this->get_properties_features($return_ids, false, $return);
      $return = $this->get_properties_images($return_ids, $return);
      $return = $this->get_properties_expenses($return_ids, $return);

      // Favorites
      if($this->site->user_logged()){
        $return = $this->get_properties_favorites($return_ids, $return);
      }

      return $return;
    }else{
      return false;
    }
  }

  public function get_properties_features($properties_ids = array(), $filters = false, $return = false) {
    $this->db->select("caracteristicas.id, caracteristicas.nome");
    $this->db->from('caracteristicas');


    if(!empty($properties_ids)){
      $this->db->select("imoveis_caracteristicas.imovel");
      $this->db->join("imoveis_caracteristicas", "imoveis_caracteristicas.caracteristica = caracteristicas.id", "inner");
      $this->db->where_in('imoveis_caracteristicas.imovel', $properties_ids);
    }

    if($filters){
      $this->db->where('caracteristicas.filtro', 1);
    }

    $this->db->order_by('caracteristicas.nome ASC');

    $query = $this->db->get();

    if ($query->num_rows() > 0) {
      if($return){
        foreach ($query->result_array() as $imovel_feature) {
          if(isset($return['results'])){
            $property_key = array_search ($imovel_feature['imovel'], $properties_ids);
            $return['results'][$property_key]['features'][] = $imovel_feature['id'];
          }else{
            $return['features'][] = array(
              'id' => $imovel_feature['id'],
              'nome' => $imovel_feature['nome']
            );
          }
        }
        return $return;
      }
      return $query->result_array();
    }else{
      if($return) return $return;
    }

    return false;

    return $return;
  }

  public function get_properties_images($properties_ids, $return = null) {
    $this->db->select("*");

    $this->db->where_in('imoveis_imagens.imovel', $properties_ids);

    $this->db->order_by('imoveis_imagens.padrao DESC, imoveis_imagens.ordem ASC');

    $query = $this->db->get("imoveis_imagens");

    if ($query->num_rows() > 0) {
      if($return){
        foreach ($query->result_array() as $imovel_imagem) {
          if(isset($return['results'])){
            $property_key = array_search ($imovel_imagem['imovel'], $properties_ids);
            $return['results'][$property_key]['imagens'][] = array(
              'arquivo' => $imovel_imagem['arquivo'],
              'legenda' => $imovel_imagem['legenda']
            );
          }else{
            $return['imagens'][] = array(
              'arquivo' => $imovel_imagem['arquivo'],
              'legenda' => $imovel_imagem['legenda']
            );
          }
        }
        return $return;
      }

      return $query->result_array();
    }else{
      if($return) return $return;
    }

    return false;
  }


  // public function set_properties_images_sizes($property_id){
  //   ini_set('memory_limit', '1024M');

  //   if($images = $this->get_properties_images(array($property_id))){

  //     require_once (APPPATH . 'third_party/ImageResize.php');

  //     $dimensions = array(
  //       array('width' => 430, 'height' => 300, 'quality' => 80),
  //       array('width' => 1045, 'height' => 525, 'quality' => 100)
  //     );

  //     foreach ($images as $image) {
  //       foreach ($dimensions as $dimension) {
  //         $path = FCPATH . 'assets/uploads/imoveis/' . $property_id . '/' . $dimension['width'] . 'x' . $dimension['height'] . '-' . $image['arquivo'];

  //         if(!file_exists($path)){
  //           $image_create = new \Eventviva\ImageResize(FCPATH . 'assets/uploads/imoveis/' . $property_id . '/' . $image['arquivo']);
  //           $image_create->quality_jpg = $dimension['quality'];
  //           $image_create->crop($dimension['width'], $dimension['height']);
  //           $image_create->save($path);
  //         }
  //       }
  //     }
  //   }
  // }

  public function get_properties_expenses($properties_ids, $return = null) {
    $this->db->select("
      imoveis_despesas.imovel,
      imoveis_despesas.valor,
      despesas_tipos.nome as tipo,
      despesas_tipos.slug as tipo_slug,
      periodos.nome as periodo,
      periodos.nome_curto as periodo_curto,
    ");

    $this->db->where_in('imoveis_despesas.imovel', $properties_ids);

    $this->db->join("despesas_tipos", "imoveis_despesas.tipo = despesas_tipos.id", "inner");
    $this->db->join("periodos", "imoveis_despesas.periodo = periodos.id", "inner");

    $this->db->order_by('despesas_tipos.ordem ASC');

    $query = $this->db->get("imoveis_despesas");

    if ($query->num_rows() > 0) {
      if($return){
        foreach ($query->result_array() as $imovel_despesa) {
          if(isset($return['results'])){
            $property_key = array_search ($imovel_despesa['imovel'], $properties_ids);
            $return['results'][$property_key]['despesas'][$imovel_despesa['tipo_slug']] = $imovel_despesa;
          }else{
            $return['despesas'][$imovel_despesa['tipo_slug']] = $imovel_despesa;
          }
        }
        return $return;
      }

      return $query->result_array();
    }else{
      if($return) return $return;
    }

    return false;
  }

  public function get_properties_favorites($properties_ids, $return = null) {
    if($this->site->user_logged()){
      $user_id = $this->site->userinfo('id');

      $this->db->select("imoveis_favoritos.imovel");

      $this->db->from("imoveis_favoritos");

      $this->db->where_in('imoveis_favoritos.imovel', $properties_ids);

      $this->db->where('imoveis_favoritos.usuario', $user_id);

      $sql = $this->db->_compile_select();
      //echo $sql;

      $query = $this->db->get();


      if ($query->num_rows() > 0) {

        if($return){
          foreach ($query->result_array() as $imovel_favorito) {
            if(isset($return['results'])){
              $property_key = array_search($imovel_favorito['imovel'], $properties_ids);
              $return['results'][$property_key]['imovel_favorito'] = true;
            }else{
              $return['imovel_favorito'] = true;
            }
          }
          return $return;
        }
        return $query->result_array();
      }else{
        if($return) return $return;
      }
    }
  }

  public function get_location($request = array()) {
    $this->db->from('estados');

    if(isset($request['params']['location'][0]['state'])){
      $this->db->select('UCASE(estados.sigla) as state_name, estados.sigla as state');
      $this->db->where('estados.sigla', $request['params']['location'][0]['state']);
      $label = '%state_name%';
    }

    if(isset($request['params']['location'][0]['city'])){
      $this->db->select('cidades.nome as city_name, cidades.slug as city');
      $this->db->where('cidades.slug', $request['params']['location'][0]['city']);
      $this->db->join("cidades", "cidades.estado = estados.id", "inner");
      $label = '%city_name% (%state_name%)';
    }

    if(isset($request['params']['location'][0]['district'])){
      $this->db->select('bairros.nome as district_name, bairros.slug as district');
      $this->db->where('bairros.slug', $request['params']['location'][0]['district']);
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

  public function get_favorite($user_id, $property_id) {
    $this->db->select("*");

    $this->db->where(array(
      'imoveis_favoritos.usuario' => $user_id,
      'imoveis_favoritos.imovel' => $property_id
    ));

    $query = $this->db->get("imoveis_favoritos");

    if ($query->num_rows() > 0) {
      return $query->row_array();
    }

    return false;
  }

  public function favorite($params) {
    if($this->site->user_logged() && isset($params['property_id']) && $params['property_id'] && isset($params['action']) && $params['action']){
      $user_id = $this->site->userinfo('id');
      $return = array('property_id' => $params['property_id']);

      if($favorite = $this->get_favorite($user_id, $params['property_id'])){
        if($params['action'] == 'unlike'){
          $return['action'] = 'unliked';
          $this->db->delete('imoveis_favoritos', array('imovel' => $params['property_id'], 'usuario' => $user_id));
        }else if($params['action'] == 'like'){
          $return['action'] = 'liked';
        }
      }else{
        if($params['action'] == 'unlike'){
          $return['action'] = 'unliked';
        }else if($params['action'] == 'like'){
          $return['action'] = 'liked';
          $this->db->insert('imoveis_favoritos', array('imovel' => $params['property_id'], 'usuario' => $user_id));
        }
      }

      return $return;
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
    $url_parts = array('transacao_slug', 'estado_slug', 'cidade_slug', 'bairro_slug', 'tipo_slug', 'imovel_id');
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

  public function get_cities_by_term($format = 'json') {
    $return = false;

    echo $this->input->get('term');

    $this->db->select("
      UCASE(estados.sigla) as estado_sigla,
      estados.sigla as estado_slug,
      cidades.nome as cidade_nome,
      cidades.slug as cidade_slug,
      'city' as category
    ");

    $this->db->from('estados');

    $this->db->join("cidades", "cidades.estado = estados.id", "inner");

    $this->db->like('cidades.nome', $this->input->get('term'));

    $sql = $this->db->_compile_select();

    // echo $sql;

    $query = $this->db->get();

    if ($query->num_rows() > 0) {
      if($format == 'json'){
        $return = json_encode($query->result_array());
      }else if($format == 'array'){
        $return = $query->result_array();
      }
    }

    return $return;
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

    $this->db->limit(3);

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

    $this->db->limit(6);

    $query_district = $this->db->get_compiled_select();

    $query = $this->db->query($query_city ." UNION ". $query_district);

    // echo $query_city ." UNION ". $query_district;

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
