import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {Provider} from 'react-redux'
import store from './store'
import {createRoot} from 'react-dom/client';

import {positions, transitions, Provider as AlertProvider} from 'react-alert';

import AlertTemplate from "react-alert-template-basic";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

const options ={
  timeout:5000,
  position:positions.BOTTOM_CENTER,
  transtion:transitions.SCALE,
}
  
root.render(
  <Provider store={store}>
    <AlertProvider template={AlertTemplate} {...options}>
  <App />
  </AlertProvider>
</Provider>,
);
