/**
 * Build styles
 */
require('./index.css').toString();

/**
 * @class GoogleAd
 * @classdesc GoogleAd Tool for Editor.js
 * @property {GoogleAdData} data - Tool`s input and output data
 * @propert {object} api - Editor.js API instance
 *
 * @typedef {object} GoogleAdData
 * @description GoogleAd Tool`s input and output data
 * @property {string} adClient - ad-client
 * @property {string} adSlot - ad-slot
 * @property {string} adFormat - ad-format
 *
 * @typedef {object} GoogleAdConfig
 * @description GoogleAd Tool`s initial configuration
 * @property {string} adClientPlaceholder - placeholder to show in ad-client input
 * @property {string} adSlotPlaceholder - placeholder to show in ad-slot input
 * @property {string} adFormatPlaceholder - placeholder to show in ad-format input
 */
class GoogleAd {
  /**
   * Get Tool toolbox settings
   * icon - Tool icon's SVG
   * title - title to show in toolbox
   *
   * @return {{icon: string, title: string}}
   */
  static get toolbox() {
    return {
      icon: '<svg width="15" height="14" viewBox="0 0 20 24" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 16 16" xml:space="preserve"><g fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10"><path d="M3.698 15.5H.5l5-15h5L6.07 13.791A2.5 2.5 0 0 1 3.698 15.5z"/><path d="M10.5.5l5 15h-3.2c-1.07 0-2.03-.69-2.37-1.71L8 8"/></g></svg>',
      title: 'Google Ad'
    };
  }

  /**
   * Empty GoogleAd is not empty Block
   * @public
   * @returns {boolean}
   */
  static get contentless() {
    return true;
  }

  /**
   * Allow to press Enter inside the GoogleAd
   * @public
   * @returns {boolean}
   */
  static get enableLineBreaks() {
    return true;
  }

  /**
   * Default placeholder for ad-client
   *
   * @public
   * @returns {string}
   */
  static get DEFAULT_WIDTH_PLACEHOLDER() {
    return 'Width (in pixels)';
  }

  /**
   * Default placeholder for ad-client
   *
   * @public
   * @returns {string}
   */
  static get DEFAULT_HEIGHT_PLACEHOLDER() {
    return 'Height (in pixels)';
  }

  /**
   * Default placeholder for ad-client
   *
   * @public
   * @returns {string}
   */
  static get DEFAULT_AD_CLIENT_PLACEHOLDER() {
    return 'ad-client';
  }

  /**
   * Default placeholder for ad-slot
   *
   * @public
   * @returns {string}
   */
  static get DEFAULT_AD_SLOT_PLACEHOLDER() {
    return 'ad-slot';
  }

  /**
   * Default placeholder for ad-format
   * @public
   * @returns {string}
   */
  static get DEFAULT_AD_FORMAT_PLACEHOLDER() {
    return 'ad-format';
  }

  /**
   * Tool`s styles
   *
   * @returns {{baseClass: string, wrapper: string, width: string, height: string, adClient: string, adSlot: string, adFormat: string, settingsButton: string, settingsButtonActive: string}}
   */
  get CSS() {
    return {
      baseClass: this.api.styles.block,
      wrapper: 'cdx-googleAd',
      width: 'cdx-googleAd__width',
      height: 'cdx-googleAd__height',
      adClient: 'cdx-googleAd__adClient',
      adSlot: 'cdx-googleAd__adSlot',
      adFormat: 'cdx-googleAd__adFormat',
      input: this.api.styles.input,
      settingsWrapper: 'cdx-googleAd-settings',
      settingsButton: this.api.styles.settingsButton,
      settingsButtonActive: this.api.styles.settingsButtonActive
    };
  }

  /**
   * Tool`s settings properties
   *
   * @returns {*[]}
   */
  get settings() {
    return [
    ];
  }

  /**
   * Render plugin`s main Element and fill it with saved data
   *
   * @param {{data: GoogleAdData, config: GoogleAdConfig, api: object}}
   *   data — previously saved data
   *   config - user config for Tool
   *   api - Editor.js API
   */
  constructor({data, config, api}) {

    this.api = api;

    this.widthPlaceholder = config.widthPlaceholder || GoogleAd.DEFAULT_WIDTH_PLACEHOLDER;
    this.heightPlaceholder = config.heightPlaceholder || GoogleAd.DEFAULT_HEIGHT_PLACEHOLDER;
    this.adClientPlaceholder = config.adClientPlaceholder || GoogleAd.DEFAULT_AD_CLIENT_PLACEHOLDER;
    this.adSlotPlaceholder = config.adSlotPlaceholder || GoogleAd.DEFAULT_AD_SLOT_PLACEHOLDER;
    this.adFormatPlaceholder = config.adFormatPlaceholder || GoogleAd.DEFAULT_AD_FORMAT_PLACEHOLDER;

    this.data = {
      width: data.width || 'auto',
      height: data.height || 180,
      adClient: data.adClient || '',
      adSlot: data.adSlot || '',
      adFormat: data.adFormat || '',
    };
  }

  /**
   * Create GoogleAd Tool container with inputs
   *
   * @returns {Element}
   */
  render() {
    const container = this._make('blockquote', [this.CSS.baseClass, this.CSS.wrapper]);
    const width = this._make('div', [this.CSS.input, this.CSS.width], {
      contentEditable: true,
      innerHTML: this.data.width
    });
    const height = this._make('div', [this.CSS.input, this.CSS.height], {
      contentEditable: true,
      innerHTML: this.data.height
    });
    const adClient = this._make('div', [this.CSS.input, this.CSS.adClient], {
      contentEditable: true,
      innerHTML: this.data.adClient
    });
    const adSlot = this._make('div', [this.CSS.input, this.CSS.adSlot], {
      contentEditable: true,
      innerHTML: this.data.adSlot
    });
    const adFormat = this._make('div', [this.CSS.input, this.CSS.adFormat], {
      contentEditable: true,
      innerHTML: this.data.adFormat
    });

    width.dataset.placeholder = this.widthPlaceholder;
    height.dataset.placeholder = this.heightPlaceholder;
    adClient.dataset.placeholder = this.adClientPlaceholder;
    adSlot.dataset.placeholder = this.adSlotPlaceholder;
    adFormat.dataset.placeholder = this.adFormatPlaceholder;

    container.appendChild(width);
    container.appendChild(height);
    container.appendChild(adClient);
    container.appendChild(adSlot);
    container.appendChild(adFormat);

    return container;
  }

  /**
   * Extract GoogleAd data from GoogleAd Tool element
   *
   * @param {HTMLDivElement} googleAdElement - element to save
   * @returns {GoogleAdData}
   */
  save(googleAdElement) {
    const width = googleAdElement.querySelector(`.${this.CSS.width}`);
    const height = googleAdElement.querySelector(`.${this.CSS.height}`);
    const adClient = googleAdElement.querySelector(`.${this.CSS.adClient}`);
    const adSlot = googleAdElement.querySelector(`.${this.CSS.adSlot}`);
    const adFormat = googleAdElement.querySelector(`.${this.CSS.adFormat}`);

    return Object.assign(this.data, {
      width: +width.innerHTML,
      height: +height.innerHTML,
      adClient: adClient.innerHTML,
      adSlot: adSlot.innerHTML,
      adFormat: adFormat.innerHTML
    });
  }

  /**
   * Sanitizer rules
   */
  static get sanitize() {
    return {
      // text: {
      //   br: true,
      // },
      // caption: {
      //   br: true,
      // },
    };
  }

  /**
   * Create wrapper for Tool`s settings buttons:
   *
   * @returns {HTMLDivElement}
   */
  renderSettings() {
    const wrapper = this._make('div', [ this.CSS.settingsWrapper ], {});

    return wrapper;
  };

  /**
   * Helper for making Elements with attributes
   *
   * @param  {string} tagName           - new Element tag name
   * @param  {array|string} classNames  - list or name of CSS classname(s)
   * @param  {Object} attributes        - any attributes
   * @return {Element}
   */
  _make(tagName, classNames = null, attributes = {}) {
    let el = document.createElement(tagName);

    if ( Array.isArray(classNames) ) {
      el.classList.add(...classNames);
    } else if( classNames ) {
      el.classList.add(classNames);
    }

    for (let attrName in attributes) {
      el[attrName] = attributes[attrName];
    }

    return el;
  }
}

module.exports = GoogleAd;
