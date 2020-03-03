import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
    return (
        <section className="home">
            <div className="dark-overlay">
                <div className="home-inner">
                    <h1 className="x-large">Dev Link</h1>
                    <p className="lead">
                        Create your developer profile, share your project ideas and link-up with
                        like-minded developers
                    </p>
                    <div className="buttons">
                        <Link to="/register" className="btn btn-primary">
                            Sign Up
                        </Link>
                        <Link to="/login" className="btn btn-light">
                            Login
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HomePage;
