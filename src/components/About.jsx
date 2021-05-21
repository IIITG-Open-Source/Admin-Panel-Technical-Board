import React from 'react';
import { Container, Box, Typography, TextField, CircularProgress, Button, withStyles } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import FirebaseMethods from '../firebase-methods';
import { Context } from '../components/Context';

const styles = {
    box: {
        paddingTop: '7vh',
        minHeight: '80vh',
    },
    heading: {
        marginBottom: '3vh',
    },
    about: {
        marginBottom: '8vh',
    },
    form: {
        width: '100%',
        marginBottom: '5vh',
    },
    button: {
        fontSize: "20px",
    },
};

class About extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            about: '',
            input: '',
            uploading: false,
        };

        //Instance Properties
        this.eventListener = null;
        this.inputRef = React.createRef();

        //Method Bindings
        this.handleChange = this.handleChange.bind(this);
        this.submit = this.submit.bind(this);
    }

    static contextType = Context;

    componentDidMount() {
        //Focus on the input
        //TODO: Bug - Element not getting focussed
        if(this.inputRef.current) {
            this.inputRef.current.focus();
        }

        //Fetch the current about
        const firebase = this.context;
        const db = firebase.firestore();
        const doc = db.collection('about').doc('main');

        let about = '';
        this.eventListener = doc.onSnapshot(snapshot => {
            about = FirebaseMethods.about.fetch(snapshot);

            this.setState({
                about
            });
        });
    }

    componentWillUnmount() {
        //Unsubscribe to Firebase changes
        this.eventListener();
    }

    handleChange(e) {
        this.setState({
            input: e.target.value,
        });
    }

    submit() {
        const { state } = this;
        const { input } = state;
        const firebase = this.context;

        this.setState({
            uploading: true,
        });

        FirebaseMethods.about.update(input, firebase).then(() => {
            this.setState({
                uploading: false,
                input: '',
            });
        }).catch((error) => {
            console.log("An Error Occurred", error);
        });
    }

    render() {
        const { state, props } = this;
        const { classes } = props;
        const { about, input, uploading } = state;

        return (
            <Container maxWidth='sm'>
                <Box textAlign='center' className={classes.box}>
                    <Typography
                        variant='h3'
                        className={classes.heading}
                    >
                        Current About of the Club
                        </Typography>

                    <Box className={classes.about}>
                        {
                            about === '' ? (
                                <Skeleton animation="wave" variant="rect" width='100%' height='20vh' />
                            ) : (
                                <Typography>{about}</Typography>
                            )
                        }
                    </Box>

                    <Box textAlign='center'>
                        {
                            uploading ? (
                                <CircularProgress size={80} />
                            ) : (
                                <React.Fragment>
                                    <form noValidate autoComplete="off">
                                        <TextField
                                            className={classes.form}
                                            multiline
                                            label="New About"
                                            rows={5}
                                            value={input}
                                            variant="outlined"
                                            onChange={this.handleChange}
                                            ref={this.inputRef}
                                        />
                                    </form>

                                    <Button
                                        className={classes.button}
                                        variant="contained"
                                        color="primary"
                                        onClick={this.submit}
                                    >
                                        Upload
                                    </Button>
                                </React.Fragment>
                            )
                        }
                    </Box>
                </Box>
            </Container >
        );
    }
}

export default withStyles(styles)(About);