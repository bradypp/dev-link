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
    RiDashboardLine,
    RiLogoutCircleRLine,
    RiLoginCircleLine,
    RiOpenArmLine,
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

// TODO: edit content of header in different states when finished (for now include what you need to build the app & test)
// TODO: nav styling
const Header = ({ isAuthenticated, signOut, user }) => {
    const signedInMenu = (
        <>
            <CustomLink
                iconSize="1.8rem"
                icon={<BsPeople />}
                variant="text-lighten"
                color="white3"
                to="/developers">
                Developers
            </CustomLink>
            <CustomLink
                iconSize="1.8rem"
                icon={<BsPerson />}
                variant="text-lighten"
                color="white3"
                to={`/profile/${user.username}`}>
                Profile
            </CustomLink>
            <CustomLink
                iconSize="1.8rem"
                icon={<RiDashboardLine />}
                variant="text-lighten"
                color="white3"
                to="/dashboard">
                Dashboard
            </CustomLink>
            <Button
                iconSize="1.8rem"
                icon={<RiLogoutCircleRLine />}
                variant="text-lighten"
                color="white3"
                to="/"
                onClick={signOut}>
                Sign Out
            </Button>
        </>
    );

    // TODO: redo tooltip dropdown menus (make new component?), they should stay in place below the header
    // TODO: change tooltip offsets depending on screen size? (use react media queries/useBreakpoint hook) or render different components on mobile (go to signin/signup pages on mobile)
    // TODO: switch back to auth pages? Can make the styling better (like linked in sign in page)
    const guestMenu = (
        <>
            <Tooltip
                width="40rem"
                placement="bottomLeft"
                renderElement={props => (
                    <Button
                        iconSize="1.8rem"
                        icon={<RiLoginCircleLine />}
                        variant="text-lighten"
                        color="white3"
                        {...props}>
                        Sign In
                    </Button>
                )}
                renderContent={props => <SignIn {...props} />}
            />
            <Tooltip
                width="40rem"
                placement="bottomLeft"
                renderElement={props => (
                    <Button
                        iconSize="1.8rem"
                        icon={<RiOpenArmLine />}
                        variant="text-lighten"
                        color="white3"
                        {...props}>
                        Join Now
                    </Button>
                )}
                renderContent={props => <SignUp {...props} />}
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
