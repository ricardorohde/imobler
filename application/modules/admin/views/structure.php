<?php $data = array_merge($this->_ci_cached_vars, array('module_name' => $this->router->fetch_module())); ?>

<?php $this->load->view($data['module_name'] . '/sidebar.php', $data); ?>

<!-- START PAGE-CONTAINER -->
<div class="page-container ">
  <?php $this->load->view($data['module_name'] . '/header.php', $data); ?>
  <!-- START PAGE CONTENT WRAPPER -->
  <div class="page-content-wrapper ">
    <!-- START PAGE CONTENT -->
    <?php echo $content; ?>
    <!-- END PAGE CONTENT -->
    <!-- START COPYRIGHT -->
    <!-- START CONTAINER FLUID -->
    <!-- START CONTAINER FLUID -->
    <div class="container-fluid container-fixed-lg footer">
      <div class="copyright sm-text-center">
        <p class="small no-margin pull-left sm-pull-reset">
          <span class="hint-text">Copyright &copy; <?php echo date('Y'); ?> </span>
          <span class="font-montserrat"><?php echo $this->config->item('site_nome'); ?></span>.
          <span class="hint-text">Todos os direitos reservados. </span>
        </p>
        <p class="small no-margin pull-right sm-pull-reset">
          <a href="https://www.imobler.com.br" target="_blank">Imobler</a> <span class="hint-text">- Feito com carinho &hearts;</span>
        </p>
        <div class="clearfix"></div>
      </div>
    </div>
    <!-- END COPYRIGHT -->
  </div>
  <!-- END PAGE CONTENT WRAPPER -->
</div>
<!-- END PAGE CONTAINER -->

<?php $this->load->view($data['module_name'] . '/quickview.php', $data); ?>

<?php $this->load->view($data['module_name'] . '/search.php', $data); ?>