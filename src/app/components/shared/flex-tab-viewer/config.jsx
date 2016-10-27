import {dtm} from './plugins/dtm';
import {password} from './plugins/password';
import {animate} from './plugins/animate';
import {disable} from './plugins/disable';

let config = {
  plugins : [disable, animate, dtm, password],
  props : {
    active : 0,
    layout : ''
  }
}

export { config };