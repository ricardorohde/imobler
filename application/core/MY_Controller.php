<?php (defined('BASEPATH')) OR exit('No direct script access allowed');

// Base Controller
class Default_Controller extends MX_Controller {
	function __construct() {
        parent::__construct();
		header('Content-Type: text/html; charset=utf-8');
        $this->output->enable_profiler(TRUE);
    }
}

// Site Controller
class Site_Controller extends Default_Controller {
    function __construct() {
        parent::__construct();

        $this->load->add_package_path(APPPATH . 'modules/site/');

        ?>
<div style="padding: 20px; background: #ccc;">
  <a href="/">Home</a> |
  <a href="/sp/sao-paulo/pirituba/apartamento/">Busca/Categoria</a> |
  <a href="/mapa">Busca por mapa</a> |
  <a href="/lancamentos">Lançamentos</a> |
  <a href="/nome-da-campanha-definido-pelo-admin">Campanhas</a> |
  <a href="/imovel/apartamento-a-venda-2-dormitorios-vila-hortolandia-54m2-RS198000-id-7646">Ficha do imóvel</a> |
  <a href="/comparar-imoveis">Comparar imóveis </a> |
  <a href="/7646">Atalho para ficha do imóvel</a> |
  <a href="/quem-somos">Quem somos </a> |
  <a href="/anunciar-imoveis">Anunciar um imóvel </a> |
  <a href="/termos-de-uso">Termos de uso</a> |
  <a href="/politica-de-privacidade">Política de privacidade</a> |
  <a href="/fale-conosco">Fale conosco </a> |
  <a href="/trabalhe-conosco">Trabalhe conosco </a> |
  <a href="/minha-conta/login">Login</a> |
  <a href="/minha-conta/cadastro">Cadastro </a> |
  <a href="/minha-conta/esqueci-minha-senha">Esqueci minha senha</a> |
  <a href="/minha-conta">Minha conta</a> |
  <a href="/minha-conta/favoritos">Imóveis favoritos</a> |
  <a href="/minha-conta/minhas-buscas">Minhas buscas</a> |
</div>
        <?php
        //$this->load->model(array('search_model'));
        //$this->load->library(array('site'));
        //$this->form_validation->set_error_delimiters('<small class="help-block">', '</small>');

        //require_once(APPPATH.'libraries/MY_Form_validation.php');
    }
}

// Admin Controller
class Admin_Controller extends Default_Controller {
	function __construct() {
        parent::__construct();
        //$this->load->add_package_path(APPPATH . 'modules/admin/');
        //$this->load->library(array('admin', 'gravatar'));
    }
}
