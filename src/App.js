import React, { Component } from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import {Main} from './components/main';
import { Provider } from 'react-redux';
import { store } from './redux/configureStore';

// const store = store();

class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div className="App">
            <Main />
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
