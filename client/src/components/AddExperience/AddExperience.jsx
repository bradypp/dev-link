import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addExperience } from 'redux/profiles';

const AddExperience = ({ addExperience }) => {
    const [formData, setFormData] = useState({
        company: '',
        title: '',
        location: '',
        from: '',
        to: '',
        current: false,
        description: '',
    });

    const [toDateDisabled, toggleDisabled] = useState(false);
    const history = useHistory();

    const { company, title, location, from, to, current, description } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();
        addExperience(formData, history);
    };

    return (
        <>
            <h1 className="large text-primary">Add An Experience</h1>
            <p className="lead">
                Add any developer/programming positions that you have had in the past
            </p>
            <small>* = required field</small>
            <form className="form" onSubmit={onSubmit} noValidate>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="* Job Title"
                        name="title"
                        value={title}
                        onChange={onChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="* Company"
                        name="company"
                        value={company}
                        onChange={onChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="Location"
                        name="location"
                        value={location}
                        onChange={onChange}
                    />
                </div>
                <div className="form-group">
                    <h4>From Date</h4>
                    <input type="date" name="from" value={from} onChange={onChange} />
                </div>
                <div className="form-group">
                    <p>
                        <input
                            type="checkbox"
                            name="current"
                            checked={current}
                            value={current}
                            onChange={() => {
                                setFormData({ ...formData, current: !current });
                                toggleDisabled(!toDateDisabled);
                            }}
                        />{' '}
                        Current Job
                    </p>
                </div>
                <div className="form-group">
                    <h4>To Date</h4>
                    <input
                        type="date"
                        name="to"
                        value={to}
                        onChange={onChange}
                        disabled={toDateDisabled ? 'disabled' : ''}
                    />
                </div>
                <div className="form-group">
                    <textarea
                        name="description"
                        cols="30"
                        rows="5"
                        placeholder="Job Description"
                        value={description}
                        onChange={onChange}
                    />
                </div>
                <button type="submit" className="btn btn-primary my-1">
                    Submit
                </button>
                <Link className="btn btn-light my-1" to="/dashboard">
                    Go Back
                </Link>
            </form>
        </>
    );
};

AddExperience.propTypes = {
    addExperience: PropTypes.func.isRequired,
};

export default connect(null, { addExperience })(AddExperience);
