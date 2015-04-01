on run args
    try
        tell application "Spotify"
            play
            set output to "play"
        end tell

    on error error_message
        set output to "{
            \"state\" : \"" & error_message & "\"
        }"
    end try

end run