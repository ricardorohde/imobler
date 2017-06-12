<?php
$data = array_merge($this->_ci_cached_vars, array('module_name' => $this->router->fetch_module()));
$this->template->view('admin/base', 'admin/structure', $data);
?>