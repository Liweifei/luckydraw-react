import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../logo.svg';
import './appIndex.scss';

export default class appIndex extends React.Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
        </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
        </a>
        <Link to="/appLogin">登录跳转</Link>
        </header>
      </div>
    )
  }
}