import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { SignIn, SignUp } from 'components';
import { CustomLink, Tooltip, Button } from 'shared/components';
import { selectIsAuthenticated, signOut, selectUser } from 'redux/auth';
import { BsPerson, BsPeople } from 'react-icons/bs';
import {
    RiCodeBoxLine,
    RiLogoutCircleRLine,
    RiLoginCircleLine,
    RiOpenArmLine,
    RiSettings4Line,
} from 'react-icons/ri';
import * as S from './HeaderStyles';

const propTypes = {
    signOut: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    user: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
    user: selectUser,
    isAuthenticated: selectIsAuthenticated,
});

const Header = ({ isAuthenticated, signOut, user }) => {
    const signedInMenu = (
        <>
            <CustomLink
                iconSize="1.8rem"
                icon={<BsPeople />}
                variant="text-color"
                color="textPrimary1"
                to="/developers">
                Developers
            </CustomLink>
            <CustomLink
                iconSize="1.8rem"
                icon={<BsPerson />}
                variant="text-color"
                color="textPrimary1"
                to={`/profile/${user.username}`}>
                Profile
            </CustomLink>
            <CustomLink
                iconSize="1.8rem"
                icon={<RiSettings4Line />}
                variant="text-color"
                color="textPrimary1"
                to="/account">
                Account
            </CustomLink>
            <Button
                iconSize="1.8rem"
                icon={<RiLogoutCircleRLine />}
                variant="text-color"
                color="textPrimary1"
                to="/"
                onClick={signOut}>
                Sign Out
            </Button>
        </>
    );

    const guestMenu = (
        <>
            <Tooltip
                width="40rem"
                placement="bottomLeft"
                renderElement={props => (
                    <Button
                        iconSize="1.8rem"
                        icon={<RiOpenArmLine />}
                        variant="text-color"
                        color="textPrimary1"
                        {...props}>
                        Join Now
                    </Button>
                )}
                renderContent={props => <SignUp {...props} />}
            />
            <Tooltip
                width="40rem"
                placement="bottomLeft"
                renderElement={props => (
                    <Button
                        iconSize="1.8rem"
                        icon={<RiLoginCircleLine />}
                        variant="text-color"
                        color="textPrimary1"
                        {...props}>
                        Sign In
                    </Button>
                )}
                renderContent={props => <SignIn {...props} />}
            />
        </>
    );

    // TODO: Add search bar with location
    return (
        <S.HeaderContainer>
            <S.NavContainer>
                <S.Logo variant="no-styles" to="/" icon={<RiCodeBoxLine />}>
                    <strong>Dev</strong>Link
                </S.Logo>
                <S.LinksContainer>{isAuthenticated ? signedInMenu : guestMenu}</S.LinksContainer>
            </S.NavContainer>
        </S.HeaderContainer>
    );
};

Header.propTypes = propTypes;

export default connect(mapStateToProps, { signOut })(Header);
