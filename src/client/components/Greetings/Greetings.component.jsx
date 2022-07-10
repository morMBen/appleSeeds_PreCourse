/* eslint-disable linebreak-style */
import React, {useState, useEffect} from 'react';
import AlertComponent from "../Alert/Alert.component";
import './Greetings.styles.css';
import Grid from "@material-ui/core/Grid";

const items = {
    roles: [
        {text: "Write clean code", type: "info"},
        {text: "Don't change the name of the main function", type: "info"},
        {text: "All your code goes inside the main function", type: "info"},
        {text: "We are checking the return value of the main function", type: "info"},
    ],
    announcements : [
        {text: "ex1-ex4 3.7", type: "warning"},
        {text: "ex5-ex9 6.7", type: "warning"},
        {text: "ex10-ex15 12.7", type: "warning"},
    ]

}


const Greetings = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem('userData')));
    }, []);


    return (
        <div className="greetings-container">
            <div className={'msg-role'}>
                <Grid style={{display: "flex", flexDirection: "column", justifyContent: "space-between"}}>

                    <h3>The rules:</h3>
                    <AlertComponent items={items.roles}/>
                </Grid>
                <div>
                    {/*<h3>Recent announcements:</h3>*/}
                    {/*<AlertComponent items={items.announcements}/>*/}
                </div>
            </div>
            <br/>
        </div>
    );

};

export default Greetings;
