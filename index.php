<?php
	require_once("./_includes/php/SpotifyRemote.php");
	require_once("./_includes/php/PageBuilder.php");

	// start the remote
	$spotifyRemote = new SpotifyRemote;

	// build page
	$page = new PageBuilder();
	echo $page->buildPage();