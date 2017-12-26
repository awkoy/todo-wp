import initialState from './initialState';

import {
    LOAD_TASK
} from './../actions/actionType';

const itemReducer = (state = initialState.tasks, action) => {

        switch (action.type) {

            case LOAD_TASK:
                return state;

            default:
                return state;
        }
    }
;

export default itemReducer;