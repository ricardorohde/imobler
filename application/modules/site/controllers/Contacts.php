<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Contacts extends Site_Controller {
  public function contact_us() {
    $data = array(
      'page' => array(
        'one' => 'fale-conosco'
      ),
      'section' => array(
        'body_id' => 'fale-conosco',
        'body_class' => array(
        )
      ),
      'assets' => array(
        'styles' => array(
        ),
        'scripts' => array(
          array('assets/site/js/bootstrapValidator.min.js', true)
        )
      )
    );

    $this->template->view('site/master', 'site/contacts/contact_us', $data);
  }

  public function work_with_us() {
    $data = array(
      'page' => array(
        'one' => 'trabalhe-conosco'
      ),
      'section' => array(
        'body_id' => 'trabalhe-conosco',
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

    $this->template->view('site/master', 'site/contacts/work_with_us', $data);
  }


}
