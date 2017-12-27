import initialState from './initialState';

import {
    LOAD_ITEM,
    EDIT_ITEM,
    DELETE_ITEM,
    ADD_ITEM
} from './../actions/actionType';

const itemReducer = (state = initialState.items, action) => {

        switch (action.type) {

            case LOAD_ITEM:
                return action.payload;
            case EDIT_ITEM:
                return state;
            case ADD_ITEM:
                return state;
            case DELETE_ITEM:
                return state;
            default:
                return state;
        }
    }
;

export default itemReducer;