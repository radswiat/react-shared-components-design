export class dtm {

  constructor() {

  }

  onTabChange(resolve, reject) {
    console.log('%c DTM:click:start', 'color: yellow; background: silver; font-size: 12px;')
    setTimeout(() => {
      console.log('%c DTM:click:done', 'color: blue; background: silver; font-size: 12px;')
      resolve();
    }, 1000);
  }
}