import React from 'react';
import { Typography, Container, withStyles } from '@material-ui/core';
import Grid from '../../../components/Grid';

const styles = {
    container: {
        textAlign: 'center',
        marginTop: '5vh',
        marginBottom: '5vh',
    },
    heading: {
        marginBottom: '5vh',
    },
};

function Resources(props) {
    const { classes } = props;

    return (
        <Container maxWidth={false} className={classes.container} >
            <Typography variant="h2" component="h1" className={classes.heading}>
                Resources
            </Typography>
            <Grid heading='Files'>
            </Grid>
            <Grid heading='Videos'>
            </Grid>
        </Container>
    );
}

export default withStyles(styles)(Resources);