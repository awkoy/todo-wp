import React, {Component} from 'react';
import {string} from 'prop-types';

import Header from './../header/header';
import TaskForm from "./../../containers/taskForm";
import TaskList from "./../../containers/taskList";

class Home extends Component {

    static childContextTypes = {
        user: string
    };

    getChildContext() {
        return {user: this.props.user};
    }

    render() {
        return (
            <div className="container">
                <Header/>
                <TaskForm/>
                <TaskList/>
            </div>
        );
    }
};

export default Home;