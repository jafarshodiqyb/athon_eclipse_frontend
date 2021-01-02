import React, { Component } from "react";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Main from "./pages/main";
import { Provider } from "react-redux";
import { store } from "./store/configureStore";
import { SnackbarProvider } from "notistack";

// const store = store();
const notistackRef = React.createRef()
class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <SnackbarProvider dense={false} maxSnack={5}  ref={notistackRef} onClose={(event, reason, key) => {
        if (reason === 'clickaway') {
          notistackRef.current.closeSnackbar(key)
        }
      }}>
        <Provider store={store}>
          <BrowserRouter>
            <div className="App">
              <Main />
            </div>
          </BrowserRouter>
        </Provider>
      </SnackbarProvider>
    );
  }
}

export default App;
