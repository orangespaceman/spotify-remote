# Spotify Remote

A basic browser-based remote control for Spotify, optimised for mobile and desktop browsers


## Support

Should work on a mac that has Spotify, Apache and PHP.


## Installation

You will need to edit the sudoers file (using [visudo](http://www.gratisoft.us/sudo/visudo.man.html)) to grant permissions for the default apache user to execute the applescripts required by the Spotify Remote.

The following line works for the default Apache installed on OS X 10.7 Lion:

`%_www ALL=(ALL) NOPASSWD: ALL`



## Ability

Setters: 

 * Play/Pause
 * Next Track
 * Previous Track
 * Change volume

Status:

 * Artist
 * Track
 * Album
 * Time elapsed
 * Total time
 * Album artwork


## Inspiration

 * https://github.com/ferranselles/My-Geeklets/blob/5b017b7b7ba9d293badcf034bae206ba36f905b3/spotify/spotify.applescript
 * https://github.com/alexandernilsson/Moody/blob/master/Moody.applescript
 * http://www.leancrew.com/all-this/2011/07/spotify-info-on-the-desktop-via-nerdtool/
 * http://blog.lifeupnorth.co.uk/post/8311267208/spotify-and-applescript
 * http://www.macosxtips.co.uk/geeklets/music/spotify-now-playing/
 * https://github.com/swinton/spotipy
