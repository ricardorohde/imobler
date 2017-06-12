<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Dashboard extends Admin_Controller {
  public function index() {
    $this->admin->usuario_logado(FALSE, TRUE);

    $data = array(
      'page' => array(
        'one' => 'dashboard'
      ),

      'section' => array(),

      'assets' => array(
        'styles' => array(
          array('plugins/nvd3/nv.d3.min.css'),
          array('plugins/mapplic/css/mapplic.css'),
          array('plugins/rickshaw/rickshaw.min.css'),
          array('plugins/bootstrap-datepicker/css/datepicker3.css'),
          array('plugins/jquery-metrojs/MetroJs.css')
        ),

        'scripts' => array(
          array('plugins/nvd3/lib/d3.v3.js'),
          array('plugins/nvd3/nv.d3.min.js'),
          array('plugins/nvd3/src/utils.js'),
          array('plugins/nvd3/src/tooltip.js'),
          array('plugins/nvd3/src/interactiveLayer.js'),
          array('plugins/nvd3/src/models/axis.js'),
          array('plugins/nvd3/src/models/line.js'),
          array('plugins/nvd3/src/models/lineWithFocusChart.js'),
          array('plugins/mapplic/js/hammer.js"></script>'),
          array('plugins/mapplic/js/jquery.mousewheel.js"></script>'),
          array('plugins/mapplic/js/mapplic.js"></script>'),
          array('plugins/rickshaw/rickshaw.min.js"></script>'),
          array('plugins/jquery-metrojs/MetroJs.min.js'),
          array('plugins/jquery-sparkline/jquery.sparkline.min.js'),
          array('plugins/skycons/skycons.js'),
          array('plugins/bootstrap-datepicker/js/bootstrap-datepicker.js')
        ),

        'script_page' => 'js/dashboard.js'
      )
    );

    $this->template->view('admin/master', 'admin/dashboard', $data);
  }
}
