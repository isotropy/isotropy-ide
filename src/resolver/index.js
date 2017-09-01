import fetch from 'isomorphic-fetch';

export default class resolver {
  constructor() {
    this.unPkgRoot = 'http://unpkg.com/';

    this.getDependencies = this.getDependencies.bind(this);
    this.loadPackage = this.loadPackage.bind(this);
    this.processDependencies = this.processDependencies.bind(this);
  }

  // Dunno if we need this yet.
  getDependencies(packageName) {
    const query = `${this.unPkgRoot}${packageName}/?meta`;
    fetch(query, {
      headers: {},
      method: 'GET',
      mode: 'cors'
    })
    .then((response) => {
      if (!response.ok) {
        console.log(response);
      }
      return response.json();
    })
    .then((response) => {
      this.processDependencies(response.files);
    }).catch((e) => {
      console.log(e);
    });
  }

  processDependencies(files) {
    const deps = files.filter(f => {
      if (f.contentType === 'application/octet-stream') { // Look into directories
        this.processDependencies(f.files);
      }
      return f.contentType === 'application/javascript';  // Filter only JS file dependencies
    });
    deps.forEach((f) => {
      const file = f.path.split('/')[1];
      this.getDependencies(file);
      this.loadPackage(file);
    });
  }

  async loadPackage(packageName) {
    // this.getDependencies(packageName);
    const query = `${this.unPkgRoot}${packageName}`;
    const response = await fetch(query, {
      headers: {},
      method: 'GET',
      mode: 'cors'
    });
    const data = await response.blob();
    return data;
  }
}
