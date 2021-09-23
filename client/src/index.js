import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import EditorApp from './EditorApp';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from 'react-router-dom';
import { Switch,Route } from 'react-router-dom';

ReactDOM.render(
  
    <BrowserRouter>
        <Switch>
          <Route path="/awesomeeditor/">
            <EditorApp/>
          </Route>
          <Route path="/">
            <App/>
          </Route>
        </Switch>
    </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
