/**
 * @fileoverview Spotify Remote
 * 
 */
var spotifyRemote = function(){
	
	// obj: status checking interval
	var statusInterval = null,
	
	// obj: loading element
	$loader = null,
	
	// get all command elements
	$commands = null,
	
	// misc HTML elements
	$play = null,
	$body = null,
	$status = null,
	$trackName = null,
	$artist = null,
	$album = null,
	$timeElapsed = null,
	$timeRemaining = null,
	$progress = null,
	$volume = null,
	
	// the current album (not non-null default)
	currentAlbum = ".",

	/**
	 * The options passed through to this function
	 *
	 * @var Object
	 * @private
	 */
	 options = {
		
		/**
		 * The location of the AJAX script on the server
		 *
		 * @var String
		 */		
		ajaxPath : null,
		
		/**
		 * The interval time (in seconds) between status checks
		 *
		 * 
		 */
		interval : 1
	},
	
	
	/**
	 * Initialise the functionality
	 * @param {Object} options The initialisation options
	 * @return void
	 * @public
	 */
	init = function(initOptions) {
		
		// save any options sent through to the intialisation script, if set
		for (var option in options) {
			if (!!initOptions[option] || initOptions[option] === false) {
				options[option] = initOptions[option];
			}
			
			// error check, if no element is specified then stop
			if (!options[option] && options[option] !== false && options[option] !== 0) {
				throw('Required option not specified: ' + option);
				//return false;
			}
		}
		
		// get elements for later use
		$body =			$("body");
		$status =		$("#status");
		$trackName =	$("#track-name");
		$artist =		$("#artist");
		$album =		$("#album");
		$timeElapsed =	$("#time-elapsed");
		$timeRemaining = $("#time-remaining");
		$progress =		$("#progress");
		$volume =		$("#volume");
		
		// hide things initially
		$body.addClass("loading");
		
		
		// get all command elements
		$commands = $("a[data-command]");
		$commands.bind("click", function(e){
			e.preventDefault();
			runCommand($(this).data('command'));
		});
		

		// add loader
		$loader = $("<span />")
			.attr('id', 'loading')
			.appendTo('#wrapper');
		
		
		// check status every x seconds
		statusInterval = setInterval(getStatus, options.interval * 1000);
	},
	
	
	
	/*
	 * Check status
	 */ 
	getStatus = function() {
		_ajax("status", currentAlbum);
	},
	
	
	
	/*
	 * Run a command
	 */ 
	runCommand = function(command) {
		_ajax(command);
	},
	
	
	
	/*
	 * Ajax!
	 */
	_ajax = function(method, args) {
	
		showLoader();
		
		var postData, response, result;

		postData = 'method='+method;
		
		// if specific arguments have been sent through, append
		if (!!args) {
			args = args.replace(/\'/g, "\\'");
			args = encodeURIComponent(args);			
			postData += '&args='+args;
		}
		
		postData += '&random='+Math.random();

		// submit request
		response = $.post(
			options.ajaxPath,
			postData,
			function(data, textStatus){
				hideLoader();
				result = $.parseJSON(data);
				
				// if this is a status update, update display
				if (method == "status") {
					updateDisplay(result);
				}				
			});
	},
	
	
	/*
	 * show...loader
	 */
	showLoader = function() {
		$loader.addClass('show');
	},
	
	
	
	/*
	 * hide...loader
	 */
	hideLoader = function() {
		$loader.removeClass('show');
	},


	/*
	 * update display based on ajax json return
	 */
	updateDisplay = function(status) {
		
		// set state
		if (status && status.state) {
			$body.attr("class", status.state);
		
			// switch on status types
			switch(status.state) {
				
				case "closed":
					$trackName.text("Spotify ain't running!");				  
				break;

				case "stopped":
					$trackName.text("Spotify ain't playing!");
				break;
				
				case "playing":
				case "paused":
					
					var position = Math.round(status.position);
		
					// set text values
					$trackName.text(status.track);
					$artist.text(status.artist);
					$album.text(status.album);
					$timeElapsed.text(secondsToMinutes(position));
					$timeRemaining.text(secondsToMinutes(status.duration - position));
			
					// progress bar
					var progressBarWidth = ((status.position / status.duration) * 100).toFixed(2);
					$progress.find(".progress-bar-fill").css({ width: progressBarWidth+"%"});
			
					// volume bar
					$volume.find(".progress-bar-fill").css({ width: status.volume+"%"});
			
					// load new image?
					if (status.album_changed) {
						var time = new Date().getTime();
							$status.animate({opacity:0}, 250, function(){
								$status
									.delay(1000)
									.css({ "background-image":"url(./_includes/img/album/album.jpg?"+time+")"})
									.animate({opacity:1}, 250);
							});
					}
					
					// store current album, if set - for checking next time
					if (status && status['album']) {
						currentAlbum = status.album;
					}
					
				break;
			}
		}
	},
	
		 
	 /*
	  * convert seconds to minutes (and seconds)
	  */
	 secondsToMinutes = function(secs) {
		 var mins = Math.floor(secs/60);
		 secs = secs - (mins*60);
		 if (mins < 10) { mins = "0"+mins; }
		 if (secs < 10) { secs = "0"+secs; }
		 return mins+":"+secs;
	 };
	

	/*
	 * Return value, expose certain methods above
	 */
	return {
		init: init
	};
}();