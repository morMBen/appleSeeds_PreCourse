import React from 'react';
import {Redirect, Route, withRouter} from 'react-router';
import LoginPage from "../../Pages/LoginPage/LoginPage.component";

function AuthenticatedRoute({component: C, ...rest}) {
   let user  = JSON.parse(localStorage.getItem('userData'));
    return (
        <Route
            {...rest}
            render={props =>
                user.role && user.role =='admin'
                    ? <C {...props} />
                    : <LoginPage/>}
        />
    );
}


export default withRouter(AuthenticatedRoute);
