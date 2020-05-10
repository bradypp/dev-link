import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
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
        <Main>
            <ProfilesForm isFirstRender={isFirstRender}>
                <S.ProfileItemsContainer>
                    {isFirstRender || profilesIsLoading ? (
                        <Spinner />
                    ) : (
                        <>
                            {profiles.map(profile => (
                                <ProfilesItem profile={profile} />
                            ))}
                        </>
                    )}
                </S.ProfileItemsContainer>
            </ProfilesForm>
        </Main>
    );
};

Profiles.propTypes = propTypes;
Profiles.defaultProps = defaultProps;

export default connect(mapStateToProps)(Profiles);
