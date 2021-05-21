import React from 'react';
import { withStyles } from '@material-ui/core';

const styles = {
    form: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        padding: '2vw',
        justifyContent: 'space-evenly',
    },
    input: {
    },
    button: {
        width: '40%',
        marginLeft: 'auto',
        marginRight: 'auto',
    },
};;

class Files extends React.Component {
    constructor(props) {
        super(props);
        this.state = null;
    }

    render() {
        return (
            <React.Fragment>
                <p>Work Under Progress</p>
            </React.Fragment>
        );
    }
}

export default withStyles(styles)(Files);