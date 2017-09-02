import React from 'react';

class Preview extends React.Component {
  constructor() {
    super();
  }

  render() {
    return <iframe src={this.props.src} />;
  }
}

export default Preview;
