import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import App from 'App';
import { Provider } from 'react-redux';
import configure from 'store/configure';

const store = configure();

class Root extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    );
  }
}

export default Root;
