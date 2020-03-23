import React from 'react';
import { v4 as uuidv4 } from 'uuid';

const ProfileAbout = ({ profileInfo, profileUser, skillsArr }) => {
    const { bio } = profileInfo;
    const { name } = profileUser;
    return (
        <div className="profile-about bg-light p-2">
            {bio && (
                <>
                    <h2 className="text-primary">{name.trim().split(' ')[0]}s Bio</h2>
                    <p>{bio}</p>
                    <div className="line" />
                </>
            )}
            <h2 className="text-primary">Skill Set</h2>
            <div className="skills">
                {skillsArr.map(skill => (
                    <div key={uuidv4()} className="p-1">
                        {skill}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProfileAbout;
