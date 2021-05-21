import React from 'react';
import { Grid, Box, Button, withStyles } from '@material-ui/core';

const styles = {
    box: {
        width: '100%',
        minHeight: '400px',
        cursor: 'pointer',
        textAlign: 'center',
        padding: '10px',
        border: '1px dashed black',
        boxSizing: 'border-box',
    },
    buttons: {
        margin: '5vh 3vw',
        fontSize: "20px",
    }
};

class Item extends React.Component {
    constructor(props) {
        super(props);
        this.ref = React.createRef();
        this.identifier = this.props.identifier;

        //Method Bindings
        this.delete = this.delete.bind(this);
    }

    upload() {
        if (this.ref.current && this.ref.current.upload) {
            this.ref.current.upload();
        }
        else {
            console.log("No Upload Function Available");
        }
    }

    delete() {
        this.props.delete(this.identifier);
    }

    render() {
        const { props } = this;
        const { classes } = props;
        const { children: PassedComponent } = props;

        return (
            <Grid item xs={12} md={4}>
                <Box className={classes.box}>
                    {
                        PassedComponent ? (
                            <PassedComponent delete={this.delete} identifier={this.identifier} ref={this.ref} />
                        ) : (
                            <h1>A component is supposed to be here</h1>
                        )
                    }
                    {/* Delete Button */}
                    <Button onClick={this.delete} variant="contained" color="secondary" className={classes.buttons}>
                        Delete
                    </Button>
                </Box>
            </Grid>
        );
    }
}

export default withStyles(styles)(Item);
