<?php
/**
 * This class is responsible for the main functionality of the SpotifyRemote
 *
 */
class SpotifyRemote {

	/*
	 * possible Spotify commands
	 */
	protected $commands = array(
		'play' => 'play',
		'pause' => 'pause',
		'next' => 'next',
		'previous' => 'previous',
		'status' => 'status',
		'toggle' => 'toggle',
		'volume-up' => 'volume-up',
		'volume-down' => 'volume-down'
	);


	/*
	 *
	 */
	public function __construct() {

	}


	/*
	 * Check to see if the command is valid
	 *
	 *
	 */
	public function command($command, $args = "") {
		if (array_key_exists($command, $this->commands)) {
			return $this->_command($this->commands[$command], $args);
		}
	}


	/*
	 * Run command
	 *
	 *
	 */
	private function _command($command, $args) {
		$cmd = 'osascript ../applescripts/'.$command.'.applescript';
		if ($args) {
			$cmd .= ' "'.$args.'"';
		}
		return shell_exec($cmd);
	}
}