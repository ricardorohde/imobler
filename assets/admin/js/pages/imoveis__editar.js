$(document).ready(function() {

  var options =  {
    onComplete: function(cep) {
      alert('CEP Completed!:' + cep);
    },
    onKeyPress: function(cep, event, currentField, options){
      console.log('An key was pressed!:', cep, ' event: ', event,
                  'currentField: ', currentField, ' options: ', options);
    },
    onChange: function(cep){
      console.log('cep changed! ', cep);
    },
    onInvalid: function(val, e, f, invalid, options){
      var error = invalid[0];
      console.log ("Digit: ", error.v, " is invalid for the position: ", error.p, ". We expect something like: ", error.e);
    }
  };

  $('.cep-mask').mask('00000-000', options);

});