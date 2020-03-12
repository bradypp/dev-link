import React from 'react';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';

const ProfileItem = ({ profileData }) => {
    console.log(profileData);
    const { user, status, company, location, skills } = profileData;
    const { _id, name, avatar } = user;

    return (
        <div className="profile bg-light">
            <img src={avatar} alt="" className="round-img" />
            <div>
                <h2>{name}</h2>
                <p>
                    {status} {company && <span> at {company}</span>}
                </p>
                <p className="my-1">{location && <span>{location}</span>}</p>
                <Link to={`/profile/${_id}`} className="btn btn-primary">
                    View Profile
                </Link>
            </div>
            <ul>
                {skills.slice(0, 4).map(skill => (
                    <li key={uuidv4()} className="text-primary">
                        <i className="fas fa-check" /> {skill}
                    </li>
                ))}
            </ul>
        </div>
    );
};

ProfileItem.propTypes = {
    profileData: PropTypes.object.isRequired,
};

export default ProfileItem;
