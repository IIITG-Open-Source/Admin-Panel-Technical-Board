import React from 'react';
import { Container, Typography, withStyles } from '@material-ui/core';

const styles = {
    container: {
        textAlign: 'center',
        height: '80vh',
    },
    heading: {
        position: 'relative',
        top: '40%',
        transform: 'translateY(-50%)',
    },
};

function Home(props) {
    const { classes } = props;

    return (
        <Container maxWidth={false} className={classes.container} >
            <Typography variant="h3" component="h1" className={classes.heading} >
                Welcome to Technical Admin Dashboard
            </Typography>
            <Typography variant="h5" component="h2" className={classes.heading} >
                Be careful while adding content. The features to delete from the Database aren't implemented yet. 
            </Typography>
        </Container>
    );
}

export default withStyles(styles)(Home);