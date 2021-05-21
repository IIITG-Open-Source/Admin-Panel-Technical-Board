import React from 'react';
import firebaseAuth from './firebase';
import { Redirect } from 'react-router-dom';
import { Alert } from '@material-ui/lab';
import { Grid, Snackbar, Typography, CircularProgress, withStyles } from "@material-ui/core";
import LogIn from './components/LogIn';
import LogOut from './components/LogOut';
import Context from './components/Context';
import ProtectedRoute from './components/ProtectedRoute';

const styles = {
    text: {
        marginTop: '5vh',
        fontSize: '30px',
    },
};

function RedirectToClub(props) {
    const { page, exceptions } = props;
    const { location } = props;

    if (location !== page || exceptions.indexOf(`/${location}`) === -1) {
        return <Redirect to={`/${page}`} />
    }
    else {
        return null;
    }
}

function RedirectToHome(props) {
    const { location } = props;

    if (location !== 'log-in' || !location) {
        return <Redirect to='/' />
    }
    else {
        return null;
    }
}

class ProvideAuth extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            status: false,
            redirect: false,
            page: null,
            snackbar: false,
            loading: true,
        };

        this.exceptions = this.props.exceptions;

        //Method Bindings
        this.logIn = this.logIn.bind(this);
        this.logOut = this.logOut.bind(this);
        this.handleCloseSnackbar = this.handleCloseSnackbar.bind(this);
    }

    componentDidMount() {
        //Realtime listener to auth changes
        firebaseAuth.auth().onAuthStateChanged(user => {
            let currentUser = firebaseAuth.auth().currentUser;

            if (currentUser) {
                const { email } = currentUser;
                this.logIn(email, true, 'avant');
            }

            this.setState({
                loading: false,
            });
        });
    }

    logIn(user, status, page, text) {
        this.setState({
            user, status, page,
            snackbar: 'welcome',
        });
    }

    logOut() {
        this.setState({
            user: null,
            status: false,
            page: null,
            snackbar: 'log-out',
        });
        LogOut();
    }

    handleCloseSnackbar() {
        this.setState({
            snackbar: false
        });
    }

    render() {
        const { classes } = this.props;
        const { state } = this;
        const { user, snackbar } = state;

        return (
            <React.Fragment>
                {
                    state.loading ? (
                        <Grid
                            container
                            spacing={0}
                            direction="column"
                            alignItems="center"
                            justify="center"
                            style={{ minHeight: '100vh' }}
                        >
                            <CircularProgress size={60} color="secondary" />
                            <Typography className={classes.text}>Please wait while the app loads...</Typography>
                        </Grid>
                    ) : (
                        <React.Fragment>
                            <Context.Provider value={{
                                ...this.state,
                                logIn: this.logIn,
                                logOut: this.logOut,
                            }}>
                                {
                                    this.state.page ? (
                                        <RedirectToClub page={this.state.page} exceptions={this.exceptions} location={this.props.location} />
                                    ) : (
                                        <RedirectToHome exceptions={this.exceptions} currentPage={this.props.currentPage} />
                                    )
                                }

                                {/* Passed Child Components */}
                                {this.props.children}

                            </Context.Provider>

                            <Snackbar
                                open={snackbar === 'log-in'}
                                autoHideDuration={2000}
                                onClose={this.handleCloseSnackbar}
                                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                            >
                                <Alert variant="filled"  onClose={this.handleCloseSnackbar} severity="success">
                                    Successfully Logged In
                                </Alert>
                            </Snackbar>

                            <Snackbar
                                open={snackbar === 'log-out'}
                                autoHideDuration={2000}
                                onClose={this.handleCloseSnackbar}
                                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                            >
                                <Alert variant="filled" onClose={this.handleCloseSnackbar} severity="error">
                                    Successfully Logged Out
                                </Alert>
                            </Snackbar>

                            <Snackbar
                                open={snackbar === 'welcome'}
                                autoHideDuration={2000}
                                onClose={this.handleCloseSnackbar}
                                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                            >
                                <Alert variant="filled" onClose={this.handleCloseSnackbar} severity="success">
                                    {`Welcome ${user}`}
                                </Alert>
                            </Snackbar>

                        </React.Fragment>
                    )
                }
            </React.Fragment>
        );
    }
}

const Auth = {
    ProvideAuth: withStyles(styles)(ProvideAuth),
    LogIn,
    LogOut,
    Context,
    ProtectedRoute,
};

export default Auth;