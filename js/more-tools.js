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
      <input type="checkbox" id="toggle-fullscreen" />
      <label for="toggle-fullscreen">Fullscreen</button>
    </li>
    <li>
      <input type="checkbox" id="remote-resizing" />
      <label for="remote-resizing">Remote resizing</label>
    </li>
    <li style="display: flex; column-gap: 1rem; align-items: center; justify-content: flex-end;">
      <label for="quality">Quality</label>
      <input id="quality" type="range" min="0" max="9" />
    </li>
    <li style="display: flex; column-gap: 1rem; align-items: center; justify-content: flex-end;">
      <label for="compression">Compression</label>
      <input id="compression" type="range" min="0" max="9" />
    </li>
  </ul>
  `;

  /** @type {HTMLInputElement | null} */
  const fullscreen_checkbox = container.querySelector(`#toggle-fullscreen`);
  if (fullscreen_checkbox)
    fullscreen_checkbox.checked = document.fullscreenElement ? true : false;
  fullscreen_checkbox?.addEventListener(`change`, () => {
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

  /** @type {HTMLInputElement | null} */
  const quality_slider = container.querySelector(`#quality`);
  if (quality_slider) quality_slider.valueAsNumber = parseInt(rfb.qualityLevel);
  quality_slider?.addEventListener(`input`, () => {
    rfb.qualityLevel = quality_slider.valueAsNumber;
    console.log(`Quality level is now:`, rfb.qualityLevel);
  });

  /** @type {HTMLInputElement | null} */
  const compression_slider = container.querySelector(`#quality`);
  if (compression_slider)
    compression_slider.valueAsNumber = parseInt(rfb.compressionLevel);
  compression_slider?.addEventListener(`input`, () => {
    rfb.compressionLevel = compression_slider.valueAsNumber;
    console.log(`Compression level is now:`, rfb.compressionLevel);
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
