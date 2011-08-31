on run args
	local arg
	set arg to item 1 of args
	tell application "Spotify"
        set sound volume to arg
	end tell
end run