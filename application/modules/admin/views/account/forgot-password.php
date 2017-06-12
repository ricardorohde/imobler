<div class="login-wrapper ">
  <!-- START Login Background Pic Wrapper-->
  <div class="bg-pic">
    <!-- START Background Pic-->
    <img src="<?php echo get_asset('img/login-bg.jpg'); ?>" data-src="<?php echo get_asset('img/login-bg.jpg'); ?>" data-src-retina="<?php echo get_asset('img/login-bg.jpg'); ?>" alt="" class="lazy">
    <!-- END Background Pic-->
    <!-- START Background Caption-->
    <div class="bg-caption pull-bottom sm-pull-bottom text-white p-l-20 m-b-20">
      <h2 class="semi-bold text-white">Quando se trabalha com uma verdadeira equipe, não há obstáculo que não seja superado.</h2>
      <p class="small hide">
      </p>
    </div>
    <!-- END Background Caption-->
  </div>
  <!-- END Login Background Pic Wrapper-->
  <!-- START Login Right Container-->
  <div class="login-container bg-white">
    <div class="p-l-50 m-l-20 p-r-50 m-r-20 p-t-50 m-t-30 sm-p-l-15 sm-p-r-15 sm-p-t-40">
      <img src="<?php echo get_asset('img/logo.png'); ?>" alt="logo" data-src="<?php echo get_asset('img/logo.png'); ?>" data-src-retina="<?php echo get_asset('img/logo_2x.png'); ?>" width="78" height="22">
      <p class="p-t-35">Sua senha é criptografada, por isso, será necessário criar uma nova. Informe seu e-mail para que possamos enviar o link para gerar uma nova senha.</p>
      <!-- START Login Form -->

      <?php $this->load->view('admin/includes/alertas', $this->_ci_cached_vars); ?>

      <form id="form-login" class="p-t-15" role="form" action="<?php echo base_url('admin/esqueci-minha-senha'); ?>" method="post">
        <!-- START Form Control-->
        <div class="form-group form-group-default">
          <label>E-mail</label>
          <div class="controls">
            <input type="email" name="email" placeholder="Seu e-mail" class="form-control" required>
          </div>
        </div>
        <!-- END Form Control-->
        <div class="text-right">
          <a href="<?php echo base_url('admin/login'); ?>" class="text-info small">
            <i class="fa fa-angle-left" aria-hidden="true"></i>
            Voltar para login
          </a>
        </div>
        <!-- END Form Control-->
        <button class="btn btn-primary btn-cons m-t-10" type="submit">Entrar</button>
      </form>
      <!--END Login Form-->
      <div class="pull-bottom sm-pull-bottom">
        <div class="m-b-30 p-r-80 sm-m-t-20 sm-p-r-15 sm-p-b-20 clearfix">
          <div class="col-sm-12 no-padding m-t-10">
            <p>
              <small>
              O direito autoral é um direito legal criado pela lei de um país que concede ao criador de um trabalho original direitos exclusivos para sua utilização e distribuição.
            </small>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- END Login Right Container-->
</div>