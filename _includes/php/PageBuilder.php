<?php 
/**
 * page builder class.	
 * build page header and footer
 *
*/
class PageBuilder {
	
	/**
	 * The constructor.
	 */
	function __construct() {
	}

	
	/**
	 * Build the page
	 */
	function buildPage() {

		$return = '<!DOCTYPE html>
<html>
	<head>
		<title>Spotimote</title>	
		<meta charset="UTF-8" />
		<link rel="stylesheet" href="./_includes/css/site/screen.css" media="screen" />		
		<meta name="viewport" content="width=device-width, minimum-scale=1.0, maximum-scale=1.0" />
		<meta name="apple-mobile-web-app-capable" content="yes">
		<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
		<link rel="apple-touch-icon-precomposed" href="./_includes/icons/apple.png"/>

		<script src="http://www.google.com/jsapi"></script>
		<script>
			google.load("jquery", "1.6.2");
		</script>

		<script src="./_includes/js/site/spotify-remote.js"></script>
		<script src="./_includes/js/site/init.js"></script>

	</head>
	<body>
		<div id="horizon">
			<div id="wrapper">
				
				<div id="head">
					<div id="title">
						<p id="track-name">[loading]</p>
						<p id="artist"></p>
						<p id="album"></p>
					</div>
					<div id="progress">
						<p id="time-elapsed"></p>
						<div class="progress-bar"><div class="progress-bar-fill"></div></div>
						<p id="time-remaining"></p>
					</div>
				</div>
				
				<div id="status"></div>
				
				<div id="foot">
					<div id="volume">
						<p id="volume-down"><a href="#" data-command="volume-down"><span class="visuallyhidden">Down</span></a></p>
						<div class="progress-bar"><div class="progress-bar-fill"></div></div>
						<p id="volume-up"><a href="#" data-command="volume-up"><span class="visuallyhidden">Up</span></a></p>
					</div>
					<div id="controls">
						<p id="previous"><a href="#" data-command="previous"><span class="visuallyhidden">Previous track</span></a></p>
						<p id="play-pause"><a href="#" data-command="toggle"><span class="visuallyhidden">Play</span></a></p>
						<p id="next"><a href="#" data-command="next"><span class="visuallyhidden">Next track</span></a></p>
					</div>
				</div>
				
			</div>
		</div>
	</body>
</html> 
		';

		return $return;
	}	
}