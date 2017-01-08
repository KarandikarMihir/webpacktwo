import React from 'react';
import { H1, H2 } from './StyledComponents'
import './app.css';

class App extends React.Component {
  render() {
    return (
      <div>
        <H1>React + Webpack 2 + HMR</H1>
        <H1>Another Heading</H1>
        <H2>Heading 2</H2>
      </div>
    );
  }
}

export default App;
