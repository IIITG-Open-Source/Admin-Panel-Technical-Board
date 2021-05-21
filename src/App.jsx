import React from 'react';
import theme from './Theme';
import { ThemeProvider } from '@material-ui/core/styles';
import { Switch, Route, useLocation } from 'react-router-dom';
import Navigation from './Navigation';
import Footer from './Footer';
import Home from './components/Home';
import Avant from './Avant';
import Auth from './Auth';
import DevTeam from './components/Dev';

function App() {
    const URLMatcher = /^\/([-\w]*).*$/;

    const exceptions = [];

    let page = useLocation();
    page = page.pathname;
    page = URLMatcher.exec(page)[1].toLowerCase();

    return (
        <ThemeProvider theme={theme}>
            {/*
                Auth.ProvideAuth will provide the follwing things as context:-
                1. user: User Details
                2. status: Status
                3. logIn: logIn function to update the status
                4. logOut: logOut function to update the status
            */}
            <Auth.ProvideAuth exceptions={exceptions} location={page}>

                {/* Navbar */}
                <Navigation page={page} />

                {/* Routes */}
                <Avant />

                {/* Home */}
                <Switch>
                    
                    <Route exact path='/' component={Home} />
                    
                    <Route path='/log-in' component={Auth.LogIn} />
                    
                    <Route path={`/${page}/dev-team`}>
                        <DevTeam />
                    </Route>
                    <Route path={`/dev-team`}>
                        <DevTeam />
                    </Route>

                    {/* Special Route to showcase the admin panel as a project */}
                    <Route path='/dev' />

                </Switch>

                <Footer location={page} />

            </Auth.ProvideAuth>
        </ThemeProvider>
    );
}

export default App;
