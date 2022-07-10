/* eslint-disable linebreak-style */
/* eslint-disable import/no-named-as-default-member */
import React from 'react';
import {Route, Switch, withRouter} from 'react-router';
import {BrowserRouter} from 'react-router-dom';
import './app.css';
import HomePage from './Pages/HomePage/HomePage.component';
import {BrowserRouter as Router} from "react-router-dom";
import Home from './Pages/HomePage/HomePage.component'
import Login from './Pages/LoginPage/LoginPage.component'
import Coding from './Pages/CodingPage/CodingPage.component'
import UsersTable from "./Pages/AdminPages/UsersTable/UsersTable";
import AuthenticatedRoute from "./components/Admin/AuthRoute";
import UploadUsersPage from './Pages/AdminPages/UploadUsers/UploadUsers.component'
import Assignments from "./Pages/AdminPages/AssignmentsUpload/Assignments";
import CodeReview from "./Pages/AdminPages/CodeReview/CodeReview.pages";
export default function App() {

    return (
        <Router>
            <Switch>
                <Route exact path={"/"} component={withRouter(Home)}/>
                <Route exact path={"/Login"} component={Login}/>
                <Route exact path={'/coding'} component={withRouter(Coding)}/>
                <Route exact path={'/Assignments'}>
                    <Assignments></Assignments>
                </Route>

                <AuthenticatedRoute exact path="/adminUploadUsers" component={withRouter(UsersTable)}/>
                <AuthenticatedRoute exact path="/uploadUsers" component={withRouter(UploadUsersPage)}/>
                <AuthenticatedRoute exact path="/codeReview" component={withRouter(CodeReview)}/>

            </Switch>
        </Router>
    );
}
