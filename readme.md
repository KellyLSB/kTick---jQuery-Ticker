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

[<img src="http://i.creativecommons.org/l/by-sa/3.0/88x31.png" alt="BY-SA" title="BY-SA">](http://creativecommons.org/licenses/by-sa/3.0/)