import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import isEmpty from 'lodash.isempty';
import { Spinner } from 'components/shared';
import {
    createProfile,
    getCurrentUserProfile,
    selectIsProfileLoading,
    selectProfile,
    selectProfileInfoAndSocial,
} from 'redux/profiles';

const EditProfile = ({
    createProfile,
    getCurrentUserProfile,
    profileData,
    isProfileLoading,
    profileInfoAndSocial,
}) => {
    const [formData, setFormData] = useState({
        company: '',
        website: '',
        location: '',
        status: '',
        skills: '',
        github_username: '',
        bio: '',
        twitter: '',
        facebook: '',
        linkedin: '',
        youtube: '',
        instagram: '',
    });
    const [displaySocialInputs, toggleSocialInputs] = useState(false);
    const history = useHistory();

    const {
        company,
        website,
        location,
        status,
        skills,
        github_username,
        bio,
        twitter,
        facebook,
        linkedin,
        youtube,
        instagram,
    } = formData;

    useEffect(() => {
        if (isEmpty(profileData)) getCurrentUserProfile();
        setFormData(profileInfoAndSocial);
    }, [getCurrentUserProfile, profileData, profileInfoAndSocial]);

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();
        createProfile(formData, history, true);
    };

    return (
        <>
            {isProfileLoading && isEmpty(profileData) ? (
                <Spinner />
            ) : (
                <>
                    <h1 className="large text-primary">Edit Your Profile</h1>
                    <p className="lead">Add some changes to your profile</p>
                    <small>* = required field</small>
                    <form className="form" onSubmit={onSubmit}>
                        <div className="form-group">
                            <select name="status" value={status} onChange={onChange}>
                                <option value="0">* Select Professional Status</option>
                                <option value="Student or Learning">Student or Learning</option>
                                <option value="Intern">Intern</option>
                                <option value="Junior Developer">Junior Developer</option>
                                <option value="Mid Developer">Developer</option>
                                <option value="Senior Developer">Senior Developer</option>
                                <option value="Manager">Manager</option>
                                <option value="Instructor">Instructor or Teacher</option>
                                <option value="Other">Other</option>
                            </select>
                            <small className="form-text">
                                Give us an idea of where you're at in your career
                            </small>
                        </div>
                        <div className="form-group">
                            <input
                                type="text"
                                placeholder="Company"
                                name="company"
                                value={company}
                                onChange={onChange}
                            />
                            <small className="form-text">
                                What company do you currently work for?
                            </small>
                        </div>
                        <div className="form-group">
                            <input
                                type="text"
                                placeholder="Website"
                                name="website"
                                value={website}
                                onChange={onChange}
                            />
                            <small className="form-text">
                                What is your personal or company website?
                            </small>
                        </div>
                        <div className="form-group">
                            <input
                                type="text"
                                placeholder="Location"
                                name="location"
                                value={location}
                                onChange={onChange}
                            />
                            <small className="form-text">
                                City & country suggested (eg. Manchester, UK)
                            </small>
                        </div>
                        <div className="form-group">
                            <input
                                type="text"
                                placeholder="* Skills"
                                name="skills"
                                value={skills}
                                onChange={onChange}
                            />
                            <small className="form-text">
                                Please separate your skills by commas (eg. HTML, CSS, JavaScript,
                                PHP)
                            </small>
                        </div>
                        <div className="form-group">
                            <input
                                type="text"
                                placeholder="Github Username"
                                name="github_username"
                                value={github_username}
                                onChange={onChange}
                            />
                            <small className="form-text">
                                To include your latest GitHub repos and a link to your GitHub
                                profile
                            </small>
                        </div>
                        <div className="form-group">
                            <textarea
                                placeholder="A short bio about yourself"
                                name="bio"
                                value={bio}
                                onChange={onChange}
                            />
                            <small className="form-text">Tell us a little about yourself</small>
                        </div>

                        <div className="my-2">
                            <button
                                onClick={() => toggleSocialInputs(!displaySocialInputs)}
                                type="button"
                                className="btn btn-light">
                                Add Social Network Links
                            </button>
                        </div>
                        {displaySocialInputs && (
                            <>
                                <div className="form-group social-input">
                                    <input
                                        type="text"
                                        placeholder="Twitter URL"
                                        name="twitter"
                                        value={twitter}
                                        onChange={onChange}
                                    />
                                </div>

                                <div className="form-group social-input">
                                    <input
                                        type="text"
                                        placeholder="Facebook URL"
                                        name="facebook"
                                        value={facebook}
                                        onChange={onChange}
                                    />
                                </div>

                                <div className="form-group social-input">
                                    <input
                                        type="text"
                                        placeholder="YouTube URL"
                                        name="youtube"
                                        value={youtube}
                                        onChange={onChange}
                                    />
                                </div>

                                <div className="form-group social-input">
                                    <input
                                        type="text"
                                        placeholder="Linkedin URL"
                                        name="linkedin"
                                        value={linkedin}
                                        onChange={onChange}
                                    />
                                </div>

                                <div className="form-group social-input">
                                    <input
                                        type="text"
                                        placeholder="Instagram URL"
                                        name="instagram"
                                        value={instagram}
                                        onChange={onChange}
                                    />
                                </div>
                            </>
                        )}

                        <button type="submit" className="btn btn-primary my-1">
                            Update
                        </button>
                        <Link className="btn btn-light my-1" to="/dashboard">
                            Go Back
                        </Link>
                    </form>
                </>
            )}
        </>
    );
};

EditProfile.propTypes = {
    createProfile: PropTypes.func.isRequired,
    getCurrentUserProfile: PropTypes.func.isRequired,
    isProfileLoading: PropTypes.bool.isRequired,
    profileData: PropTypes.object.isRequired,
    profileInfoAndSocial: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
    isProfileLoading: selectIsProfileLoading,
    profileData: selectProfile,
    profileInfoAndSocial: selectProfileInfoAndSocial,
});

export default connect(mapStateToProps, { createProfile, getCurrentUserProfile })(EditProfile);
