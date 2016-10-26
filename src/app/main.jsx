/// <reference path='../../typings/index.d.ts' />
import * as React       from 'react';
import * as ReactDOM    from 'react-dom';
import {FlexTabViewer}  from './components/shared/flex-tab-viewer/flex-tab-viewer';

/**
 * React app class
 */
class ReactApp extends React.Component{

  constructor() {
    super();
    this.title = 'Tab: ';
  }

  render() {
    return (
      <div>
        <h1>React</h1>
        <FlexTabViewer
          active={1}
          plugins={{'dtm': false}}
          layout="style-a">
          <tab1>
            <span>Mobile</span>
            <div>{this.title} 1 Mobile</div>
          </tab1>
          <tab2>
            <span>TV</span>
            <div>{this.title} 2 TV content</div>
          </tab2>
        </FlexTabViewer>
        <hr />
        <FlexTabViewer active={1} layout="style-b">
          <tab1>
            <span>Mobile</span>
            <div>{this.title} 1 Mobile</div>
          </tab1>
          <tab2>
            <span>TV</span>
            <div>{this.title} 2 TV content</div>
          </tab2>
        </FlexTabViewer>
      </div>
    );
  }
}

ReactDOM.render(
  <ReactApp compiler='TypeScript' framework='React'/>,
  document.getElementById('app')
);




