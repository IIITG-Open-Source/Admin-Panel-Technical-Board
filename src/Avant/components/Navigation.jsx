import React, { useContext } from 'react';
import Navbar from '../../components/Navbar';
import Auth from '../../Auth';

function AvantNav(props) {
    const Context = useContext(Auth.Context);

    return (
        <Navbar>
            {[
                {
                    text: 'Home',
                    to: '/avant',
                    type: 'link',
                },
                {
                    text: 'About',
                    to: '/avant/about',
                    type: 'link',
                },
                {
                    text: 'Gallery',
                    to: '/avant/gallery',
                    type: 'link',
                },
                {
                    text: 'Events',
                    to: '/avant/events',
                    type: 'link',
                },
                {
                    text: 'Past Coordinators',
                    to: '/avant/past-coordinators',
                    type: 'link',
                },
                {
                    text: 'Present Coordinators',
                    to: '/avant/present-coordinators',
                    type: 'link',
                },
                {
                    text: 'Resources',
                    to: '/avant/resources',
                    type: 'link',
                }, {
                    text: 'Log Out',
                    type: 'button',
                    onClick: Context.logOut,
                }
            ]}
        </Navbar>
    );
}

export default AvantNav;