import React from 'react';
import ReactDOM from 'react-dom';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import Datapicker from "./Datapicker";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import Placeholder from './Placeholder';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css'
import "./App.css";


ReactDOM.render(

  <React.StrictMode>
    <Placeholder />
  </React.StrictMode>,
  document.getElementById('root')
);


reportWebVitals();
