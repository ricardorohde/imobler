<div class="modal fade" id="pop-login" tabindex="-1" role="dialog">
  <div class="modal-dialog modal-sm">
    <div class="modal-content">
      <div class="modal-header">
        <ul class="login-tabs">
          <li class="active">Login</li>
          <li>Register</li>
        </ul>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><i class="fa fa-close"></i></button>
      </div>
      <div class="modal-body login-block">
        <div class="tab-content">
          <div class="tab-pane fade in active">
            <div class="message">
              <p class="error text-danger"><i class="fa fa-close"></i> You are not Logedin</p>
              <p class="success text-success"><i class="fa fa-check"></i> You are not Logedin</p>
            </div>
            <form>
              <div class="form-group field-group">
                <div class="input-user input-icon">
                  <input type="text" placeholder="Username">
                </div>
                <div class="input-pass input-icon">
                  <input type="password" placeholder="Password">
                </div>
              </div>
              <div class="forget-block clearfix">
                <div class="form-group pull-left">
                  <div class="checkbox">
                    <label>
                      <input type="checkbox">
                      Remember me
                    </label>
                  </div>
                </div>
                <div class="form-group pull-right">
                  <a href="#" data-toggle="modal" data-dismiss="modal" data-target="#pop-reset-pass">I forgot username and password</a>
                </div>
              </div>

              <button type="submit" class="btn btn-primary btn-block">Login</button>
            </form>
            <hr>
            <a href="#" class="btn btn-social btn-bg-facebook btn-block"><i class="fa fa-facebook"></i> login with facebook</a>
            <a href="#" class="btn btn-social btn-bg-linkedin btn-block"><i class="fa fa-linkedin"></i> login with linkedin</a>
            <a href="#" class="btn btn-social btn-bg-google-plus btn-block"><i class="fa fa-google-plus"></i> login with Google</a>
          </div>
          <div class="tab-pane fade">
            <form>
              <div class="form-group field-group">
                <div class="input-user input-icon">
                  <input type="text" placeholder="Username">
                </div>
                <div class="input-email input-icon">
                  <input type="email" placeholder="Email">
                </div>
              </div>
              <div class="form-group">
                <div class="checkbox">
                  <label>
                    <input type="checkbox">
                    I agree with your <a href="#">Terms & Conditions</a>.
                  </label>
                </div>
              </div>
              <button type="submit" class="btn btn-primary btn-block">Register</button>
            </form>
            <hr>

            <a href="#" class="btn btn-social btn-bg-facebook btn-block"><i class="fa fa-facebook"></i> login with facebook</a>
            <a href="#" class="btn btn-social btn-bg-linkedin btn-block"><i class="fa fa-linkedin"></i> login with linkedin</a>
            <a href="#" class="btn btn-social btn-bg-google-plus btn-block"><i class="fa fa-google-plus"></i> login with Google</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</div><!--/modal-login-->

<div class="modal fade" id="pop-reset-pass" tabindex="-1" role="dialog">
  <div class="modal-dialog modal-sm">
    <div class="modal-content">
      <div class="modal-header">
        <ul class="login-tabs">
          <li class="active">Reset Password</li>
        </ul>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><i class="fa fa-close"></i></button>
      </div>
      <div class="modal-body">
        <p>Please enter your username or email address. You will receive a link to create a new password via email.</p>
        <form>
          <div class="form-group">
            <div class="input-user input-icon">
              <input placeholder="Enter your username or email" class="form-control">
            </div>
          </div>
          <button class="btn btn-primary btn-block">Get new password</button>
        </form>
      </div>
    </div>
  </div>
</div><!--/modal-pass-->
