
    <!-- BEGIN VENDOR JS -->
    <script src="<?php echo get_asset('plugins/pace/pace.min.js'); ?>" type="text/javascript"></script>
    <script src="<?php echo get_asset('plugins/jquery/jquery-1.11.1.min.js'); ?>" type="text/javascript"></script>
    <script src="<?php echo get_asset('plugins/modernizr.custom.js'); ?>" type="text/javascript"></script>
    <script src="<?php echo get_asset('plugins/jquery-ui/jquery-ui.min.js'); ?>" type="text/javascript"></script>
    <script src="<?php echo get_asset('plugins/bootstrapv3/js/bootstrap.min.js'); ?>" type="text/javascript"></script>
    <script src="<?php echo get_asset('plugins/jquery/jquery-easy.js'); ?>" type="text/javascript"></script>
    <script src="<?php echo get_asset('plugins/jquery-unveil/jquery.unveil.min.js'); ?>" type="text/javascript"></script>
    <script src="<?php echo get_asset('plugins/jquery-bez/jquery.bez.min.js'); ?>"></script>
    <script src="<?php echo get_asset('plugins/jquery-ios-list/jquery.ioslist.min.js'); ?>" type="text/javascript"></script>
    <script src="<?php echo get_asset('plugins/jquery-actual/jquery.actual.min.js'); ?>"></script>
    <script src="<?php echo get_asset('plugins/jquery-scrollbar/jquery.scrollbar.min.js'); ?>"></script>
    <script type="text/javascript" src="<?php echo get_asset('plugins/select2/js/select2.full.min.js'); ?>"></script>
    <script type="text/javascript" src="<?php echo get_asset('plugins/classie/classie.js'); ?>"></script>
    <script src="<?php echo get_asset('plugins/switchery/js/switchery.min.js'); ?>" type="text/javascript"></script>
    <!-- END VENDOR JS -->

    <script src="<?php echo base_url('admin/tools/configjs'); ?>" type="text/javascript"></script>

    <?php
    if(isset($assets["scripts"]) && !empty($assets["scripts"])){
      foreach($assets["scripts"] as $index => $script){
        $script_src = strpos($script[0], '//') === false ? get_asset($script[0]) . '?v=' . $this->config->item('site_version') : $script[0];
        ?><script src="<?php echo $script_src; ?>" <?php echo isset($script[1]['attributes']) ? implode(' ', $script[1]['attributes']) : null; ?> type="text/javascript"></script><?php
      }
    }
    ?>

    <!-- BEGIN CORE TEMPLATE JS -->
    <script src="<?php echo get_asset('pages/js/pages.js'); ?>"></script>
    <!-- END CORE TEMPLATE JS -->

    <!-- BEGIN PAGE LEVEL JS -->
    <?php
    if(isset($assets["script_page"]) && !empty($assets["script_page"])){
        $script_page_src = strpos($assets["script_page"], '//') === false ? get_asset($assets["script_page"]) . '?v=' . $this->config->item('site_version') : $assets["script_page"];
        ?><script src="<?php echo $script_page_src; ?>" type="text/javascript"></script><?php
    }
    ?>
    <script src="<?php echo get_asset('js/scripts.js'); ?>" type="text/javascript"></script>
    <!-- END PAGE LEVEL JS -->
  </body>
</html>