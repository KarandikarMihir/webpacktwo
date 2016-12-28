import moment from 'moment';
import './app.css';

const number = Math.floor(Math.random() * (2));

if(number === 1) {
  System.import('./optional.js')
    .then(module => module())
}

console.log(moment().format());
