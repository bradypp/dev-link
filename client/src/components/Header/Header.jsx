import React from 'react';
import { connect } from 'react-redux';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { IoIosSearch } from 'react-icons/io';
import { SignIn, SignUp } from 'components';
import { Button, CustomLink, Tooltip, Form } from 'shared/components';
import { selectIsAuthenticated, signOut, selectUser } from 'redux/auth';
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
    const location = useLocation();

    const signedInMenu = (
        <>
            <CustomLink to="/search">Developers</CustomLink>
            <CustomLink to={`/profile/${user.username}`}>Profile</CustomLink>
            <CustomLink to="/dashboard">Dashboard</CustomLink>
            <Button onClick={signOut}>Sign Out</Button>
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
                renderElement={props => <S.ClickableDiv {...props}>Sign In</S.ClickableDiv>}
                renderContent={props => <SignIn {...props} />}
            />
            <Tooltip
                width="40rem"
                placement="bottomLeft"
                renderElement={props => <S.ClickableDiv {...props}>Join Now</S.ClickableDiv>}
                renderContent={props => <SignUp {...props} />}
            />
        </>
    );

    // TODO: Add search bar with location
    return (
        <S.HeaderContainer>
            <S.NavContainer>
                <S.Logo to="/">
                    <strong>Dev</strong>Link
                </S.Logo>
                {location.pathname !== '/' && (
                    <Form initialValues={{ search: '' }}>
                        <Form.Element>
                            <Form.Field.Input
                                icon={<IoIosSearch />}
                                name="search"
                                placeholder="Search..."
                                height={3.6}
                            />
                        </Form.Element>
                    </Form>
                )}
                <S.LinksContainer>{isAuthenticated ? signedInMenu : guestMenu}</S.LinksContainer>
            </S.NavContainer>
        </S.HeaderContainer>
    );
};

Header.propTypes = propTypes;

export default connect(mapStateToProps, { signOut })(Header);
