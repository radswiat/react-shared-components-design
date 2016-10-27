/// <reference path='../../../../../typings/index.d.ts' />
import * as React       from 'react';
import {CoreComponent}  from '../../../core/core-component/core-component';
import {config}         from './config';
require("!style!css!sass!./_extras/scss/flex-tab-viewer.scss");

export class FlexTabViewer extends CoreComponent {

  static propTypes = {
    active : React.PropTypes.number
  }

  props : {
    children : Array<any>
  };

  constructor() {
    super(config);
    this.state = {
      active : null
    }
  }

  /**
   * @public
   */
  open(tabId) {
    this.emit('tab:change', {tabId : tabId}).then(() => {
      this.setState({
        active: tabId
      })
    });
  }


  /**
   * @public
   */
  render() {
    return (
      <div className={`ftb ${this.state.layout}`}>
        <h4>Flex tab viewer</h4>
        <div className="ftb__container">
          {/* Tab section */}
          <div className="ftb__tabs">
            {this.props.children.map((child, key) => {
              return (
                <div className={`tab ${this.state.active === key ? 'tab--active' : ''}`}
                     key={key}
                     ref={`tab-${key}`}
                     onClick={ () => this.open(key) }>{child.props.children[0]}</div>
              )
            })
            }
          </div>
          {/* Tab contents */}
          <div className="ftb__contents">
            {this.props.children.map((child, key) => {
              return (
                <div key={key}>
                  { this.state.active === key ? <div className="ftb_1" >{child.props.children[1]}</div> : null }
                </div>
              )
            })
            }
          </div>
        </div>
      </div>
    )
  }

}