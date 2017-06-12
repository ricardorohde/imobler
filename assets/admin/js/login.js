$(function() {
  console.log('aaa');
  $('#form-login').validate({
      rules: {
        email: {
          required: true,
          email: true
        },
        senha: {
          required: true
        }
      },
      messages: {
        email: {
          required: "O e-mail é obrigatório",
          email: "O e-mail informado é inválido"
        },
        senha: {
          required: "O campo senha é obrigatório"
        }
      }
    });

});