import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { v4 as uuidv4 } from 'uuid';
import { ProfilesItem, ProfilesForm } from 'components';
import { Main, Spinner } from 'shared/components';
import { useIsFirstRender } from 'shared/hooks';
import { selectAllProfiles, selectIsProfilesLoading } from 'redux/profiles';
import * as S from './ProfilesStyles';

const propTypes = {
    profiles: PropTypes.array.isRequired,
    profilesIsLoading: PropTypes.bool.isRequired,
};

const defaultProps = {};

const mapStateToProps = createStructuredSelector({
    profiles: selectAllProfiles,
    profilesIsLoading: selectIsProfilesLoading,
});

const Profiles = ({ profiles, profilesIsLoading }) => {
    const isFirstRender = useIsFirstRender();

    return (
        <>
            <Helmet>
                <title>DevLink | Developers</title>
            </Helmet>
            <Main>
                <ProfilesForm isFirstRender={isFirstRender}>
                    <S.ProfileItemsContainer>
                        {isFirstRender || profilesIsLoading ? (
                            <Spinner />
                        ) : (
                            <ul>
                                {profiles.map(profile => (
                                    <ProfilesItem profile={profile} key={uuidv4()} />
                                ))}
                            </ul>
                        )}
                    </S.ProfileItemsContainer>
                </ProfilesForm>
            </Main>
        </>
    );
};

Profiles.propTypes = propTypes;
Profiles.defaultProps = defaultProps;

export default connect(mapStateToProps)(Profiles);
