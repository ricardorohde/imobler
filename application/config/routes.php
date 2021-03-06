<?php defined('BASEPATH') OR exit('No direct script access allowed');

require_once( BASEPATH .'database/DB'. EXT );
$db =& DB();

$transactions = 'venda|aluguel';

// == HOME  == \\
$route['default_controller'] = 'site/home'; //Home

// == TOOLS  == \\
$route['configjs'] = 'site/tools/configjs';
$route['api/(:any)'] = 'site/tools/$1';
$route['api/mustache/(:any)'] = 'site/tools/mustache/$1';
$route['api/(:any)/(:num)'] = 'site/tools/$1/$2';
//$route['imagens/imoveis/(:num)/(:any)/(:num)/(:any)'] = 'site/tools/images/$1/$2/$3/$4';


// == PÁGINAS ESTÁTICAS  == \\
foreach(array(
  'quem-somos' => 'who_we_are',
  'termos-de-uso' => 'terms_of_use',
  'politica-de-privacidade' => 'privacy_policy'
) as $slug => $page){
  $route[$slug] = 'site/pages/index/' . $page;
}


// == CONTATOS == \\
$route['fale-conosco'] = 'site/contacts/contact_us'; //Fale conosco
$route['trabalhe-conosco'] = 'site/contacts/work_with_us'; //Trabalhe conosco


// == MINHA CONTA == \\
$route['minha-conta/login'] = 'site/account/login'; //Login
$route['minha-conta/logout'] = 'site/account/logout'; //Logout
$route['minha-conta/cadastro'] = 'site/account/register'; //Cadastro
$route['minha-conta/esqueci-minha-senha'] = 'site/account/forget_password'; //Esqueci minha senha
$route['minha-conta/favoritos'] = 'site/account/favorites'; //Imóveis favoritos
$route['minha-conta/minhas-buscas'] = 'site/account/my_searches'; //Minhas buscas
$route['minha-conta'] = 'site/account/index'; //Minha conta


// == IMÓVEIS == \\

//Lista todos os imóveis com a flag 'lançamento'
$route['lancamentos'] = function (){
  return 'site/properties/list/' . json_encode(array('filter' => 'property_types', 'property_status'=>'new'));
};

// Formulário para os usuários enviarem indformações de imóveis a venda
$route['anunciar-imovel'] = 'site/properties/add_properties'; //Anunciar um imóvel

// Lista para comparação de até quatro (4) imóveis selecionados pelo usuário
$route['comparar-imoveis'] = 'site/properties/compare_properties';

// Ficha do imóvel - Estruturado - Ex: /imovel/sp/sao-paulo/vila-pereira-barreto-pirituba/sobrado/6140/
$route['imovel/('. $transactions .')/(:any)/(:any)/(:any)/(:any)/(:num)'] = function ($transaction, $state, $city, $district, $property_type, $property_id){
  $params = array('route_type' => 'structure');
  if($transaction) $params['transaction'] = strtolower($transaction);
  if($state) $params['location'][0]['state'] = strtolower($state);
  if($city) $params['location'][0]['city'] = strtolower($city);
  if($district) $params['location'][0]['district'] = strtolower($district);
  if($property_type) $params['property_type'] = strtolower($property_type);
  if($property_id) $params['property_id'] = $property_id;

  return 'site/properties/property_details/' . json_encode($params);
};

// Ficha do imóvel - Slug - Ex: /imovel/apartamento-a-venda-no-portal-dos-bandeirantes-id-2349
$route['imovel/(:any)'] = function ($slug){
  return 'site/properties/property_details/' . json_encode(array('route_type'=>'permalink','slug'=>$slug));
};

// Atalho para ficha do imóvel - Ex: /3456 -- Redireciona para URL da Ficha do imóvel (Slug ou Estruturado)
$route['(:num)'] = 'site/properties/property_details_redirect/$1/id';

$property_types = array();
foreach($db->get('imoveis_tipos')->result_array() as $property_type){
  $property_types[] = $property_type['slug'];
  // $route[$property_type['slug']] = 'site/properties/list/' . json_encode(array('filter' => 'property_types', 'transaction' => 'venda', 'state' => 'sp', 'property_type' => $property_type['slug']));
}

//Lista imóveis de tipo específico em estado/cidade/bairro/tipo - Ex: /venda/sp/sao-paulo/pirituba/apartamento/
$route['('. $transactions .')/(:any)/(:any)/(:any)/('. implode('|', $property_types) .')/(:num)'] = function ($transaction, $state, $city, $district, $property_type, $page){
  $params = array();
  if($transaction) $params['transaction'] = strtolower($transaction);
  if($state) $params['location'][0]['state'] = strtolower($state);
  if($city) $params['location'][0]['city'] = strtolower($city);
  if($district) $params['location'][0]['district'] = strtolower($district);
  if($property_type) $params['property_type'] = strtolower($property_type);

  return 'site/properties/list/' . json_encode($params) . '/' . $page;
};
$route['('. $transactions .')/(:any)/(:any)/(:any)/('. implode('|', $property_types) .')'] = function ($transaction, $state, $city, $district, $property_type){
  $params = array();
  if($transaction) $params['transaction'] = strtolower($transaction);
  if($state) $params['location'][0]['state'] = strtolower($state);
  if($city) $params['location'][0]['city'] = strtolower($city);
  if($district) $params['location'][0]['district'] = strtolower($district);
  if($property_type) $params['property_type'] = strtolower($property_type);

  return 'site/properties/list/' . json_encode($params);
};

//Lista imóveis de tipo específico em estado/cidade/tipo - Ex: /venda/sp/sao-paulo/apartamento/
$route['('. $transactions .')/(:any)/(:any)/('. implode('|', $property_types) .')/(:num)'] = function ($transaction, $state, $city, $property_type, $page){
  $params = array();
  if($transaction) $params['transaction'] = strtolower($transaction);
  if($state) $params['location'][0]['state'] = strtolower($state);
  if($city) $params['location'][0]['city'] = strtolower($city);
  if($property_type) $params['property_type'] = strtolower($property_type);

  return 'site/properties/list/' . json_encode($params) . '/' . $page;
};
$route['('. $transactions .')/(:any)/(:any)/('. implode('|', $property_types) .')'] = function ($transaction, $state, $city, $property_type){
  $params = array();
  if($transaction) $params['transaction'] = strtolower($transaction);
  if($state) $params['location'][0]['state'] = strtolower($state);
  if($city) $params['location'][0]['city'] = strtolower($city);
  if($property_type) $params['property_type'] = strtolower($property_type);

  return 'site/properties/list/' . json_encode($params);
};

//Lista imóveis de todos os tipos em estado/cidade/bairro - Ex: /venda/sp/sao-paulo/parque-sao-domingos/
$route['('. $transactions .')/(:any)/(:any)/(:any)/(:num)'] = function ($transaction, $state, $city, $district, $page){
  $params = array();
  if($transaction) $params['transaction'] = strtolower($transaction);
  if($state) $params['location'][0]['state'] = strtolower($state);
  if($city) $params['location'][0]['city'] = strtolower($city);
  if($district) $params['location'][0]['district'] = strtolower($district);

  return 'site/properties/list/' . json_encode($params) . '/' . $page;
};
$route['('. $transactions .')/(:any)/(:any)/(:any)'] = function ($transaction, $state, $city, $district){
  $params = array();
  if($transaction) $params['transaction'] = strtolower($transaction);
  if($state) $params['location'][0]['state'] = strtolower($state);
  if($city) $params['location'][0]['city'] = strtolower($city);
  if($district) $params['location'][0]['district'] = strtolower($district);

  return 'site/properties/list/' . json_encode($params);
};

//Lista imóveis de todos os tipos em estado/cidade - Ex: /venda/sp/sao-paulo/
$route['('. $transactions .')/(:any)/(:any)/(:num)'] = function ($transaction, $state, $city, $page){
  $params = array();
  if($transaction) $params['transaction'] = strtolower($transaction);
  if($state) $params['location'][0]['state'] = strtolower($state);
  if($city) $params['location'][0]['city'] = strtolower($city);

  return 'site/properties/list/' . json_encode($params) . '/' . $page;
};
$route['('. $transactions .')/(:any)/(:any)'] = function ($transaction, $state, $city){
  $params = array();
  if($transaction) $params['transaction'] = strtolower($transaction);
  if($state) $params['location'][0]['state'] = strtolower($state);
  if($city) $params['location'][0]['city'] = strtolower($city);

  return 'site/properties/list/' . json_encode($params);
};

// Campanhas - Ex: /url-da-campanha
$campaigns = array();
foreach($db->get_where('campanhas', array('status' => 1))->result_array() as $campaign){
  $route[$campaign['permalink']] = 'site/properties/campaigns/' . $campaign['id'];
  $route[$campaign['permalink'] . '/(:num)'] = 'site/properties/campaigns/' . $campaign['id'] . '/$1';
}



// ADMIN
$route['admin'] = 'admin/dashboard';

$route['admin/login'] = 'admin/Account__login';
$route['admin/logout'] = 'admin/Account__logout';
$route['admin/esqueci-minha-senha'] = 'admin/Account__forgot_password';

$route['admin/imoveis'] = 'admin/properties__list';
$route['admin/imoveis/adicionar'] = 'admin/properties__edit';
$route['admin/imoveis/(:num)/editar'] = 'admin/properties__list/index/$1';

$route['404_override'] = '';
$route['translate_uri_dashes'] = TRUE;
