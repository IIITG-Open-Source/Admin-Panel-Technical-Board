import React from 'react';
import firebaseAuth from '../firebase';
import { Avatar, Button, Grid, Typography, TextField, Container, Select, InputLabel, MenuItem, FormControl, Snackbar, withStyles } from "@material-ui/core";
import Alert from '@material-ui/lab/Alert';
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Context from './Context';

const styles = {
    avatar: {
        marginLeft: 'auto',
        marginRight: 'auto',
        backgroundColor: 'red',
    },
    grid: {
        minHeight: '82vh',
        paddingLeft: '5%',
        paddingRight: '5%',
    },
};

class LogIn extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            club: '',
            snackbar: false,
        };

        //Method Bindings
        this.submit = this.submit.bind(this);
        this.snackbarClose = this.snackbarClose.bind(this);
        this.auth = this.auth.bind(this);

        //Error codes
        this.errorCode = {
            userNotFound: 'auth/user-not-found',
            invalidEmail: 'auth/invalid-email',
            wrongPassword: 'auth/wrong-password',
            missingClub: 'auth/missing-club',
        };
    }

    static contextType = Context;

    auth(username, password, club) {
        firebaseAuth.auth().signInWithEmailAndPassword(username, password)
            .then((userCredential) => {
                // Signed in
                //Call logIn to update state of the App
                this.context.logIn(userCredential, true, this.state.club);
            })
            .catch((error) => {
                this.setState({
                    snackbar: error.code,
                });
            });
    }

    submit() {
        const { username, password, club } = this.state;

        if (!club || club === '') {
            this.setState({
                snackbar: this.errorCode.missingClub,
            });
        }
        else {
            this.auth(username, password, club);
        }
    }

    snackbarClose() {
        this.setState({
            snackbar: false,
        });
    }

    render() {
        const { classes } = this.props;

        return (
            <Container
                maxWidth='xs'
                disableGutters
            >

                <Grid
                    container
                    spacing={2}
                    direction='column'
                    justify='center'
                    className={classes.grid}
                >

                    <Grid item xs={12}>
                        <Avatar className={classes.avatar}>
                            <LockOutlinedIcon />
                        </Avatar>
                    </Grid>

                    <Grid item xs={12}>
                        <Typography component="h1" variant="h5" align="center">
                            Sign in
                        </Typography>
                        <Alert variant="filled" severity="info">
                            If you believe that you are not added mistankenly, then, please contact the system adminstrator to get added into the database.
                        </Alert>
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            label="Username"
                            autoComplete="username"
                            value={this.state.username}
                            onChange={(e) => this.setState({ username: e.target.value })}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            label="Password"
                            type="password"
                            autoComplete="current-password"
                            value={this.state.password}
                            onChange={(e) => this.setState({ password: e.target.value })}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <InputLabel id='dropdown'>Club</InputLabel>
                            <Select
                                id='dropdown'
                                onChange={(e) => {
                                    this.setState({
                                        club: e.target.value,
                                    });
                                }}
                                value={this.state.club}
                                autoWidth
                            >
                                <MenuItem value='avant'>Avant - Programming Club</MenuItem>
                                <MenuItem value='mavericks'>Mavericks - Machine Learning Society</MenuItem>
                                <MenuItem value='robotics'>Robotics Club</MenuItem>
                                <MenuItem value='technical-board'>Technical Board Homepage</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12}>
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            onClick={this.submit}
                        >
                            Sign In
                        </Button>
                    </Grid>

                </Grid>

                {/* Error Alerts */}
                <ErrorAlert close={this.snackbarClose} state={this.state.snackbar} code={this.errorCode.userNotFound} >
                    User Not Found!
                </ErrorAlert>

                <ErrorAlert close={this.snackbarClose} state={this.state.snackbar} code={this.errorCode.invalidEmail} >
                    Invalid E-Mail!
                </ErrorAlert>

                <ErrorAlert close={this.snackbarClose} state={this.state.snackbar} code={this.errorCode.wrongPassword} >
                    Wrong Password!
                </ErrorAlert>

                <ErrorAlert close={this.snackbarClose} state={this.state.snackbar} code={this.errorCode.missingClub} >
                    Please choose a club
                </ErrorAlert>

            </Container>
        );
    }
}

function ErrorAlert(props) {
    const { close, state, code } = props;

    return (
        <Snackbar
            open={state === code}
            autoHideDuration={2000}
            onClose={close}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        >
            <Alert variant="filled" onClose={close} severity="error" elevation={6}>
                {props.children}
            </Alert>
        </Snackbar>
    );
}

export default withStyles(styles)(LogIn);

