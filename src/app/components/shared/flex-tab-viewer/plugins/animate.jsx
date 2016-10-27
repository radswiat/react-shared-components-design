import $ from 'jquery';

export class animate {

  constructor() {

  }

  onTabChange(context, resolve, reject, data) {
    let $el = $(context.refs[`tab-${data.tabId}`]);
    $el.animate({
      opacity: 0.25
    }, () => {
      $el.animate({ opacity: 1}, () => {
        resolve();
      });
    })
  }
}