import React, { Redirect, Route } from 'react-router-dom';
import { authenticationService } from '../services/auth.service';

function ProtectedRoute({ component: Component, ...rest }) {
    let accessToken = authenticationService.accessToken;

    return (
        <Route
            {...rest}
            render={(props) =>
                accessToken === null ? (
                    <Redirect to={'/login'} />
                ) : (
                    <Component {...props} />
                )
            }
        />
    );
}

export default ProtectedRoute;
