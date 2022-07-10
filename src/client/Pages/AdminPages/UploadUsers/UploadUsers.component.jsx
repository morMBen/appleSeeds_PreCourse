import React from 'react';
import StudentsFileUpload from "../../../components/Admin/StudentsUploadFile/StudentsFileUpload";
import Navbar from "../../../components/NavBar/Navbar.component";
//import Users from "../../../components/Admin/Users/Users";
import Grid from "@material-ui/core/Grid";

const UploadUsersPage = () => {
        return <Grid>
            <Navbar/>
            <StudentsFileUpload/>
        </Grid>

    }
;

export default UploadUsersPage;
