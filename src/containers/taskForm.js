import React, {Component} from 'react';
import {connect} from 'react-redux';
import classnames from 'classnames';
import {addTask} from './../actions/listAction';

class TaskForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            username: '',
            email: '',
            text: '',
            img: '',
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

        //validation
        let errors = {};
        if (this.state.username === '') errors.username = "Can't be empty!";
        if (this.state.email === '') errors.email = "Can't be empty!";
        if (this.state.text === '') errors.text = "Can't be empty!";
        if (this.state.img === '') errors.img = "Please add img!";
        this.setState({errors});
        const isValid = Object.keys(errors).length === 0;

        //submit
        if (isValid) {
            const {username, email, text, img} = this.state;
            const data = new FormData();
            data.append("username", username);
            data.append("email", email);
            data.append("text", text);
            data.append("image", img);
            this.props.addTask(data);
            this.setState({
                username: '',
                email: '',
                text: '',
                img: '',
                errors: {}
            });
        }
    };

    handleAddImg = (e) => {
        console.log(e.target.value);
        let errors = {...this.state.errors};
        delete errors[e.target.name];
        this.setState({
            [e.target.name]: e.target.value,
            errors: errors
        });
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

                        {/*password input begin*/}
                        <div className={classnames("form-group", {'has-error': !!errors.email})}>
                            <input type="email"
                                   className="form-control"
                                   name="email"
                                   placeholder="Email"
                                   onChange={this.handleChange}
                                   required=""/>
                            <span className="input__error">{errors.email}</span>
                        </div>
                        {/*password input end*/}

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
                        <div className={classnames("form-group", {'has-error': !!errors.img})}>
                            <input
                                type="file"
                                name="img"
                                required=""
                                onChange={this.handleAddImg}
                            />
                            <span className="input__error">{errors.img}</span>
                        </div>
                        <button className="btn btn-success" onClick={this.handleSubmit} type="submit">Add Task</button>
                    </form>
                    </div>
                    {/*<div className="col-md-8">*/}
                        {/*<h2 className="form-signin-heading">Preview Task</h2>*/}
                        {/*<div className="row">*/}
                            {/*<div className="col-md-2">*/}
                                {/*<div className="task__img">*/}
                                    {/*Please add img*/}
                                {/*</div>*/}
                            {/*</div>*/}
                            {/*<div className="col-md-9">*/}
                                {/*<div className="task__name">*/}
                                    {/*<b>Name:</b> Anatoliy*/}
                                {/*</div>*/}
                                {/*<div className="task__mail">*/}
                                    {/*<b>E-Mail:</b> fadsas@mail.ru*/}
                                {/*</div>*/}
                                {/*<div className="task__text">*/}
                                    {/*<b>Task:</b>    Lorem ipsum dolor sit amet, consectetur adipisicing elit. At culpa dignissimos et maiores modi neque nihil non odio officiis placeat, porro quasi rem similique tempore tenetur! Amet distinctio molestiae porro!*/}
                                {/*</div>*/}
                            {/*</div>*/}
                        {/*</div>*/}
                    {/*</div>*/}
                </div>
            </div>
    );
    }
    }

    export default connect(null, { addTask })(TaskForm);