import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import ProfileItem from './ProfileItem/ProfileItem';

const propTypes = {};

const Profiles = () => {
    return <div>profiles</div>;
};

Profiles.propTypes = propTypes;

const mapStateToProps = createStructuredSelector({});

export default connect(mapStateToProps)(Profiles);

// TODO: delete
// import React, { useEffect } from 'react';
// import PropTypes from 'prop-types';
// import { v4 as uuidv4 } from 'uuid';
// import { connect } from 'react-redux';
// import { createStructuredSelector } from 'reselect';
// import { Spinner } from 'shared/components';
// import { getProfiles, selectIsProfilesLoading, selectAllProfiles } from 'redux/profiles';
// import ProfileItem from './ProfileItem/ProfileItem';

// const propTypes = {
//     getProfiles: PropTypes.func.isRequired,
//     isProfilesLoading: PropTypes.bool.isRequired,
//     allProfiles: PropTypes.array.isRequired,
// };

// const Profiles = ({ getProfiles, isProfilesLoading, allProfiles }) => {
//     useEffect(() => {
//         getProfiles();
//     }, [getProfiles]);

//     const renderProfiles = () =>
//         allProfiles.length > 0 ? (
//             allProfiles.map(profile => <ProfileItem key={uuidv4()} profile={profile} />)
//         ) : (
//             <h4>No profiles found...</h4>
//         );

//     return (
//         <>
//             {isProfilesLoading ? (
//                 <Spinner />
//             ) : (
//                 <>
//                     <h1 className="large text-primary">Developers</h1>
//                     <p className="lead">Browse and connect with developers</p>
//                     <div className="profiles">{renderProfiles()}</div>
//                 </>
//             )}
//         </>
//     );
// };

// Profiles.propTypes = propTypes;

// const mapStateToProps = createStructuredSelector({
//     isProfilesLoading: selectIsProfilesLoading,
//     allProfiles: selectAllProfiles,
// });

// export default connect(mapStateToProps, { getProfiles })(Profiles);
