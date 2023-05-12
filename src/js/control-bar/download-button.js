/**
 * @file download-button.js
 */
import Button from '../button.js';
import Component from '../component.js';

/**
 * Download video source
 *
 * @extends Button
 */
class DownloadButton extends Button {

  /**
   * Creates an instance of this class.
   *
   * @param { import('./player').default } player
   *        The `Player` that this class should be attached to.
   *
   * @param {Object} [options]
   *        The key/value store of player options.
   *
   * @listens Player#download
   */
  constructor(player, options) {
    super(player, options);
    this.on(player, ['download'], () => this.handleDownload());

    this.on(player, ['loadedmetadata', 'audioonlymodechange', 'audiopostermodechange'], () => {
      // This audio detection will not detect HLS or DASH audio-only streams because there was no reliable way to detect them at the time

      if (player.options_.download) {
        this.show();
      } else {
        this.hide();
      }

    });
    this.controlText('Download');
  }

  /**
   * Builds the default DOM `className`.
   *
   * @return {string}
   *         The DOM `className` for this object.
   */
  buildCSSClass() {
    return `vjs-download-control ${super.buildCSSClass()}`;
  }

  /**
   * Handles download on the player and change control text accordingly.
   *
   * @param {Event} [event]
   *        The {@link Player#download} event that caused this function to be called.
   *
   * @listens Player#download
   */
  handleDownload() {
    this.player_.download(this.player_.cache_.src);
  }

  /**
   * This gets called when an `DownloadButton` is "clicked". See
   * {@link ClickableComponent} for more detailed information on what a click can be.
   *
   * @param {Event} [event]
   *        The `keydown`, `tap`, or `click` event that caused this function to be
   *        called.
   *
   * @listens tap
   * @listens click
   */
  handleClick(event) {
    this.handleDownload();
  }

}

/**
 * The text that should display over the `DownloadButton`s controls. Added for localization.
 *
 * @type {string}
 * @protected
 */
DownloadButton.prototype.controlText_ = 'Download';

Component.registerComponent('DownloadButton', DownloadButton);
export default DownloadButton;
