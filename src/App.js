import React, { Component } from 'react';
import './App.css';
import Layout from './Layout.js'
import { Provider } from "react-redux";

import store from "./store";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Layout />
      </Provider>
    );
  }
}

 export default App;
