import React from 'react';

class Editor extends React.Component {
  constructor() {
    super();
    this.loadMonacoEditor = this.loadMonacoEditor.bind(this);
    this.onMonacoLoaded = this.onMonacoLoaded.bind(this);

    this.loadMonacoEditor();
  }

  loadMonacoEditor() {
    // TODO: Has to move to script tag to improve loading time
    var loaderScript = document.createElement('script');
    loaderScript.type = 'text/javascript';
    loaderScript.src = './vs/loader.js';
    loaderScript.addEventListener('load', this.onMonacoLoaded);
    document.body.appendChild(loaderScript);
  }

  onMonacoLoaded() {
    window.require(['./vs/editor/editor.main'], () => {
      this.editor = monaco.editor.create(document.getElementById('container'), {value: 'Try loading a package below :)'});
    });
  }

  render() {
    return null;
  }
}

export default Editor;
