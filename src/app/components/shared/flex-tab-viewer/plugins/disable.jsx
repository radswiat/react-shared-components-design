export class disable {

  constructor() {

  }

  onTabChange(context, resolve, reject, data) {
    if(context.state.active === data.tabId) {
      reject();
      return;
    }
    resolve();
  }
}