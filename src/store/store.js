import {createStore} from 'redux';
import Reducer from './Reducer'
var store = new createStore(Reducer);
export default store;