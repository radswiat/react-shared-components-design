/// <reference path='../../../../../typings/index.d.ts' />
import * as React       from 'react';
import dtm from './decorators/dtm';
import password from './decorators/password';

require("!style!css!sass!./_extras/scss/flex-col-viewer.scss");

@password
export class FlexColViewer extends React.Component {

  state = {
    active: null
  }

  handleTrigger(id) {
    this.setState({
      active: id
    })
  }

  /**
   * @public
   */
  render() {
    return (
      <div className="flex-col-viewer">
        <div className="element">
          <div className="trigger" onClick={() => this.handleTrigger(1)}>
            Tab trigger 1
          </div>
          <If condition={this.state.active === 1}>
            <div className="content">
              Tab content 1
            </div>
          </If>
        </div>
        <div className="element">
          <div className="trigger" onClick={() => this.handleTrigger(2)}>
            Tab trigger 2
          </div>
          <If condition={this.state.active === 2}>
            <div className="content">
              Tab content 2
            </div>
          </If>
        </div>
      </div>
    )
  }
}


