-- Init
on run args
	
	-- is Spotify running?
	try

		tell application "Spotify"

			set _state to player state

			-- is Spotify playing?
			if _state is not stopped
			
				local current_album
				
				-- passed parameter (current album)
				set current_album to item 1 of args
				set current_album_escaped to my string_replace("\\\\'", "'", current_album)
				
				-- set up album artwork directories/parameters
				tell application "Finder"
					set script_path to container of (path to me) as text
					set artwork_dir to script_path & ":img:album:"
					set artwork_path to artwork_dir & "album.tiff"
				end tell
				
				-- save track details
				set _track to name of current track
				set _artist to artist of current track
				set _album to album of current track
				set _track_number to track number of current track
				set _duration to duration of current track
				set _position to player position as text
				set _volume to sound volume

				set _position to my string_replace(",", ".", _position)
				
				-- condition : only get artwork if it's a new track
				if current_album_escaped is not album of current track then
					set album_changed to true
					set _artwork to artwork of current track
					my save_image(_artwork, artwork_path)
					my convert_tiff_to_jpeg(artwork_path, "album.jpg", artwork_dir)
				else
					set album_changed to false
				end if 

				set track_escaped to my string_replace("\"", "'", _track)

				-- format JSON
				set output to "{
					\"running\" : true,
					\"playing\" : true,
					\"state\" : \"" & _state & "\",
					\"track\": \"" & track_escaped & "\",
					\"artist\": \"" & _artist & "\",
					\"album\": \"" & _album & "\",
					\"duration\": " & _duration & ",
					\"position\": " & _position	 & ",
					\"track_number\": " & _track_number & ",
					\"volume\": " & _volume & ",
					\"album_changed\": " & album_changed & ",
					\"current_album\": \"" & current_album & "\"
				}" 
			
			-- Spotify not playing
			else
				set output to "{
					\"state\" : \"" & _state & "\"
				}"
			end if			  
			
		end tell
		
	-- Spotify not running
	on error error_message
		set output to "{
			\"state\" : \"closed\"
		}"
	end try
	
end run



-- function to save tiff image from spotify
on save_image(artwork, artwork_path)
	set fileRef to (open for access artwork_path with write permission)
	try
		write artwork to fileRef
		close access fileRef
	on error errorMsg
		try
			close access fileRef
		end try
		error errorMsg
	end try
end saveImage


-- convert tiff to jpeg for web display
on convert_tiff_to_jpeg(source_file, new_name, results_folder)
	try
		set target_path to ((results_folder as string) & new_name) as string
		with timeout of 15 seconds
			tell application "Image Events"
				launch
				
				set this_image to open file (source_file as string)
				save this_image as JPEG in file target_path 
				close this_image
				
			end tell
		end timeout
	on error error_message
		-- hi!
	end try
end process_item


-- function to find and replace
on string_replace(needle, haystack, str)
	set AppleScript's text item delimiters to needle
	set new_str to text items of str
	set AppleScript's text item delimiters to haystack
	set str to new_str as string
	return the str
end string_replace