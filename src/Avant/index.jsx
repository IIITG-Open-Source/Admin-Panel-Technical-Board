import React from 'react';
import firebase from './firebase';
import { ContextProvider } from '../components/Context';
import { Switch } from 'react-router-dom';
import Auth from '../Auth';
import Home from './Home';
import Gallery from './components/Gallery';
import Resources from './components/Resources';
import Events from './components/Events';
import PresentCoordinators from './components/PresentCoordinators';
import PastCoordinators from './components/PastCoordinators';
import About from '../components/About';

function Avant() {
    return (
        <Switch>
            <ContextProvider value={firebase}>
                <Auth.ProtectedRoute path='/avant/gallery'>
                    <Gallery />
                </Auth.ProtectedRoute>

                <Auth.ProtectedRoute path='/avant/events'>
                    <Events />
                </Auth.ProtectedRoute>

                <Auth.ProtectedRoute path='/avant/past-coordinators'>
                    <PastCoordinators />
                </Auth.ProtectedRoute>

                <Auth.ProtectedRoute path='/avant/present-coordinators'>
                    <PresentCoordinators />
                </Auth.ProtectedRoute>

                <Auth.ProtectedRoute path='/avant/resources'>
                    <Resources />
                </Auth.ProtectedRoute>

                <Auth.ProtectedRoute path='/avant/about'>
                    <About>
                        {firebase}
                    </About>
                </Auth.ProtectedRoute>

                <Auth.ProtectedRoute exact path='/avant'>
                    <Home />
                </Auth.ProtectedRoute>
            </ContextProvider>
        </Switch >
    );
}

export default Avant;