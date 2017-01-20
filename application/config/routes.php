<?php defined('BASEPATH') OR exit('No direct script access allowed');

// == HOME  == \\
$route['default_controller'] = 'site/home'; //Home


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
$route['minha-conta/cadastro'] = 'site/account/register'; //Cadastro
$route['minha-conta/esqueci-minha-senha'] = 'site/account/forget_password'; //Esqueci minha senha
$route['minha-conta/favoritos'] = 'site/account/favorites'; //Imóveis favoritos
$route['minha-conta/minhas-buscas'] = 'site/account/my_searches'; //Minhas buscas
$route['minha-conta'] = 'site/account/index'; //Minha conta


// == IMÓVEIS == \\

//Lista todos os imóveis com a flag 'lançamento'
$route['lancamentos'] = function (){
  return 'site/properties/list/' . json_encode(array('property_status'=>'new'));
};

// Formulário para os usuários enviarem indformações de imóveis a venda
$route['anunciar-imoveis'] = 'site/properties/add_properties'; //Anunciar um imóvel

// Lista para comparação de até quatro (4) imóveis selecionados pelo usuário
$route['comparar-imoveis'] = 'site/properties/compare_properties';

// Ficha do imóvel - Slug - Ex: /imovel/apartamento-a-venda-no-portal-dos-bandeirantes-id-2349
$route['imovel/(:any)'] = function ($slug){
  return 'site/properties/property_details/' . json_encode(array('slug'=>$slug));
};

// Ficha do imóvel - Estruturado - Ex: /imovel/sp/sao-paulo/vila-pereira-barreto-pirituba/sobrado/6140/
$route['imovel/(:any)/(:any)/(:any)/(:any)/(:num)'] = function ($state, $city, $district, $property_type, $property_id){
  $params = array();
  if($state) $params['state'] = strtolower($state);
  if($city) $params['city'] = strtolower($city);
  if($district) $params['district'] = strtolower($district);
  if($property_type) $params['property_type'] = strtolower($property_type);
  if($property_id) $params['property_id'] = $property_id;

  return 'site/properties/property_details/' . json_encode($params);
};

// Atalho para ficha do imóvel - Ex: /3456 -- Redireciona para URL da Ficha do imóvel (Slug ou Estruturado)
$route['(:num)'] = 'site/properties/property_details_redirect/$1/id';

//Lista imóveis de tipo específico em estado/cidade/bairro específico - Ex: /sp/sao-paulo/pirituba/apartamento/
$route['(:any)/(:any)/(:any)/(:any)'] = function ($state, $city, $district, $property_type){
  $params = array();
  if($state) $params['state'] = strtolower($state);
  if($city) $params['city'] = strtolower($city);
  if($district) $params['district'] = strtolower($district);
  if($property_type) $params['property_type'] = strtolower($property_type);

  return 'site/properties/list/' . json_encode($params);
};

//Lista imóveis de todos os tipos em estado/cidade/bairro específicos - Ex: /sp/sao-paulo/pirituba/
$route['(:any)/(:any)/(:any)'] = function ($state, $city, $district){
  $params = array();
  if($state) $params['state'] = strtolower($state);
  if($city) $params['city'] = strtolower($city);
  if($district) $params['district'] = strtolower($district);

  return 'site/properties/list/' . json_encode($params);
};

//Lista imóveis de todos os tipos e de todos os bairros em estado/cidade específicos - Ex: /sp/sao-paulo
$route['(:any)/(:any)'] = function ($state, $city){
  $params = array();
  if($state) $params['state'] = strtolower($state);
  if($city) $params['city'] = strtolower($city);

  return 'site/properties/list/' . json_encode($params);
};

// $route['mapa'] = '' //Busca por mapa
// $route['nome-da-campanha-definido-pelo-admin'] = '' //Campanhas


$route['404_override'] = '';
$route['translate_uri_dashes'] = FALSE;
