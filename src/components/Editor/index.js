import React from 'react';

class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.currentValue = this.props.value || '';

    this.loadMonacoEditor = this.loadMonacoEditor.bind(this);
    this.onMonacoLoaded = this.onMonacoLoaded.bind(this);
    this.onEditorMount = this.onEditorMount.bind(this);
    this.onSave = this.onSave.bind(this);

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

  /*
   *  Attach event listener for editor changes
   */
  onEditorMount() {
    this.editor.onDidChangeModelContent(event => {
      const value = this.editor.getValue();
      this.currentValue = value;
    });
  }

  onSave() {
    const output = Babel.transform(this.currentValue, { presets: ['es2015'] })
      .code;
    console.log(output);
    this.props.onTranspile(output);
  }

  onMonacoLoaded() {
    window.require(['./vs/editor/editor.main'], () => {
      this.editor = monaco.editor.create(document.getElementById('container'), {
        value: '//Try loading a package below. Click on Save for transpiling.'
      });
      this.onEditorMount();
    });
  }

  render() {
    return (
      <div>
        <input type="button" value="Save" onClick={this.onSave} />
      </div>
    );
  }
}

export default Editor;
