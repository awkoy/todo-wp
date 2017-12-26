import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import classnames from 'classnames';
import {withRouter} from "react-router-dom";

class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            errors: {}
        }
    }

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
        if (this.state.username === '') errors.username = "Login can't be empty!";
        if (this.state.password === '') errors.password = "Password can't be empty!";
        this.setState({errors});
        const isNotEmpty = Object.keys(errors).length === 0;

        //submit
        if (isNotEmpty) {
            if (this.state.username !== 'admin' || this.state.password !== '12345') {
                errors.message = "Invalid Login/Password!";
            } else {
                window.localStorage.setItem('is_loginned', true);
                document.location.reload();
                this.props.history.push('/');
            }
        }
    };


    render() {

        const {
            errors,
        } = this.state;

        return (
            <div className="container">
                <div className="wrapper">

                    {/*admin-form begin*/}
                    <form
                        className="form-signin"
                        onSubmit={this.handleSubmit}>

                        <h2 className="form-signin-heading">Admin-Panel</h2>

                        {/*login input begin*/}
                        <div className={classnames("form-group input-group-lg", {'has-error': !!errors.username})}>
                            <input type="text"
                                   className="form-control"
                                   name="username"
                                   placeholder="Login"
                                   onChange={this.handleChange}
                                   required=""/>
                            <span className="input__error">{errors.username}</span>
                        </div>
                        {/*login input end*/}

                        {/*password input begin*/}
                        <div className={classnames("form-group input-group-lg", {'has-error': !!errors.password})}>
                            <input type="password"
                                   className="form-control"
                                   name="password"
                                   placeholder="Password"
                                   onChange={this.handleChange}
                                   required=""/>
                            <span className="input__error">{errors.password}</span>
                        </div>
                        {/*password input end*/}

                        <button
                            className="btn btn-lg btn-success btn-block"
                            type="submit">
                            Login
                        </button>
                        <Link
                            className="btn btn-lg btn-default btn-block"
                            to="/">
                            Back
                        </Link>

                        <span className="form__error">{errors.message}</span>
                    </form>
                    {/*admin-form end*/}

                </div>
            </div>
        );
    }
}

export default withRouter(Login);