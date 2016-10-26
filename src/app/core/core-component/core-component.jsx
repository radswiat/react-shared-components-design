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
   * @returns {any|void}
   */
  static dotToCamel(string: string[]) {
    return string.replace(/:(.)/g, (string) => {
      return string[1].toUpperCase();
    });
  }


  static getFuncName(func) {
    let name;
    if (func.prototype.name === undefined) {
      name = /function ([^(]*)/.exec(func + "")[1];
    }
    return name;
  }

  /**
   * Merge config & props
   * set them as a state
   * @private
   */
  mergePropsAndConfigWithState() {
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
  initPlugins() {
    this.config.plugins.forEach((Plugin) => {
      if (this.props.plugins !== void 0) {
        if (this.props.plugins[CoreComponent.getFuncName(Plugin)]) {
          this.plugins.push(new Plugin());
        }
      } else {
        this.plugins.push(new Plugin());
      }
    })
  }

  /**
   * When component mount
   * @protected
   */
  componentWillMount() {
    this.initPlugins();
    this.mergePropsAndConfigWithState();
  }

  /**
   * Emit event to be catch by plugins
   * @protected
   */
  emit(eventName) {
    eventName = CoreComponent.dotToCamel('on:' + eventName);
    return new Promise((resolve, reject) => {
      let pluginsPromises = [];
      this.plugins.forEach((plugin) => {
        pluginsPromises.push(new Promise((resolve, reject) => {
          if (typeof plugin[eventName] === 'function') {
            plugin[eventName](resolve, reject);
          } else {
            resolve();
          }
        }));
      })
      Promise.all(pluginsPromises).then(() => {
        resolve()
      }, () => {
        console.error('reject!?');
      });
    })
  }

}