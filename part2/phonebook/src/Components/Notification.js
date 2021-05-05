import React from 'react';

const Notification = ({message, isError}) => {
    if (message === null) return null
    
    const color = isError ? 'red' : 'green'

    const style = {
        color: color,
        background: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    }
    
    return (
        <div style={style}>
            {message}
        </div>
    );
};

export default Notification;