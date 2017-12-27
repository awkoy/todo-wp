import React from 'react';
import {Link} from 'react-router-dom';
import {string} from 'prop-types';
import {withRouter} from "react-router-dom";

const Header = (props,context) => {

    const leaveOutAdmin = () => {
        window.localStorage.clear();
        props.history.push('/');
        document.location.reload(true);
    };

    const { user } = context;

    return (
        <nav className="navbar navbar-default">

            {/*admin navbar begin*/}
            { user === 'admin' &&
                <div className="container-fluid">
                    <div className="navbar-right navbar-collapse">
                        <button
                            onClick={leaveOutAdmin}
                            className="btn navbar-btn btn-primary">
                            Log Out
                        </button>
                    </div>
                </div>
            }
            {/*admin navbar end*/}

            {/*user navbar begin*/}
            { user === 'default' &&
                <div className="container-fluid">
                    <div className="navbar-right navbar-collapse">
                        <Link
                            to="/login"
                            className="btn navbar-btn btn-success">
                            Admin-Panel
                        </Link>
                    </div>
                </div>
            }
            {/*user navbar end*/}

        </nav>
    );
};

Header.contextTypes = {
    user: string
};

export default withRouter(Header);