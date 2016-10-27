import * as React   from 'react';
import {Promise}    from 'bluebird';

export class CoreComponent extends React.Component {

  config;
  plugins = [];

  constructor(config) {
    super();
    this.config = config;
  }

  /**
   * Convert dot:notation:string to camelCaseString
   * @param string
   * TODO: move to utils
   * @returns {string}
   */
  static dotToCamel(string: string[]) {
    return string.replace(/:(.)/g, (string) => {
      return string[1].toUpperCase();
    });
  }

  /**
   * Get function name from Function
   * @param func
   * TODO: move to utils
   * @returns {string}
   */
  static getFuncName(func) {
    let name;
    if (func.prototype.name === undefined) {
      name = /function ([^(]*)/.exec(func + "")[1];
    }
    return name;
  }

  /**
   * Clone object
   * TODO: move to utils
   * @returns {object}
   */
  static clone(obj) {
    if (null == obj || "object" != typeof obj) return obj;
    var copy = obj.constructor();
    for (var attr in obj) {
      if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
    }
    return copy;
  }

  /**
   * Merge config & props
   * set them as a state
   * @private
   */
  _mergePropsAndConfigWithState() {
    for (let key of Object.keys(this.config.props)) {
      this.setState({
        [key]: this.props[key] || this.config.props[key]
      })
    }
  }

  /**
   * Initialize all plugins from config.tsx
   * - cross check if they are not disabled by props.plugins
   * @private
   */
  _initPlugins() {
    this.config.plugins.forEach((Plugin) => {
      if (this.props.plugins !== void 0) {
        if (this.props.plugins[CoreComponent.getFuncName(Plugin)] !== false) {
          this.plugins.push(new Plugin());
        }
      } else {
        this.plugins.push(new Plugin());
      }
    })
  }


  _emitNext(eventName, resolve, reject, plugins, extraData) {

    // no more plugins ? resolve!
    if(!plugins.length) { resolve(); return; }

    let plugin = plugins.shift();

    if (typeof plugin[eventName] === 'function') {
      new Promise((resolve, reject) => {
        plugin[eventName](this, resolve, reject, extraData);
      }).then(() => {
        this._emitNext(eventName, resolve, reject, plugins, extraData);
      }).catch(() => { reject(); });
      return;
    }

    // next
    this._emitNext(eventName, resolve, reject, plugins, extraData);
  }

  /**
   * When component mount
   * @protected
   */
  componentWillMount() {
    this._initPlugins();
    this._mergePropsAndConfigWithState();
  }


  /**
   * Emit event to be catch by plugins
   * @protected
   */
  emit(eventName, extraData) {
    eventName = CoreComponent.dotToCamel('on:' + eventName);
    return new Promise((resolve, reject) => {
      this._emitNext(eventName, resolve, reject, CoreComponent.clone(this.plugins), extraData);
    })
  }

}