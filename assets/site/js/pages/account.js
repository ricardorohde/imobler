var account = app['account'] = {};

$(function(){
  account.login = {
    header: function(response){
      console.log(response);
      $.ajax({
        url: app.base_url('api/mustache/header-account.mustache'),
        data: response,
        method: 'post',
        dataType: "html"
      }).done(function(result) {
        $('#pop-login').modal('toggle');
        $('#header-account').html(result);
      });
    }
  };

  account.facebook = {
    status: function(response){
      if (response.status === 'connected') {
        FB.api('/me?fields=first_name,last_name,gender,email,picture', function(response) {
          $.ajax({
            url: app.base_url('api/login_facebook'),
            data: response,
            method: 'post',
            dataType: "json"
          }).done(function(result) {
            account.login.header(result);
          });
        });
      }else if (response.status === 'not_authorized') {
        console.log('Não autorizado');
      }else{
        console.log(response);
      }
    },

    login: function(){
      FB.login(function(response) {
        if (response.authResponse) {
          app.account.facebook.status(response);
        }else{
          console.log('User cancelled login or did not fully authorize.');
        }
      }, {
        scope: 'public_profile,email'
      });
    },

    check: function(){
      FB.getLoginStatus(function(response) {
        app.account.facebook.status(response);
      });
    }
  }

  // user: {
  //   'is_logged': function(){
  //     if(user_is_logged){
  //       return true;
  //     }else{
  //       $.ajax({
  //         url: app.base_url('api/is_logged'),
  //         dataType: "json"
  //       }).done(function(result) {
  //         user_is_logged = true;
  //         $("#pop-login").modal();
  //       });
  //     }
  //   }
  // }

  $('#login-form').submit(function() {
    $(this).ajaxSubmit({
      success: function(responseText){
        if(responseText == 'false'){
          $('#login-message').empty().removeClass('').addClass('error text-danger').html('<i class="fa fa-close"></i> E-mail e/ou Senha inválidos').show();
        }else{
          $('#login-message').empty().removeClass('').addClass('success text-success').html('<i class="fa fa-check"></i> Você está logado no sistema').show();
          account.login.header(jQuery.parseJSON(responseText));
        }
      }
    });
    return false;
  });

  $('.btn-facebook-login').on('click', function(){
    app.account.facebook.login();
  });
});
