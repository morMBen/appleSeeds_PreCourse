import React from 'react';
import {withRouter} from "react-router";
import Code from '../../../components/Admin/CodeReview/CodeReview.component'
import Navbar from "../../../components/NavBar/Navbar.component";
import {Paper} from "@material-ui/core";

const CodeReview = () => {
    return <Paper>
        <Navbar/>
        <Code/>
    </Paper>
}


export default CodeReview
