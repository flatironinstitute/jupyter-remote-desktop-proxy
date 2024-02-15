import os
import shlex
import tempfile
from shutil import which

HERE = os.path.dirname(os.path.abspath(__file__))


def setup_websockify():
    # make a secure temporary directory for sockets
    # This is only readable, writeable & searchable by our uid
    sockets_dir = tempfile.mkdtemp()
    sockets_path = os.path.join(sockets_dir, 'vnc-socket')
    vncserver = which('vncserver')

    if not vncserver:
        raise RuntimeError(
            "vncserver executable not found, please install a VNC server"
        )

    vnc_args = [vncserver, '-rfbunixpath', sockets_path]
    socket_args = ['--unix-target', sockets_path]

    if not os.path.exists(os.path.expanduser('~/.vnc/xstartup')):
        vnc_args.extend(['-xstartup', os.path.join(HERE, 'share/xstartup')])

    vnc_command = vnc_args + [
            '-verbose',
            '-geometry',
            '1680x1050',
            '-SecurityTypes',
            'None',
            '-fg',
        ]

    return {
        'command': [
            'websockify',
            '-v',
            '--heartbeat',
            '30',
            '{port}',
        ]
        + socket_args
        + ['--'] + vnc_command,
        'timeout': 30,
        'new_browser_window': True,
        # We want the launcher entry to point to /desktop/, not to /desktop-websockify/
        # /desktop/ is the user facing URL, while /desktop-websockify/ now *only* serves
        # websockets.
        "launcher_entry": {"title": "Desktop", "path_info": "desktop"},
    }
