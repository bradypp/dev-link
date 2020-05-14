import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { SignIn, SignUp } from 'components';
import { Tooltip } from 'shared/components';
import { selectIsAuthenticated, signOutUser, selectUser } from 'redux/auth';
import { BsPerson, BsPeople } from 'react-icons/bs';
import { RiCodeBoxLine, RiSettings4Line, RiLogoutCircleRLine } from 'react-icons/ri';
import * as S from './HeaderStyles';

const propTypes = {
    signOutUser: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    user: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
    user: selectUser,
    isAuthenticated: selectIsAuthenticated,
});

const Header = ({ isAuthenticated, signOutUser, user }) => {
    const { pathname } = useLocation();

    const developersLink = (
        <S.NavLink icon={<BsPeople />} to="/developers">
            Developers
        </S.NavLink>
    );

    const signedInMenu = (
        <>
            {developersLink}
            <S.NavLink icon={<BsPerson />} to={`/profile/${user.username}`}>
                Profile
            </S.NavLink>
            <S.NavLink icon={<RiSettings4Line />} to="/account">
                Account
            </S.NavLink>
            <S.NavLink icon={<RiLogoutCircleRLine />} to="#" onClick={signOutUser}>
                Sign Out
            </S.NavLink>
        </>
    );

    const guestMenu = (
        <>
            {pathname.startsWith('/profile') && developersLink}
            <Tooltip
                width="40rem"
                placement="bottomLeft"
                offset={{ top: 8 }}
                renderElement={props => (
                    <S.NavButton
                        variant="bordered-inset"
                        color="primary"
                        backgroundColor="primary"
                        borderColor="primary"
                        {...props}>
                        Sign In
                    </S.NavButton>
                )}
                renderContent={props => <SignIn {...props} />}
            />
            <Tooltip
                width="40rem"
                placement="bottomLeft"
                offset={{ top: 8 }}
                renderElement={props => (
                    <S.NavButton backgroundColor="primary" color="white1" {...props}>
                        Join Now
                    </S.NavButton>
                )}
                renderContent={props => <SignUp {...props} />}
            />
        </>
    );

    // TODO: Add search bar with location
    return (
        <S.HeaderContainer>
            <S.NavContainer>
                <S.Logo
                    variant="no-styles"
                    to={isAuthenticated ? '/developers' : '/'}
                    icon={<RiCodeBoxLine />}>
                    <strong>Dev</strong>Link
                </S.Logo>
                <S.LinksContainer>{isAuthenticated ? signedInMenu : guestMenu}</S.LinksContainer>
            </S.NavContainer>
        </S.HeaderContainer>
    );
};

Header.propTypes = propTypes;

export default connect(mapStateToProps, { signOutUser })(Header);
