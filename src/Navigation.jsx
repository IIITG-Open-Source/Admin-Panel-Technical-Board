import React from 'react';
import AuthNav from './Auth/components/Navigation';
import AvantNav from './Avant/components/Navigation';

function Navigation(props) {
    const { page } = props;

    if (page === 'avant') {
        return <AvantNav />;
    }
    else {
        return <AuthNav />;
    }
}

export default Navigation;
