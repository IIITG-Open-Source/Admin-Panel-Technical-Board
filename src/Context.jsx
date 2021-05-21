import React from 'react';

const MyContext = React.createContext(false);

function Context(props) {
    return (
        <MyContext.Provider value={props.value}>
            { props.children }
        </MyContext.Provider>
    );
}

export {
    MyContext,
    Context
};