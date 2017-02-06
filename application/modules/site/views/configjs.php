<?php header('Content-type: application/javascript'); ?>
var app = app || {};

var account_user_logged = <?php echo $this->site->userinfo('id') ? $this->site->userinfo('id') : 'false'; ?>;
var properties_like_property_id = 0;

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
