import React from 'react';
import { Link } from 'react-router-dom';

const DashboardActions = () => {
    return (
        <div className="dash-buttons">
            <Link to="/edit" className="btn btn-light">
                Edit Profile
            </Link>
            <Link to="/add-experience" className="btn btn-light">
                Add Experience
            </Link>
            <Link to="/add-education" className="btn btn-light">
                Add Education
            </Link>
        </div>
    );
};

export default DashboardActions;
