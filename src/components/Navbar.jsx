import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Button, withStyles } from '@material-ui/core';

const styles = {
    buttons: {
        textTransform: 'none',
    },
};

function Navbar(props) {
    const { classes } = props;
    const links = props.children;
    const buttons = links.map(link => {
        if(link.type === 'button') {
            return (
                <Button key={link.text} color="inherit" onClick={link.onClick} className={classes.buttons}>
                    {link.text}
                </Button>
            );
        }
        else {
            return (
                <Button component={Link} key={link.text} color="inherit" to={link.to} className={classes.buttons}>
                    {link.text}
                </Button>
            );
        }
    });

    return (
        <React.Fragment>
            <AppBar position="fixed" color='primary'>
                <Toolbar>
                    <React.Fragment>
                        {buttons}
                    </React.Fragment>
                </Toolbar>
            </AppBar>
            <Toolbar />
        </React.Fragment>
    );
}

export default withStyles(styles)(Navbar);