import React, {Component} from 'react';
import {string, number} from 'prop-types';
import classnames from 'classnames';

class TaskItem extends Component {

    constructor(props) {
        super(props);

        this.state = {
            showRedactor: false,
            text: this.props.text,
            status: this.props.status,
            errors: {}
        }
    }

    static defaultProps = {
        name: 'Donald Tramp',
        mail: 'nety@gmail.com',
        img: 'https://uxcandy.com/~shapoval/test-task-backend/upload/user_images/5900dfd7/1508840871_6.jpg',
        status: 10,
        text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. At culpa dignissimos et maiores modi neque'
    };

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

    handleChangeStatus = (e) => {
        this.setState({ status: e.target.checked ? 10 : 0 });
    };

    render() {

        const {name, mail, img } = this.props;
        const {showRedactor, status, text, errors} = this.state;
        const {user} = this.context;

        return (
            <div className="task__item row">

                {/*task content begin*/}
                <div className="col-md-3">
                    <img src={img} alt="img" className=" task__img img-thumbnail rounded"/>
                </div>

                <div className="col-md-9">
                    <p><b>Name:</b> {name}  </p>
                    <p><b>E-Mail:</b> {mail} </p>

                    {(status > 0) ?
                        <p className="bg-success"><b>Status:</b> ✔ Done</p>
                        :
                        <p className="bg-danger"><b>Status:</b> In the work</p>
                    }

                    <div className="task__text">
                        <h5><b>Task:</b></h5>
                        {text}
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
                                          defaultValue={text}
                                          rows="3"
                                          onChange={this.handleChangeText}
                                          required=""/>
                                <span className="input__error">{errors.password}</span>
                            </div>
                            <div className="checkbox">
                                <label>
                                    <input
                                        onChange={this.handleChangeStatus}
                                        defaultChecked={status}
                                        type="checkbox"/> Done!
                                </label>
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

    static propTypes = {
        name: string,
        mail: string,
        img: string,
        status: number,
        text: string
    };
}

export default TaskItem;