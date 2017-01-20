<?php $data = $this->_ci_cached_vars; ?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <title><?php echo isset($section["title"]) ? $section["title"] . ' - ' . $this->config->item('site_nome') : $this->config->item('site_nome'); ?></title>
    <!--Meta tags-->
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="keywords" content="Houzez HTML5 Template">
    <meta name="description" content="Houzez HTML5 Template">
    <meta name="author" content="Favethemes">

    <link rel="apple-touch-icon" sizes="144x144" href="<?php echo base_url('assets/site/images/favicons/apple-touch-icon.png'); ?>">
    <link rel="icon" type="image/png" href="<?php echo base_url('assets/site/images/favicons/favicon-32x32.png'); ?>" sizes="32x32">
    <link rel="icon" type="image/png" href="<?php echo base_url('assets/site/images/favicons/favicon-16x16.png'); ?>" sizes="16x16">
    <link rel="manifest" href="<?php echo base_url('assets/site/images/favicons/manifest.json'); ?>">
    <link rel="mask-icon" href="<?php echo base_url('assets/site/images/favicons/safari-pinned-tab.svg'); ?>">
    <meta name="theme-color" content="#ffffff">

    <link href="<?php echo base_url('assets/site/css/main.css'); ?>" rel="stylesheet" type="text/css" />
</head>
<body>

    <button class="btn scrolltop-btn back-top"><i class="fa fa-angle-up"></i></button>

    <?php $this->load->view('site/includes/common/modal.php', $data); ?>

    <?php $this->load->view('site/includes/common/header.php', $data); ?>

    <?php echo $content; ?>

    <?php $this->load->view('site/includes/common/footer.php', $data); ?>

    <script src="<?php echo base_url('assets/site/js/LAB.min.js'); ?>"></script>
    <script>
      $LAB
        .script("<?php echo base_url('assets/site/js/jquery.js'); ?>").wait()
        .script("<?php echo base_url('assets/site/js/modernizr.custom.js'); ?>").wait()
        .script("<?php echo base_url('assets/site/js/bootstrap.min.js'); ?>").wait()
        .script("<?php echo base_url('assets/site/js/owl.carousel.min.js'); ?>").wait()
        .script("<?php echo base_url('assets/site/js/jquery.matchHeight-min.js'); ?>").wait()
        .script("<?php echo base_url('assets/site/js/bootstrap-select.js'); ?>").wait()
        .script("<?php echo base_url('assets/site/js/jquery-ui.js'); ?>").wait()
        .script("<?php echo base_url('assets/site/js/isotope.pkgd.min.js'); ?>").wait()
        .script("<?php echo base_url('assets/site/js/jquery.nicescroll.js'); ?>").wait()
        .script("<?php echo base_url('assets/site/js/jquery.parallax-1.1.3.js'); ?>").wait()
          <?php
          if(isset($assets["scripts"]) && !empty($assets["scripts"])){
            foreach($assets["scripts"] as $index => $script){
              $src = strpos($script[0], '//') === false ? base_url($script[0]) : $script[0];
              ?>.script("<?php echo $src; ?>?v=<?php echo $this->config->item('site_versao'); ?>")<?php if(isset($script[1]) && $script[1] == true){ ?>.wait(function(){<?php if(isset($script[2])){ ?><?php echo $script[2]; ?><?php } ?>})<?php } ?><?php
            }
          }
          ?>
        .script("<?php echo base_url('assets/site/js/custom.js'); ?>").wait()
    </script>
</body>
</html>
