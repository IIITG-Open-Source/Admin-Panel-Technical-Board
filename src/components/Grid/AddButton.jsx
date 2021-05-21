import React from 'react';
import { Grid, IconButton, Box, withStyles } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';

const styles = {
    box: {
        width: '100%',
        minHeight: '400px',
        background: 'rgba(0, 0, 0, 0.2)',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    }
};

function AddButton(props) {
    const { classes } = props;

    return (
        <Grid item xs={12} md={4}>
            <Box
                boxShadow={3}
                className={classes.box}
                onClick={props.onClick}
            >
                <IconButton
                    color="primary"
                    aria-label="Add New Items"
                    style={{
                        fontSize: '100px',
                    }}
                >
                    <AddCircleIcon fontSize='inherit' color='action' />
                </IconButton>
            </Box>
        </Grid>
    );
}

export default withStyles(styles)(AddButton);
