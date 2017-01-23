<section id="section-body">

  <div class="container">
    <div class="page-title">
      <div class="row">
        <div class="col-sm-12">
          <div class="page-title-left">
            <h1 class="title-head">Welcome back, admin</h1>
          </div>
          <div class="page-title-right">
            <ol class="breadcrumb"><li><a href="/"><i class="fa fa-home"></i></a></li><li class="active">My Profile</li></ol>
          </div>
        </div>
      </div>
    </div>

    <div class="user-dashboard-full">
      <?php $this->load->view('site/account/includes/submenu.php', $this->_ci_cached_vars); ?>

      <div class="profile-area-content">
        <div class="profile-area account-block white-block">

          <form>
            <div class="row">
              <div class="col-md-4 col-sm-5">
                <div class="my-avatar">
                  <img src="images/profile-avatar.png" alt="Avatar">
                  <button class="btn btn-primary btn-block">Upload a profile image</button>
                </div>
              </div>
              <div class="col-md-8 col-sm-7">
                <h4>Information</h4>
                <div class="row">
                  <div class="col-sm-6">
                    <div class="form-group">
                      <label for="firstname">First Name</label>
                      <input type="text" id="firstname" class="form-control" placeholder="Enter your first name">
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <div class="form-group">
                      <label for="lastname">Last Name</label>
                      <input type="text" id="lastname" class="form-control" placeholder="Enter your first name">
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <div class="form-group">
                      <label for="email">Email</label>
                      <input type="email" id="email" class="form-control" placeholder="Your email">
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <div class="form-group">
                      <label for="title">Title</label>
                      <input type="text" id="title" class="form-control" placeholder="Enter your title or company name">
                    </div>
                  </div>
                  <div class="col-sm-12">
                    <div class="form-group">
                      <label for="about">About me</label>
                      <textarea id="about" class="form-control" rows="5"></textarea>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <hr>
            <div class="row">
              <div class="col-sm-12 col-xs-12">
                <h4>Social Media</h4>
              </div>
              <div class="col-sm-4">
                <div class="form-group">
                  <label for="facebook">Facebook URL</label>
                  <input type="text" id="facebook" class="form-control" placeholder="Enter your facebook profile or page">
                </div>
              </div>
              <div class="col-sm-4">
                <div class="form-group">
                  <label for="twitter">Twitter URL</label>
                  <input type="text" id="twitter" class="form-control" placeholder="Enter your twitter profile">
                </div>
              </div>
              <div class="col-sm-4">
                <div class="form-group">
                  <label for="linkedin">Linkedin URL</label>
                  <input type="text" id="linkedin" class="form-control" placeholder="Enter your linkedin profile">
                </div>
              </div>
              <div class="col-sm-4">
                <div class="form-group">
                  <label for="instagram">Instagram URL</label>
                  <input type="text" id="instagram" class="form-control" placeholder="Enter your instagram profile">
                </div>
              </div>
              <div class="col-sm-4">
                <div class="form-group">
                  <label for="pinterest">Pinterest URL</label>
                  <input type="text" id="pinterest" class="form-control" placeholder="Enter your Pinterest profile">
                </div>
              </div>
              <div class="col-sm-4">
                <div class="form-group">
                  <label for="website">Website URL</label>
                  <input type="text" id="website" class="form-control" placeholder="Enter your website">
                </div>
              </div>
              <div class="col-sm-12 col-xs-12 text-right">
                <button type="submit" class="btn btn-primary">Save</button>
              </div>
            </div>
          </form>
        </div>
        <div class="profile-area account-block white-block">
          <h4>Change password</h4>
          <form>
            <div class="row">
              <div class="col-sm-4">
                <div class="form-group">
                  <label for="oldpass">Old password</label>
                  <input type="text" id="oldpass" class="form-control" placeholder="Enter your facebook profile or page">
                </div>
              </div>
              <div class="col-sm-4">
                <div class="form-group">
                  <label for="newpass">New password</label>
                  <input type="text" id="newpass" class="form-control" placeholder="Enter your new password">
                </div>
              </div>
              <div class="col-sm-4">
                <div class="form-group">
                  <label for="confirmpass">Confirm password</label>
                  <input type="text" id="confirmpass" class="form-control" placeholder="Confirm new password">
                </div>
              </div>
            </div>
            <button type="submit" class="btn btn-primary">Update password</button>
          </form>
        </div>
        <div class="profile-area account-block white-block">
          <h4 class="account-action-title"> Account role </h4>
          <div class="account-action-right">
            <select name="location" class="selectpicker" data-live-search="false" data-live-search-style="begins" title=" Registered User ">
              <option>Option</option>
            </select>
          </div>
        </div>
        <div class="profile-area account-block white-block">
          <h4 class="account-action-title"> Delete account </h4>
          <div class="account-action-right">
            <button class="btn btn-danger"> Detele My Account </button>
          </div>
        </div>
      </div>

    </div>
  </div>

</section><!--/.section-body-->