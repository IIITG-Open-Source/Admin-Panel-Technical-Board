import React, { useContext } from 'react';
import Context from './Context';
import { Route, Redirect, useLocation } from 'react-router-dom';

function ProtectedRoute({ children, ...rest }) {
    const context = useContext(Context);

    const URLMatcher = /^\/([-\w]*).*$/;
    //Check the current page
    let requestedPage = useLocation();
    requestedPage = requestedPage.pathname;
    requestedPage = URLMatcher.exec(requestedPage)[1].toLowerCase();

    return (
        <Route {...rest} >
            <React.Fragment>
                {(context.status && context.page === requestedPage) ? children : (
                    <Redirect to='/log-in' />
                )}
            </React.Fragment>
        </Route>
    );
}

export default ProtectedRoute;