import React from 'react';
import Grid from "@material-ui/core/Grid";
import Users from '../../../components/Admin/Users/Users';
import Navbar from "../../../components/NavBar/Navbar.component";
import { useHistory } from "react-router-dom";


const UsersTable = () => {
    return <Grid container justify="center">
        <Navbar/>
        <Users/>
    </Grid>

}
export default UsersTable;
