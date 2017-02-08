<section id="section-body">
  <div class="container">
    <div class="page-title page-title-center breadcrumb-top">
      <div class="row">
        <div class="col-sm-12">
          <ol class="breadcrumb"><li ><a href="/"><i class="fa fa-home"></i></a></li><li class="active">Login</li></ol>
          <div class="page-title-left">
            <h2>Login</h2>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-sm-12">
        <div class="login-register-block login-block">
          <div class="login-register-title clearfix">
            <h2 class="pull-left">Login</h2>
            <a href="#" class="pull-right"> Do you need an account? </a>
          </div>
          <form action="<?php echo base_url('minha-conta/login'); ?>" method="post">
            <input type="text" name="redirect" value="<?php echo $this->input->post('redirect') ? $this->input->post('redirect') : ($this->session->flashdata('redirect') ? $this->session->flashdata('redirect') : base_url($this->config->item('login_redirect'))); ?>" />

            <div class="form-group field-group <?php echo isset($post["erros"]["email"]) ? 'has-error' : ''; ?>">
              <div class="input-user input-icon">
                <input type="email" name="email" placeholder="E-mail" value="<?php echo set_value('email'); ?>" required />
              </div>
              <div class="input-pass input-icon">
                <input type="password" name="senha" placeholder="Senha">
              </div>
            </div>

            <div class="forget-block clearfix">
              <div class="form-group pull-left">
                <div class="checkbox">
                  <label>
                    <input type="checkbox" value="1">
                    Lembrar senha
                  </label>
                </div>
              </div>
              <div class="form-group pull-right">
                <a href="#" data-toggle="modal" data-dismiss="modal" data-target="#pop-reset-pass">Esquecí minha senha</a>
              </div>
            </div>
            <button type="submit" class="btn btn-primary btn-block">Login</button>
          </form>
          <hr>
          <a href="#" class="btn btn-social btn-bg-facebook btn-block"><i class="fa fa-facebook"></i> login with facebook</a>
        </div>
      </div>
    </div>
  </div>
</section><!--/#section-body-->