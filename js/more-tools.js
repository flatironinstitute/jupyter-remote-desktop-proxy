// @ts-check

import "./more-tools.css";

// import KeyTable from "@novnc/novnc/core/input/keysym.js";

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

// Should be: rfb: import('@novnc/novnc/core/rfb')['default'];

/**
 * @param {{
 *   container: HTMLDivElement;
 *   rfb: any;
 * }} args
 */
function render({ container, rfb }) {
  container.setAttribute(`id`, `more-tools-menu`);
  container.innerHTML = `
  <ul>
    <li>
      <button id="toggle-fullscreen">Toggle fullscreen</button>
    </li>
    <li>
      <input type="checkbox" id="remote-resizing" />
      <label for="remote-resizing">Remote resizing</label>
    </li>
  </ul>
  `;

  container
    .querySelector(`#toggle-fullscreen`)
    ?.addEventListener(`click`, () => {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
      } else if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    });

  /** @type {HTMLInputElement | null} */
  const resizing_checkbox = container.querySelector(`#remote-resizing`);

  if (resizing_checkbox) resizing_checkbox.checked = rfb.resizeSession;

  resizing_checkbox?.addEventListener(`change`, (event) => {
    // @ts-ignore
    const checked = event.currentTarget?.checked;
    rfb.resizeSession = checked;
  });

  // <li>
  //   <button id="toggle-windows">Toggle Windows key</button>
  // </li>

  // container.querySelector(`#toggle-windows`)?.addEventListener(`click`, () => {
  //   // rfb.sendKey(KeyTable.XK_Super_L, "MetaLeft", true);
  //   // rfb.sendKey(KeyTable.XK_Control_L, "ControlLeft", true);
  //   // rfb.sendKey(KeyTable.XK_Alt_L, "AltLeft", true);
  //   // rfb.sendKey(KeyTable.XK_Tab, "Tab");
  //   // rfb.sendKey(KeyTable.XK_Escape, "Escape");
  //   // rfb.sendKey(KeyTable.XK_a);
  // });
}
