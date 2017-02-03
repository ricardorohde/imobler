<?php header('Content-type: application/javascript'); ?>
var app = app || {};

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

    user: {
      'is_logged_callback': function(json){
        return(json);
      },
      'is_logged': function(){
        $.ajax({
          url: app.base_url('api/is_logged'),
          jsonp: "app.user.is_logged_callback",
          dataType: "jsonp"
        }).done(function(result) {
          return result;
        });
      }
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

}(this, document, jQuery));
