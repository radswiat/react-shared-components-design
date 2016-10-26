import {dtm} from './plugins/dtm';
import {password} from './plugins/password';

let config = {
  plugins : [dtm, password],
  props : {
    active : 0,
    layout : 'style-a'
  }
}

export { config };