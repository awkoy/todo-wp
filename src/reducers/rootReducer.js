import {combineReducers} from 'redux';
import { routerReducer } from 'react-router-redux';
import itemReducer from './itemReducer';

const rootReducer = combineReducers ({
    routing: routerReducer,
    tasks: itemReducer
});

export default rootReducer;