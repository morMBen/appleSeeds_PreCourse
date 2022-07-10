import React from 'react';
import {withRouter} from 'react-router';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {Link} from "react-router-dom";
import {useHistory} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

const Navbar = () => {
    const history = useHistory();
    const classes = useStyles();
    const [user, setUser] = React.useState(localStorage.getItem('userData') ? localStorage.getItem('userData') : null);


    React.useEffect(() => {
        if (localStorage.getItem('userData')) {
            setUser(JSON.parse(localStorage.getItem('userData')));
        }

    }, [])

    const logout = () => {
        localStorage.clear();
        setUser(null);
        history.push('/')
    }

    const login = () => {
        if (user && user.role === 'user') {
            return <>
                <a href="https://code.tutsplus.com/courses/javascript-fundamentals">
                    <Button color="inherit">OnLine Course</Button>
                </a>
                <Link to="/coding"> <Button color="inherit">Coding</Button></Link>
                <a><Button color="inherit" onClick={logout}>Logout</Button></a>
            </>
        } else if (user && user.role === 'admin') {
            return <>
                {/*<Link to="/coding"> <Button color="inherit">Coding</Button></Link>*/}
                <Link to="/adminUploadUsers"> <Button color="inherit">users table</Button></Link>
                <Link to="/uploadUsers"> <Button color="inherit">upload user</Button></Link>
                <Link to="/codeReview"> <Button color="inherit">Code Review</Button></Link>
                <a><Button color="inherit" onClick={logout}>Logout</Button></a>
            </>
        } else {
            return <Link to="/login"> <Button color="inherit">Login</Button></Link>
        }
    }

    return <div className={classes.root}>
        <AppBar style={{padding: '10px 5px'}} position="static">
            <Toolbar>
                {/*<IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">*/}
                {/*    <MenuIcon />*/}
                {/*</IconButton>*/}
                <Link to='/'><img height="70"
                                  src="https://static.wixstatic.com/media/37decd_854c0ab57444449ea6ce31fb63c5ca55~mv2.png/v1/fill/w_450,h_179,al_c,q_85,usm_0.66_1.00_0.01/Appleseeds%20horizontal%20blue%20white%403x.webp"
                                  alt="Logo"/></Link>
                <Typography color="inherit" variant="h6" className={classes.title}>
                    &nbsp; AppleSeeds PreBootcamp
                </Typography>

                {login()}
                {user ? "Hello " + user.firstName : ""}

                {/*<Link to="/Coding">  <Button  color="inherit">Login</Button></Link>*/}
            </Toolbar>
        </AppBar>
    </div>
}

export default withRouter(Navbar);
