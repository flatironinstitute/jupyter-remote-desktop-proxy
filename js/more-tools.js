// @ts-check

import "./more-tools.css";

import KeyTable from "@novnc/novnc/core/input/keysym.js"

export function setupMoreTools({ trigger, rfb }) {
  let container = null;

  trigger.addEventListener(`click`, () => {
    if (container) {
      container.remove();
      container = null;
    } else {
      container = document.createElement(`div`);

      document.querySelector(`body`)?.appendChild(container);
      render({ container, rfb });
    }
  });
}

/**
 *
 * @param {{ container: HTMLDivElement; rfb: any; }} args
 */
function render({ container, rfb }) {
  container.setAttribute(`id`, `more-tools-menu`);
  container.innerHTML = `
  <ul>
    <li>
      <button id="toggle-fullscreen">Toggle fullscreen</button>
    </li>
  </ul>
  `;

  // <li>
  //   <button id="toggle-windows">Toggle Windows key</button>
  // </li>

  container.querySelector(`#toggle-fullscreen`)?.addEventListener(`click`, () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  })

  container.querySelector(`#toggle-windows`)?.addEventListener(`click`, () => {
    // rfb.sendKey(KeyTable.XK_Super_L, "MetaLeft", true);
    // rfb.sendKey(KeyTable.XK_Control_L, "ControlLeft", true);
    // rfb.sendKey(KeyTable.XK_Alt_L, "AltLeft", true);
    // rfb.sendKey(KeyTable.XK_Tab, "Tab");
    // rfb.sendKey(KeyTable.XK_Escape, "Escape");
    // rfb.sendKey(KeyTable.XK_a);
  });
}
