/// <reference path='../../typings/index.d.ts' />
import * as React       from 'react';
import * as ReactDOM    from 'react-dom';
import {FlexTabViewer}  from './components/shared/flex-tab-viewer/flex-tab-viewer';
import {FlexColViewer}  from './components/shared/flex-col-viewer/flex-col-viewer';

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

        <FlexColViewer>
        </FlexColViewer>



        <FlexTabViewer
          active={1}
          plugins={{'dtm': false, 'password' : false}}
          layout="ftb--underline-pink">
          <tab1>
            <span>Mobile</span>
            <div>{this.title} 1 Mobile</div>
          </tab1>
          <tab2>
            <span>TV</span>
            <div>{this.title} 2 TV content</div>
          </tab2>
          <tab3>
            <span>BB</span>
            <div>{this.title} 3 BB content</div>
          </tab3>
          <tab4>
            <span>Phone</span>
            <div>{this.title} 4 Phone content</div>
          </tab4>
        </FlexTabViewer>
        <hr />
        <FlexTabViewer
          active={1}
          plugins={{'animate' : false}}
          layout="ftb--underline-blue ftb--double-size">
          <tab1>
            <span>Mobile</span>
            <div>{this.title} 1 Mobile</div>
          </tab1>
          <tab2>
            <span>TV</span>
            <div>{this.title} 2 TV content</div>
          </tab2>
        </FlexTabViewer>
        <FlexTabViewer
          active={1}
          plugins={{'animate' : false, 'disable' : false, password: false}}
          layout="ftb--underline-blue">
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




