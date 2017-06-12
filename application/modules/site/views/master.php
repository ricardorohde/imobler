<?php $data = $this->_ci_cached_vars; ?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <title><?php echo isset($section["title"]) ? $section["title"] . ' - ' . $this->config->item('site_nome') : $this->config->item('site_slogan') . ' - ' . $this->config->item('site_nome'); ?></title>
    <!--Meta tags-->
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="<?php echo isset($section["description"]) ? $section["description"] : $this->config->item('site_description'); ?>">
    <meta name="author" content="Favethemes">

    <link rel="apple-touch-icon-precomposed" sizes="57x57" href="<?php echo get_asset('images/favicon/apple-touch-icon-57x57.png'); ?>" />
    <link rel="apple-touch-icon-precomposed" sizes="114x114" href="<?php echo get_asset('images/favicon/apple-touch-icon-114x114.png'); ?>" />
    <link rel="apple-touch-icon-precomposed" sizes="72x72" href="<?php echo get_asset('images/favicon/apple-touch-icon-72x72.png'); ?>" />
    <link rel="apple-touch-icon-precomposed" sizes="144x144" href="<?php echo get_asset('images/favicon/apple-touch-icon-144x144.png'); ?>" />
    <link rel="apple-touch-icon-precomposed" sizes="120x120" href="<?php echo get_asset('images/favicon/apple-touch-icon-120x120.png'); ?>" />
    <link rel="apple-touch-icon-precomposed" sizes="152x152" href="<?php echo get_asset('images/favicon/apple-touch-icon-152x152.png'); ?>" />
    <link rel="icon" type="image/png" href="<?php echo get_asset('images/favicon/favicon-32x32.png'); ?>" sizes="32x32" />
    <link rel="icon" type="image/png" href="<?php echo get_asset('images/favicon/favicon-16x16.png'); ?>" sizes="16x16" />
    <meta name="application-name" content="Mediz Imóveis"/>
    <meta name="msapplication-TileColor" content="#FFFFFF" />
    <meta name="msapplication-TileImage" content="<?php echo get_asset('images/favicon/mstile-144x144.png'); ?>" />

    <meta name="theme-color" content="#ffffff">

    <link href="<?php echo base_url('assets/site/css/main.css'); ?>" rel="stylesheet" type="text/css" />
    <?php
    if(isset($assets["styles"]) && !empty($assets["styles"])){
      foreach($assets["styles"] as $index => $style){
        $style_src = strpos($style, '//') === false ? base_url($style) . '?v=' . $this->config->item('site_versao') : $style;
        ?><link href="<?php echo $style_src; ?>" rel="stylesheet" type="text/css" media="screen" /><?php
      }
    }
    ?>
</head>
<body>

    <button class="btn scrolltop-btn back-top"><i class="fa fa-angle-up"></i></button>

    <?php $this->load->view('site/includes/common/modal.php', $data); ?>

    <?php $this->load->view('site/includes/common/header.php', $data); ?>

    <?php //$this->load->view('site/includes/common/header-search.php', $data); ?>
    <?php //$this->load->view('site/includes/common/sidebar-compare.php', $data); ?>

    <?php echo $content; ?>

    <?php //echo $this->site->userinfo('id') ? $this->site->userinfo('id') : 'false'; ?>

    <?php $this->load->view('site/includes/common/footer.php', $data); ?>

    <script src="<?php echo base_url('assets/site/js/LAB.min.js'); ?>"></script>
    <script>
      $LAB
        .script("<?php echo base_url('assets/site/js/jquery.js'); ?>").wait()
        .script("<?php echo base_url('configjs'); ?>").wait()
        .script("<?php echo base_url('assets/site/js/pace.min.js'); ?>").wait()
        .script("<?php echo base_url('assets/site/js/modernizr.custom.js'); ?>").wait()
        .script("<?php echo base_url('assets/site/js/bootstrap.min.js'); ?>").wait()
        .script("<?php echo base_url('assets/site/js/owl.carousel.min.js'); ?>").wait()
        .script("<?php echo base_url('assets/site/js/swiper.jquery.min.js'); ?>").wait()
        .script("<?php echo base_url('assets/site/js/jquery.matchHeight-min.js'); ?>").wait()
        .script("<?php echo base_url('assets/site/js/bootstrap-select.js'); ?>").wait()
        .script("<?php echo base_url('assets/site/js/jquery-ui.js'); ?>").wait()
        .script("<?php echo base_url('assets/site/js/isotope.pkgd.min.js'); ?>").wait()
        .script("<?php echo base_url('assets/site/js/jquery.nicescroll.js'); ?>").wait()
        .script("<?php echo base_url('assets/site/js/jquery.parallax-1.1.3.js'); ?>").wait()
        .script("<?php echo base_url('assets/site/js/jquery.form.js'); ?>")
        .script("<?php echo base_url('assets/site/js/pages/account.js'); ?>").wait()
        .script("<?php echo base_url('assets/site/js/pages/properties.js'); ?>").wait()
          <?php
          if(isset($assets["scripts"]) && !empty($assets["scripts"])){
            foreach($assets["scripts"] as $index => $script){
              $src = strpos($script[0], '//') === false ? base_url($script[0]) . '?v=' . $this->config->item('site_versao') : $script[0];
              ?>.script("<?php echo $src; ?>")<?php if(isset($script[1]) && $script[1] == true){ ?>.wait(function(){<?php if(isset($script[2])){ ?><?php echo $script[2]; ?><?php } ?>})<?php } ?><?php
            }
          }
          ?>
        .script("<?php echo base_url('assets/site/js/custom.js'); ?>").wait();

        window.fbAsyncInit = function() {
          FB.init({
            appId      : '1830187297238353',
            cookie     : true,
            xfbml      : true,
            version    : 'v2.8'
          });
        };

        // Load the SDK asynchronously
        (function(d, s, id) {
          var js, fjs = d.getElementsByTagName(s)[0];
          if (d.getElementById(id)) return;
          js = d.createElement(s); js.id = id;
          js.src = "//connect.facebook.net/en_US/sdk.js";
          fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
    </script>
</body>
</html>
