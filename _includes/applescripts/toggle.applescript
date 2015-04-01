on run args
    try
        tell application "Spotify"
        	playpause
            set output to "toggled"
        end tell

    on error error_message
        --set output to "{
        --    \"state\" : \"" & error_message & "\"
        --}"
        set output to error_message
    end try

end run