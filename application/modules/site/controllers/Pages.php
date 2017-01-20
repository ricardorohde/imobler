<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Pages extends Site_Controller {
  public function index($page) {
    $data = array(
      'page' => array(
        'one' => $page
      ),
      'section' => array(
        'body_id' => $page,
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

    $this->template->view('site/master', 'site/pages/' . $page, $data);
  }
}
