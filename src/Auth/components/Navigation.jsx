import React, { useContext } from 'react';
import Navbar from '../../components/Navbar';
import Context from './Context';

function AdminNav(props) {
    const AuthContext = useContext(Context);
    const children = [{
        text: 'Home',
        to: '/',
    }];

    if (AuthContext.status) {
        children.push({
            text: 'Log Out',
            type: 'button',
            onClick: AuthContext.logOut,
        });
    }
    else {
        children.push({
            text: 'Log In',
            to: '/log-in',
            type: 'link'
        });
    }

    return (
        <Navbar>
            { children }
        </Navbar>
    );
}

export default AdminNav;