import React from 'react';

import Component from './Component'
import H1 from './H1';
import './app.css';

class App extends React.Component {
  render() {
    return (
      <div>
        <H1>React + Webpack 2 + HMR</H1>
        <H1>Another Heading Two</H1>
        <Component />
      </div>
    );
  }
}

export default App
