import React from 'react';
import {Link} from 'react-router-dom';

const Page404 = ({location}) => {
    return (
        <div className="container page-404">
            <div className="row">
                <div className="col-md-12">
                    <div className="error-template">
                        <h1>Oops!</h1>
                        <h2>404 Not Found</h2>
                        <div className="error-details">
                            Sorry, an error has occured, <b>{location.pathname}</b> page not found!
                        </div>
                        <div className="error-actions">
                            <Link to="/" className="btn btn-primary btn-lg">
                                Go Home Page
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Page404;