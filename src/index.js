import React from 'react';
import ReactDOM from 'react-dom';
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";


import Header from './header';
import Body from './body';
import Footer from './footer';

import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
  <div>
    <Header/>
    <DndProvider backend={HTML5Backend}>
      <Body/>
    </DndProvider>
    <Footer/>
  </div>,
  document.querySelector('#container')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
