<header id="header-section" class="header-section-4 header-main nav-left hidden-sm hidden-xs">
  <div class="container">
    <div class="header-left">
      <div class="logo">
        <a href="<?php echo base_url(); ?>">
          <img src="<?php echo base_url('assets/site/images/houzez-logo-color.png'); ?>" alt="logo">
        </a>
      </div>
      <nav class="navi main-nav">
        <ul>
          <li><a href="#">Home</a>
            <ul class="sub-menu">
              <li>
                <a href="#">Map</a>
                <ul class="sub-menu">
                  <li><a href="home-map.html">Map Standard</a></li>
                  <li><a href="home-map-fullscreen.html">Map Fullscreen</a></li>
                </ul>
              </li>
            </ul>
          </li>
          <li class="houzez-megamenu"><a href="#">Pages</a>
            <ul class="sub-menu">
              <li>
                <a href="#">Column 1</a>
                <ul class="sub-menu">
                  <li><a href="agent-list.html">All Agents</a></li>
                  <li><a href="agent-detail.html">Agent Profile</a></li>
                  <li><a href="agency-list.html">All Agencies</a></li>
                  <li><a href="company-profile.html">Company Profile</a></li>
                  <li><a href="compare-properties.html">Compare Properties</a></li>
                  <li><a href="landing-page.html">Landing Page</a></li>
                  <li><a href="map-full-search.html">Map Full Screen</a></li>
                </ul>
              </li>
              <li>
                <a href="#">Column 2</a>
                <ul class="sub-menu">
                  <li><a href="about-us.html">About Houzez</a></li>
                  <li><a href="contact-us.html">Contact us</a></li>
                  <li><a href="login.html">Login Page</a></li>
                  <li><a href="register.html">Register Page</a></li>
                  <li><a href="forget-password.html">Forget Password Page</a></li>
                  <li><a href="typography.html">Typography</a></li>
                </ul>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </div>
    <div class="header-right">

      <ul class="account-action">
        <li>
          <a href="add-new-property.html" class="btn btn-default">Anunciar imóveis</a>
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
      <a href="<?php echo base_url(); ?>"><img src="<?php echo base_url('assets/site/images/logo-houzez-white.png'); ?>" alt="logo"></a>
    </div>
    <div class="header-user">
      <ul class="account-action">
        <li>
          <span class="user-icon"><i class="fa fa-user"></i></span>
          <div class="account-dropdown">
            <ul>
              <li> <a href="add-new-property.html"> <i class="fa fa-plus-circle"></i>Creat Listing</a></li>
              <li> <a href="#" data-toggle="modal" data-target="#pop-login"> <i class="fa fa-user"></i> Log in / Register </a></li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
  </div>
</div><!--/header-->
