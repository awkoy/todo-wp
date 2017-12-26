import React, {Component} from 'react';
import {connect} from 'react-redux';
import {array} from 'prop-types';
import {ButtonToolbar, ToggleButtonGroup, ToggleButton} from 'react-bootstrap';
import {loadTask} from './../actions/listAction';

import TaskItem from './../components/parts/taskItem'

class TaskList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            sortTriggerActive: [],
        };
    }

    // componentDidMount() { this.props.loadTask(); }

    onSortChange = (value) => {
        this.setState({sortTriggerActive: value[value.length - 1]})
    };

    static propTypes = {
        tasks: array
    };

    static defaultProps = {
        tasks: []
    };

    render() {

        const {tasks} = this.props;

        return (
            <div className="panel panel-info">
                <div className="panel-heading ">Task List</div>
                <div className="panel-body">

                    {/*task sorting begin*/}
                    <div className="task__sort">
                        <ButtonToolbar>
                            <h4>Sort by:</h4>
                            <ToggleButtonGroup
                                type="checkbox"
                                value={this.state.sortTriggerActive}
                                onChange={this.onSortChange}>
                                <ToggleButton value={1}>Name</ToggleButton>
                                <ToggleButton value={2}>Mail</ToggleButton>
                                <ToggleButton value={3}>Status</ToggleButton>
                            </ToggleButtonGroup>
                        </ButtonToolbar>
                    </div>
                    {/*task sorting begin*/}

                    {/*task list begin*/}
                    <div className="task__list container-fluid">
                        {tasks.map(el => {
                            return <TaskItem
                                 key={el.id}
                                 name={el.username}
                                 mail={el.email}
                                 text={el.text}
                                 status={el.status}
                                 img={el.image_path}/>
                        })}
                    </div>
                    {/*task list end*/}

                    {/*task pagination begin*/}
                    <div className="task__pagination">
                        <nav aria-label="task navigation">
                            <ul className="pagination justify-content-center">
                                <li className="page-item"><a className="page-link">1</a></li>
                                <li className="page-item"><a className="page-link">2</a></li>
                                <li className="page-item"><a className="page-link">3</a></li>
                            </ul>
                        </nav>
                    </div>
                    {/*task pagination end*/}

                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        tasks: state.tasks
    }
};

export default connect(mapStateToProps, {loadTask})(TaskList);