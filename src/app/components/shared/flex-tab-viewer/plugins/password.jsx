export class password {

  constructor() {

  }

  onTabChange(resolve, reject) {
    var password = prompt("What is a password?");
    if (password === 'bt') {
      resolve();
    } else {
      reject(new Error('wrong password'));
    }
  }
}