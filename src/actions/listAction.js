import axios from 'axios';
import { LOAD_TASK } from './actionType';

const URL = 'https://uxcandy.com/~shapoval/test-task-backend?developer=YaroslavBoiko';

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

const addTask = (data) => {

    return dispatch => {
        axios({
            url: URL,
            crossDomain: true,
            method: 'POST',
            mimeType: "multipart/form-data",
            contentType: false,
            processData: false,
            data: data,
            dataType: "json"
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

export {loadTask, addTask};