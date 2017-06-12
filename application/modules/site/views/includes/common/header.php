<header id="header-section" class="header-section-4 header-main nav-left hidden-sm hidden-xs">
  <div class="container">
    <div class="header-left">
      <div class="logo">
        <a href="<?php echo base_url(); ?>">
          <img src="<?php echo base_url('assets/site/images/logo.png'); ?>" alt="logo">
        </a>
      </div>

    </div>
    <div class="header-right">

      <ul class="account-action">
        <li class="header-anunciar">
          <a href="<?php echo base_url('anunciar-imovel'); ?>" class="btn btn-default">Anunciar imóvel</a>
        </li>

        <li id="header-account">
          <?php
          if($this->site->user_logged(FALSE)){
            ?>
            <a href="#" data-toggle="modal" data-target="#pop-login">Entrar / Cadastrar</a>
            <?php
          }else{
            echo $this->site->mustache('header-account.mustache', $this->session->userdata('usuario_logado'));
          }
          ?>
        </li>

      </ul>
    </div>

  </div>
</header>
<div class="header-mobile visible-sm visible-xs">
  <div class="container">
    <div class="mobile-nav">
      <span class="nav-trigger"><i class="fa fa-navicon"></i></span>
      <div class="nav-dropdown main-nav-dropdown"></div>
    </div><!--/.mobile-nav-->
    <div class="header-logo">
      <a href="<?php echo base_url(); ?>"><img src="<?php echo base_url('assets/site/images/logo.png'); ?>" alt="logo"></a>
    </div>
    <div class="header-user">
      <ul class="account-action">
        <li>
          <span data-toggle="modal" data-target="#pop-login" class="user-icon"><i class="fa fa-user"></i></span>
        </li>
      </ul>
    </div>
  </div>
</div><!--/header-->
