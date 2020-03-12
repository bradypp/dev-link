import React from 'react';
// TODO: update to make look better and add button to home/feed
const NotFound = () => {
    return (
        <>
            <h1 className="x-large text-primary">
                <i className="fas fa-exclamation-triangle" /> Page Not Found
            </h1>
            <p className="large">Sorry, this page does not exist</p>
        </>
    );
};

export default NotFound;
