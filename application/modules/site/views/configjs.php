<?php header('Content-type: application/javascript'); ?>
var app = app || {};

var user_is_logged = false;
var like_property_id = 0;

(function (window, document, $, undefined) {
	'use strict';

	app = {
		body: $("body"),

		property_list_limit: <?php echo $this->config->item('property_list_limit'); ?>,

		base_url: function($uri){
			var $base_url = '<?php echo base_url(); ?>';

			if(typeof $uri != 'undefined'){
				$base_url += $uri;
			}

			return $base_url;
		},

    property_like: function($property_id){
      if(user_is_logged){
        $.ajax({
          url: app.base_url('api/add_favorite'),
          data: {
            property_id: $property_id
          },
          method: 'post',
          dataType: "json"
        }).done(function(result) {

          if(result.action == 'like'){
            $('.btn-like[data-property_id='+ result.property_id +']').addClass('active');
          }else if(result.action == 'unlike'){
            $('.btn-like[data-property_id='+ result.property_id +']').removeClass('active');
          }

        });
      }
      user_is_logged = true;
    },

		slug: function(str) {
			str = str.replace(/^\s+|\s+$/g, ''); // trim
			str = str.toLowerCase();

			// remove accents, swap ñ for n, etc
			var from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;";
			var to   = "aaaaeeeeiiiioooouuuunc------";
			for (var i=0, l=from.length ; i<l ; i++) {
			str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
			}

			str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
			.replace(/\s+/g, '-') // collapse whitespace and replace by -
			.replace(/-+/g, '-'); // collapse dashes

			return str;
		}
	};

  $('.property-items').on('click', '.btn-like', function(){
    var $like = $(this);
    app.property_like($like.attr('data-property_id'));
  });

}(this, document, jQuery));
