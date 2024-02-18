import os
import socket
import tempfile
import subprocess
from shutil import which

def setup_websockify():
    xauthority = os.getenv('XAUTHORITY', os.path.join(os.getenv('HOME'), '.Xauthority'))

    def websockify_command(unix_socket=None):
        # assume one per user and port is open
        # TODO dynamically detect display somehow?
        uid = os.getuid()
        display = f":{uid}"
        host = socket.gethostname()

        cookie = subprocess.run(['mcookie'], capture_output=True, check=True).stdout
        subprocess.run(['xauth', '-f', xauthority], input=
            f"add {host}{display} . ".encode() + cookie +
            f"add {host}/unix{display} . ".encode() + cookie,
            check=True)

        xvnc = which('Xvnc')
        cmd = [
                'xinit',
                '/etc/X11/xinit/Xsession',
                '--',
                xvnc,
                display,
                '-auth',
                xauthority,
                '-geometry',
                '1680x1050',
                '-SecurityTypes',
                'None'
            ]

        if unix_socket:
            cmd.extend(['-rfbport=-1', '-rfbunixpath', unix_socket])
        else:
            cmd.append('-rfbport={port}')

        return cmd

    return {
        'command': websockify_command,
        'environment': {
            'XAUTHORITY': xauthority
        },
        'websockify': True,
        'unix_socket': True,
        'timeout': 60,
        'new_browser_tab': True,
        # We want the launcher entry to point to /desktop/, not to /desktop-websockify/
        # /desktop/ is the user facing URL, while /desktop-websockify/ now *only* serves
        # websockets.
        "launcher_entry": {"title": "Desktop", "path_info": "desktop"},
    }
