<?php
	if (isset($_POST) && count($_POST) > 0) {

		// check what to do
		require_once("./SpotifyRemote.php");
		$spotifyRemote = new SpotifyRemote;

		$method = $_POST['method'];
		unset($_POST['method']);

		if (isset($_POST['args'])) {
		  $args = $_POST['args'];
		  unset($_POST['args']);
		} else {
		  $args = array();
		}

		// run command
		$result = $spotifyRemote->command($method, $args);
		echo $result;
	}

