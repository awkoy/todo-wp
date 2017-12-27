import React, {Component} from 'react';
import {string} from 'prop-types';
import classnames from 'classnames';

class TaskItem extends Component {

    constructor(props) {
        super(props);

        this.state = {
            title: this.props.title,
            content: this.props.content,
            errors: {}
        }
    }

    toggleShowRedactor = (e) => {
        e.preventDefault();
        this.setState({ showRedactor: !this.state.showRedactor});
    };

    handleChangeText = (e) => {
        let errors = {...this.state.errors};
        delete errors[e.target.name];
        this.setState({
            [e.target.name]: e.target.value,
            errors: errors
        });
    };

    render() {

        const { img, test } = this.props;
        const {title, showRedactor, content, errors} = this.state;
        const {user} = this.context;

        return (
            <div className="task__item row">
                {/*task content begin*/}
                <div className="col-md-3">
                    <img src={img} alt="img" className=" task__img img-thumbnail rounded"/>
                </div>

                <div className="col-md-9">

                    <h3>{title}</h3>
                    <div className="task__text">
                        <h5><b>Task:</b></h5>
                        {content}
                    </div>

                    {( user === 'admin' && !showRedactor ) &&
                        <button
                            onClick={this.toggleShowRedactor}
                            className="btn btn-primary task__edit">
                            Edit
                        </button>
                    }
                </div>
                {/*task content end*/}

                {/*task redactor begin*/}
                {(user === 'admin' && showRedactor) &&
                    <div className="col-md-9">
                        <form onSubmit={this.handleSubmit}>
                            <div className={classnames("form-group", {'has-error': !!errors.password})}>
                                <textarea type="text"
                                          className="form-control"
                                          name="text"
                                          defaultValue={content}
                                          rows="3"
                                          onChange={this.handleChangeText}
                                          required=""/>
                                <span className="input__error">{errors.password}</span>
                            </div>
                            <div className={classnames("form-group", {'has-error': !!errors.password})}>
                                <input    type="text"
                                          className="form-control"
                                          name="title"
                                          defaultValue={title}
                                          onChange={this.handleChangeText}
                                          required=""/>
                                <span className="input__error">{errors.password}</span>
                            </div>
                            <button
                                type="submit"
                                className="btn btn-lg btn-success">
                                Save
                            </button>
                            <button
                                onClick={this.toggleShowRedactor}
                                className="btn btn-lg btn-default">
                                Close
                            </button>
                        </form>
                    </div>
                }
                {/*task redactor end*/}

            </div>
        );
    }

    static contextTypes = {
        user: string
    };
}

export default TaskItem;