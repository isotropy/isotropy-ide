import path from 'path';
import Builder from 'systemjs-builder';

export default class ModuleBuilder {
  constructor() {
    this.builder = new Builder();   // TODO: Files from VFS fed here?
    //new Builder('path/to/baseURL', 'path/to/system/config-file.js');
  }

  build() {
    this.builder
    .bundle('module.js', {minify: true}})
    .then(function(output) {
      console.log(output.source);   // generated bundle source
      console.log(output.sourceMap); // generated bundle source map
      console.log(output.modules);   // array of module names defined in the bundle
    })
    .catch(function(err) {
      console.log(err);
    });
  }
}
