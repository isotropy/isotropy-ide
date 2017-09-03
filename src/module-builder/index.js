import path from 'path';
import files from '../../fs';

export default class ModuleBuilder {
  constructor() {
    this.fsRoot = 'fs/';
    SystemJS.config({
      map: {
        'plugin-babel': 'assets/plugin-babel/plugin-babel.js',
        'systemjs-babel-build': 'assets/plugin-babel/systemjs-babel-browser.js'
      },
      packages: {
        fs: { defaultExtension: 'js' }
      },
      transpiler: 'plugin-babel'
    });
  }

  build() {
    files.forEach(file => {
      if (!file.entry) {
        return;
      }
      SystemJS.import(
        `${this.fsRoot}${file.dir}${file.path}`
      ).then(output => {});
    });
  }
}
