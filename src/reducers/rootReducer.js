import {combineReducers} from 'redux';
import { routerReducer } from 'react-router-redux';
import itemReducer from './itemReducer';

const rootReducer = combineReducers ({
    routing: routerReducer,
    items: itemReducer
});

export default rootReducer;