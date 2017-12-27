import axios from 'axios';
import {LOAD_ITEM} from "./actionType";

axios.defaults.baseURL = 'http://todo.awkoy.com/wp-json';
axios.defaults.contentType = 'application/json';
axios.defaults.crossDomain = true;
axios.defaults.auth = {
        username: 'awkoy',
        password: 'bz97as78pp'
};

const setTask = (tasks) => {
    return {
        type: LOAD_ITEM,
        payload: tasks
    }
};

const loadItem = () => {
    console.log('item loaded');
    return dispatch => {
        axios({
            url: `/wp/v2/posts?_embed`,
            method: 'GET'
        })
            .then((response) => {
                console.log(response);
                dispatch(setTask(response.data));
            })
            .catch((err) => {
                console.log('error:', err);
            });
    }
};

const addPost = (data) => {

    return dispatch => {
        axios({
            url: `/wp/v2/posts`,
            method: 'POST',
            data: {status: 'publish', ...data}
        })
            .then((response) => {
                console.log(response);
                dispatch(setTask(response.data));
            })
            .catch((err) => {
                console.log('error:', err);
            });
    }
};

export { loadItem, addPost};