import React from 'react';
import { AppBar, Toolbar, Button, withStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';

const styles = {
    footer: {
        top: 'auto',
        bottom: 0,
        padding: '1vh',
    },
    toolbar: {
        flexDirection: 'column',
        justifyContent: 'space-evenly',
    },
    button: {
        textTransform: 'none',
    },
};

function Footer(props) {
    const { classes } = props;
    const { location } = props;

    let devTeamRoute;
    if(location) {
        if(location === 'log-in') {
            devTeamRoute = '/dev-team';
        }
        else {
            devTeamRoute = `/${location}/dev-team`;
        }
    }
    else {
        devTeamRoute = '/dev-team';
    }

    return (
        <AppBar position="static" color="primary" className={classes.footer}>
            <Toolbar className={classes.toolbar}>
                <Button color="inherit" component={Link} to={devTeamRoute} className={classes.button}>
                    Meet the Development Team
                </Button>
                <Button color="inherit" href="http://iiitg.ac.in/" target="_blank" className={classes.button}>
                    Indian Institute of Information Technology Guwahati
                </Button>
            </Toolbar>
        </AppBar>
    );
}

export default withStyles(styles)(Footer);