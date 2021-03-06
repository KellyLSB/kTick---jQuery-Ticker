/**
kTick - jQuery Ticker (https://github.com/KellyLSB/kTick---jQuery-Ticker)
=========================================================================

kTick is a simple jQuery ticker that parses and spits out a JSON array into whatever html you see fit.

### The available paramaters are.

	{
		'timeout': 1000,			// The amount of time between new ticks
		'animation': 'fade',		// Fade or Slide the new tick in
		'animation_time': 1500,		// Time it takes to Fade or Slide
		'template': '',				// The HTML Template with variables surounded by "%"
		'json': '',					// URL to a JSON feed or a JSON object to loop through
		'jsonArgs': {}				// Arguments to add to the JSON Get call (URL FEED ONLY)
		'loop': true,				// To loop through the JSON object continuously
		'truncate': true,			// If looping then remove the last item when adding it to the top
	}

License
=======
kTick - jQuery Ticker by Kelly Lauren Summer Becker is licensed under a Creative Commons Attribution-ShareAlike 3.0 Unported License.
Permissions beyond the scope of this license may be available at http://kellybecker.me.
**/

(function( $ ) {

	// Prepare a list of running tickers and their options
	var srunning = new Object();
	var soptions = new Object();
			
	$.fn.kTick = function(options, tf) {

		if(options == 'stop') {
			clearInterval(srunning[this]);
			return this;
		}

		if(options == 'clear') {
			this.kTick('stop').children().remove();
			return this;
		}

		if(options == 'reset') {
			clearInterval(srunning[this]);
			if(!tf) this.kTick('clear');
			this.kTick(soptions[this]);
			return this;
		}		

		// Template Renderer
		var render = function(p, obj) {
			var pattern = p;

			for(var x in obj) {
				pattern = pattern.replace('%'+x+'%', obj[x]);
			}

			for(var x in obj) {
				pattern = pattern.replace('%'+x+'%', obj[x]);
			}

			return pattern;
		};

		// Check If Is String
		var isString = function(input){
			return typeof(input) == 'string';
		}

		// Set the object to a local variable
		var obj = this;
		
		// Settings Extensions
		var settings = $.extend( {
			'timeout': 1000,
			'animation': 'fade', //  Fade or Slide
			'animation_time': 1500,
			'template': '',
			'json': '',
			'jsonArgs': {},
			'loop': true,
			'truncate': true,
			'reload': 10000 
		} , options);

		// Save Options for Future Use
		soptions[obj] = settings;

		// If is a string then assume url and load the json
		if(isString(settings.json)) {
			$.getJSON(settings.json, settings.jsonArgs, function(data) {
				settings.json = data;
			});
		}

		var x = 0;
		var loop = false;
		var date = new Date();
		date = date.getMilliseconds() + settings.reload;
		srunning[obj] = setInterval(function() {
			// If this is a loop and we are truncating remove the last element
			if(settings.truncate == true && loop == true) {
				var tmp = obj.children().last();
				if(settings.animation == 'fade') tmp.fadeOut(settings.animation_time);
				if(settings.animation == 'slide') tmp.slideUp(settings.animation_time);
				tmp.remove();
			}

			// Create First Line In Ticker
			var tmp = $(render(settings.template, settings.json[x])).css('display', 'none');

			// Prepend and Animate
			obj.prepend(tmp); x++;
			if(settings.animation == 'fade') tmp.fadeIn(settings.animation_time);
			if(settings.animation == 'slide') tmp.slideDown(settings.animation_time);
			if(x == settings.json.length) {
				if(settings.loop !== true) clearInterval(srunning[obj]);
				loop = true;
				x = 0;
			}

			if(x == 0 && isString(soptions.json))
				obj.kTick('reset', true);
							
		}, settings.timeout);

		return this;
	};
})( jQuery );