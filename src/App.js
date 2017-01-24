import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import TreeExample from './components/treebeard/';
import TreeExample2 from './components/rc-tree/';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          {/*<img src={logo} className="App-logo" alt="logo" />*/}
          <h2>React tree tests</h2>
        </div>
        <TreeExample/>
        <TreeExample2/>
      </div>
    );
  }
}

export default App;
