<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Account extends Site_Controller {
  public function index() {
    $data = array(
      'page' => array(
        'one' => 'minha-conta'
      ),
      'section' => array(
        'body_id' => 'minha-conta',
        'body_class' => array(
        )
      ),
      'assets' => array(
        'styles' => array(
        ),
        'scripts' => array(
        )
      )
    );

    $this->template->view('site/master', 'site/account/main', $data);
  }

  public function register() {
    $data = array(
      'page' => array(
        'one' => 'minha-conta',
        'one' => 'cadastro'
      ),
      'section' => array(
        'body_id' => 'minha-conta-cadastro',
        'body_class' => array(
        )
      ),
      'assets' => array(
        'styles' => array(
        ),
        'scripts' => array(
        )
      )
    );

    $this->template->view('site/master', 'site/account/register', $data);
  }

  public function login() {
    $data = array(
      'page' => array(
        'one' => 'minha-conta',
        'one' => 'login'
      ),
      'section' => array(
        'body_id' => 'minha-conta-login',
        'body_class' => array(
        )
      ),
      'assets' => array(
        'styles' => array(
        ),
        'scripts' => array(
        )
      )
    );

    $this->template->view('site/master', 'site/account/login', $data);
  }

  public function logout() {
    $login_cookie_name = $this->config->item('login_cookie_name');
    if(get_cookie($login_cookie_name)){
      delete_cookie($login_cookie_name);
    }

    $this->session->sess_destroy();

    redirect(base_url('minha-conta/login'), 'location');
  }

  public function forget_password() {
    $data = array(
      'page' => array(
        'one' => 'minha-conta',
        'one' => 'esqueci-minha-senha'
      ),
      'section' => array(
        'body_id' => 'minha-conta-esqueci-minha-senha',
        'body_class' => array(
        )
      ),
      'assets' => array(
        'styles' => array(
        ),
        'scripts' => array(
        )
      )
    );

    $this->template->view('site/master', 'site/account/forget_password', $data);
  }

  public function favorites() {
    $data = array(
      'page' => array(
        'one' => 'minha-conta',
        'one' => 'favoritos'
      ),
      'section' => array(
        'body_id' => 'minha-conta-favoritos',
        'body_class' => array(
        )
      ),
      'assets' => array(
        'styles' => array(
        ),
        'scripts' => array(
        )
      )
    );

    $this->template->view('site/master', 'site/account/favorites', $data);
  }

  public function my_searches() {
    $data = array(
      'page' => array(
        'one' => 'minha-conta',
        'one' => 'buscas'
      ),
      'section' => array(
        'body_id' => 'minha-conta-buscas',
        'body_class' => array(
        )
      ),
      'assets' => array(
        'styles' => array(
        ),
        'scripts' => array(
        )
      )
    );

    $this->template->view('site/master', 'site/account/my_searches', $data);
  }


}
