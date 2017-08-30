import React from 'react';
import fetch from 'isomorphic-fetch';
import Editor from '../Editor';

class Workspace extends React.Component {
  constructor() {
    super();
    this.state = {
      pkgName: ''
    };
    this.onLoad = this.onLoad.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    this.setState({pkgName: e.target.value});
  }

  onLoad(e) {
    const query = 'http://unpkg.com/' + this.state.pkgName;
    fetch(query)
    .then((response) => {
      if (!response.ok) {
        console.log(response);
      }
      console.log('Success');
    }).catch((e) => {
      console.log(e);
    });
  }

  render() {
    return (
      <div>
        <input placeholder="Dependency name" onChange={this.onChange} />
        <input type="button" value="Load" onClick={this.onLoad} />
        <Editor />
      </div>
    );
  }
}

export default Workspace;
