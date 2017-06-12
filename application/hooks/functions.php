<?php
function print_l($_array = null){
	if($_array){
		echo '<pre>' . print_r($_array, true) . '</pre>';
	}
}

function get_asset($path = null, $type = 'url', $force_module = false) {
  if($path){
    $router =& load_class('Router', 'core');
    return ($type == 'url' ? base_url('assets/' . ($force_module ? $force_module : $router->fetch_module()) . '/' . $path) : FCPATH . 'assets/' . $path);
  }
}
?>
