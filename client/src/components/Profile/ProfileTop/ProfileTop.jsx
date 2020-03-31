import React from 'react';
import { isEmpty } from 'lodash';

const ProfileTop = ({ profileInfo, profileUser, profileSocial }) => {
    const { website, location, status, company } = profileInfo;
    const { name, avatar } = profileUser;
    const { twitter, facebook, linkedin, youtube, instagram } = profileSocial;

    return (
        <div className="profile-top bg-primary p-2">
            <img className="round-img my-1" src={avatar} alt="" />
            <h1 className="large">{name}</h1>
            <p className="lead">
                {status} {company && <span> at {company}</span>}
            </p>
            <p>{location && <span>{location}</span>}</p>
            <div className="icons my-1">
                {website && (
                    <a href={website} target="_blank" rel="noopener noreferrer">
                        website
                    </a>
                )}
                {!isEmpty(profileSocial) && twitter && (
                    <a href={twitter} target="_blank" rel="noopener noreferrer">
                        twitter
                    </a>
                )}
                {!isEmpty(profileSocial) && facebook && (
                    <a href={facebook} target="_blank" rel="noopener noreferrer">
                        facebook
                    </a>
                )}
                {!isEmpty(profileSocial) && linkedin && (
                    <a href={linkedin} target="_blank" rel="noopener noreferrer">
                        linkedin
                    </a>
                )}
                {!isEmpty(profileSocial) && youtube && (
                    <a href={youtube} target="_blank" rel="noopener noreferrer">
                        youtube
                    </a>
                )}
                {!isEmpty(profileSocial) && instagram && (
                    <a href={instagram} target="_blank" rel="noopener noreferrer">
                        instagram
                    </a>
                )}
            </div>
        </div>
    );
};

export default ProfileTop;
