import TestModule2 from './module2';

export default class TestModule1 {
  constructor() {
    this.testModule = new TestModule2();
    this.count = 10;
  }

  getCount() {
    this.count = this.testModule.increment();
    return this.count;
  }
}

const testModule = new TestModule1();
document.getElementById('result').innerHTML = testModule.getCount();
