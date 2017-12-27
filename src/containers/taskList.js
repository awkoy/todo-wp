import React, {Component} from 'react';
import {connect} from 'react-redux';
import {array} from 'prop-types';
import {loadItem} from './../actions/listAction';

import TaskItem from './../components/parts/taskItem'

class TaskList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            sortTriggerActive: [],
        };
    }

    componentDidMount() { this.props.loadItem(); }


    static propTypes = {
        items: array
    };

    static defaultProps = {
        items: []
    };

    render() {

        const {items} = this.props;

        return (
            <div className="panel panel-info">
                <div className="panel-heading ">Post List</div>
                <div className="panel-body">

                    {/*task list begin*/}
                    <div className="task__list container-fluid">
                        {items.map(el => {
                            return <TaskItem
                                 key={el.id}
                                 title={el.title}
                                 content={el.content}
                                 img={el._embedded["wp:featuredmedia"][0].source_url}/>
                        })}
                    </div>
                    {/*task list end*/}

                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    console.log(state);
    return {
        items: state.items
    }
};

export default connect(mapStateToProps, {loadItem})(TaskList);