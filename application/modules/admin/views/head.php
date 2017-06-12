<!DOCTYPE html>
<html>
  <head>
    <meta http-equiv="content-type" content="text/html;charset=UTF-8" />
    <meta charset="utf-8" />

    <title><?php echo isset($section["title"]) ? $section["title"] . ' - ' . $this->config->item('site_nome') : $this->config->item('site_nome') . ' - ' . 'Administração'; ?></title>

    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, shrink-to-fit=no" />

    <link rel="apple-touch-icon-precomposed" sizes="57x57" href="<?php echo get_asset('images/favicon/apple-touch-icon-57x57.png', 'url', 'site'); ?>" />
    <link rel="apple-touch-icon-precomposed" sizes="114x114" href="<?php echo get_asset('images/favicon/apple-touch-icon-114x114.png', 'url', 'site'); ?>" />
    <link rel="apple-touch-icon-precomposed" sizes="72x72" href="<?php echo get_asset('images/favicon/apple-touch-icon-72x72.png', 'url', 'site'); ?>" />
    <link rel="apple-touch-icon-precomposed" sizes="144x144" href="<?php echo get_asset('images/favicon/apple-touch-icon-144x144.png', 'url', 'site'); ?>" />
    <link rel="apple-touch-icon-precomposed" sizes="120x120" href="<?php echo get_asset('images/favicon/apple-touch-icon-120x120.png', 'url', 'site'); ?>" />
    <link rel="apple-touch-icon-precomposed" sizes="152x152" href="<?php echo get_asset('images/favicon/apple-touch-icon-152x152.png', 'url', 'site'); ?>" />
    <link rel="icon" type="image/png" href="<?php echo get_asset('images/favicon/favicon-32x32.png', 'url', 'site'); ?>" sizes="32x32" />
    <link rel="icon" type="image/png" href="<?php echo get_asset('images/favicon/favicon-16x16.png', 'url', 'site'); ?>" sizes="16x16" />
    <meta name="application-name" content="Mediz Imóveis"/>
    <meta name="msapplication-TileColor" content="#FFFFFF" />
    <meta name="msapplication-TileImage" content="<?php echo get_asset('images/favicon/mstile-144x144.png', 'url', 'site'); ?>" />
    <meta name="theme-color" content="#ffffff">

    <meta content="<?php echo isset($section["description"]) ? $section["description"] : 'Description do site'; ?>" name="description" />

    <link href="<?php echo get_asset('plugins/pace/pace-theme-flash.css'); ?>" rel="stylesheet" type="text/css" />
    <link href="<?php echo get_asset('plugins/bootstrapv3/css/bootstrap.min.css'); ?>" rel="stylesheet" type="text/css" />
    <link href="<?php echo get_asset('plugins/font-awesome/css/font-awesome.css'); ?>" rel="stylesheet" type="text/css" />
    <link href="<?php echo get_asset('plugins/jquery-scrollbar/jquery.scrollbar.css'); ?>" rel="stylesheet" type="text/css" media="screen" />
    <link href="<?php echo get_asset('plugins/select2/css/select2.min.css'); ?>" rel="stylesheet" type="text/css" media="screen" />
    <link href="<?php echo get_asset('plugins/switchery/css/switchery.min.css'); ?>" rel="stylesheet" type="text/css" media="screen" />

    <?php
    if(isset($assets["styles"]) && !empty($assets["styles"])){
      foreach($assets["styles"] as $index => $style){
        $style_src = strpos($style[0], '//') === false ? get_asset($style[0]) . '?v=' . $this->config->item('site_version') : $style[0];
        ?><link href="<?php echo $style_src; ?>" rel="stylesheet" type="text/css" media="screen" /><?php
      }
    }
    ?>

    <link href="<?php echo get_asset('pages/css/pages-icons.css'); ?>" rel="stylesheet" type="text/css">
    <link class="main-stylesheet" href="<?php echo get_asset('pages/css/pages.css'); ?>" rel="stylesheet" type="text/css" />

    <!--[if lte IE 9]>
    <link href="<?php echo get_asset('plugins/codrops-dialogFx/dialog.ie.css'); ?>" rel="stylesheet" type="text/css" media="screen" />
    <![endif]-->
  </head>

  <?php
  $body_class = array('fixed-header');

  if($this->input->cookie('menu-pin')){
    $body_class[] = 'menu-pin';
  }

  if(isset($section["body_class"])){
    $body_class = array_merge($body_class, (is_array($section["body_class"]) ? $section["body_class"] : explode(' ', $section["body_class"])));
  }

  ?>
  <body<?php echo isset($section["body_id"]) && !empty($section["body_id"]) ? ' id="' . $section["body_id"] . '"' : null; echo !empty($body_class) ? ' class="'. implode(' ', $body_class) .'"' : ''; ?>>