<?php
$data = array_merge($this->_ci_cached_vars, array('module_name' => $this->router->fetch_module()));
?>
<?php $this->load->view($data['module_name'] . '/head.php', $data); ?>

<?php echo $content; ?>

<?php $this->load->view($data['module_name'] . '/foot.php', $data); ?>