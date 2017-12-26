import React, {Component} from 'react';
import {connect} from 'react-redux';
import classnames from 'classnames';
import {addPost} from './../actions/listAction';

class TaskForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            username: '',
            text: '',
            errors: {}
        }
    }

    static propTypes = {};

    static defaultProps = {};

    handleChange = (e) => {
        console.log(e.target.name, e.target.value);
        let errors = {...this.state.errors};
        delete errors[e.target.name];
        this.setState({
            [e.target.name]: e.target.value,
            errors: errors
        });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        console.log('submit');
        //validation
        let errors = {};
        if (this.state.username === '') errors.username = "Can't be empty!";
        if (this.state.text === '') errors.text = "Can't be empty!";
        this.setState({errors});
        const isValid = Object.keys(errors).length === 0;

        //submit
        if (isValid) {
            console.log('valid');
            const {username, text} = this.state;
            const data = {
                title: username,
                excerpt: 'test post',
                content: text
            };
            this.props.addPost(data);
            this.setState({
                username: '',
                email: '',
                text: '',
                img: '',
                errors: {}
            });
        }
    };

    render() {

        const {
            errors,
        } = this.state;

        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-4">
                    <form className="form-task">
                        <h2 className="form-signin-heading">Your Task</h2>
                        {/*login input begin*/}
                        <div className={classnames("form-group", {'has-error': !!errors.username})}>
                            <input type="text"
                                   className="form-control"
                                   name="username"
                                   placeholder="Name"
                                   onChange={this.handleChange}
                                   required=""/>
                            <span className="input__error">{errors.username}</span>
                        </div>
                        {/*login input end*/}

                        <div className={classnames("form-group", {'has-error': !!errors.text})}>
                            <textarea
                                type="text"
                                className="form-control"
                                name="text"
                                placeholder="Task Text"
                                onChange={this.handleChange}
                                rows="4"
                                required=""/>
                                <span className="input__error">{errors.text}</span>
                        </div>
                        <button className="btn btn-success" onClick={this.handleSubmit} type="submit">Add Task</button>
                    </form>
                    </div>
                </div>
            </div>
    );
    }
    }

    export default connect(null, { addPost })(TaskForm);