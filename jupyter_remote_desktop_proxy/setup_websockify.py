import os

def setup_websockify():
    def websockify_command(unix_socket=None):
        vncstartup = os.getenv('VNCSTARTUP', 'vncstartup')

        cmd = [
                vncstartup,
                '-geometry',
                '1680x1050',
                '-SecurityTypes',
                'None'
            ]

        if unix_socket:
            cmd.extend(['-rfbport=-1', '-rfbunixpath='+unix_socket])
        else:
            cmd.append('-rfbport={port}')

        return cmd

    return {
        'command': websockify_command,
        'websockify': True,
        'unix_socket': True,
        'timeout': 60,
        'new_browser_tab': True,
        # We want the launcher entry to point to /desktop/, not to /desktop-websockify/
        # /desktop/ is the user facing URL, while /desktop-websockify/ now *only* serves
        # websockets.
        "launcher_entry": {
            "title": "Virtual Desktop",
            "path_info": "desktop",
            "icon_path": os.path.join(os.path.dirname(os.path.abspath(__file__)), 'static', 'launcher.svg'),
            "category": "Other",
        },
    }
