/**
 * Site global JS file
 */

	/**
	 * on Dom ready functionality
	 */
		$(document).ready(function() {

			// add an extra class to the <body> element for JS-only styling
			$("html").addClass("js");

			// init vol control
			spotifyRemote.init({
				ajaxPath: "./_includes/php/Ajax.php",
				interval: 1
			});
		});


	/*
	 * Window load calls for all pages
	 */
		$(window).load(function() {

		});