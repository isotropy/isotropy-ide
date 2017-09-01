import React from 'react';
import Editor from '../Editor';
import Resolver from '../../resolver';

class Workspace extends React.Component {
  constructor() {
    super();
    this.state = {
      packageName: '',
      packages: []
    };
    this.onChange = this.onChange.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  onChange(e) {
    this.setState({packageName: e.target.value});
  }

  onClick() {
    const resolver = new Resolver();
    const packageName = this.state.packageName;
    resolver.loadPackage(packageName)
    .then((response) => {
      this.setState({packages: this.state.packages.concat(packageName)});
    }).
    catch((e) => {
      console.log(e);
    });
  }

  render() {
    return (
      <div>
        <h3>Dependencies</h3>
        <ul className="dependency-list">
          {
            this.state.packages.map((p) => <li>{p}</li>)
          }
        </ul>
        <input placeholder="Dependency name" onChange={this.onChange} />
        <input type="button" value="Load" onClick={this.onClick} />
        <Editor />
      </div>
    );
  }
}

export default Workspace;
