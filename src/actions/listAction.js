import axios from 'axios';
import { LOAD_TASK } from './actionType';

const URL = 'http://todo.awkoy.com';
const setTask = (tasks) => {
    return {
        type: LOAD_TASK,
        payload: tasks
    }
};

const loadTask = ({ page = 1, sort_field = 'id', sort_direction = 'asc' } = {}) => {
    return dispatch => {
        axios.get(URL, {
            page,
            sort_field,
            sort_direction
        })
            .then((response) => {
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
            url: `${URL}/wp-json/wp/v2/posts`,
            method: 'POST',
            data: data,
            crossDomain: true,
            contentType: 'application/json',
            beforeSend: function ( xhr ) {
                xhr.setRequestHeader( 'Authorization', 'Basic ' + Base64.encode( 'awkoy:bz97as78pp' ) );
            }
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

export {loadTask, addPost};