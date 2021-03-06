import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import Media from 'react-media';
import { SignIn, SignUp } from 'components';
import { Tooltip } from 'shared/components';
import { selectIsAuthenticated, signOut, selectUser } from 'redux/auth';
import { BsPerson, BsPeople } from 'react-icons/bs';
import { RiCodeBoxLine, RiSettings4Line, RiLogoutCircleRLine } from 'react-icons/ri';
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
    const { pathname } = useLocation();
    const [isHome, setIsHome] = useState(pathname === '/');
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setTimeout(setIsMounted(true), 300);
    }, []);

    useEffect(() => {
        setIsHome(pathname === '/');
    }, [pathname]);

    const developersLink = (
        <S.NavLink iconSize="1.8rem" icon={<BsPeople />} to="/developers">
            Developers
        </S.NavLink>
    );

    const signedInMenu = (
        <>
            {developersLink}
            <S.NavLink iconSize="1.8rem" icon={<BsPerson />} to={`/profile/${user.username}`}>
                Profile
            </S.NavLink>
            <S.NavLink iconSize="1.8rem" icon={<RiSettings4Line />} to="/account">
                Account
            </S.NavLink>
            <S.NavLink iconSize="1.8rem" icon={<RiLogoutCircleRLine />} to="#" onClick={signOut}>
                Sign Out
            </S.NavLink>
        </>
    );

    const guestMenu = (
        <>
            {pathname.startsWith('/profile') && developersLink}
            <Media
                query="(min-width: 441px)"
                render={() => (
                    <>
                        <Tooltip
                            width="40rem"
                            placement="bottomLeft"
                            offset={{ top: 8 }}
                            renderElement={props => (
                                <S.NavButton
                                    variant="bordered-inset"
                                    color={isHome ? 'white1' : 'primary'}
                                    backgroundColor={isHome ? 'white1' : 'primary'}
                                    borderColor={isHome ? 'white1' : 'primary'}
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
                                <S.NavButton
                                    backgroundColor={isHome ? 'cyan' : 'primary'}
                                    color="white1"
                                    {...props}>
                                    Join Now
                                </S.NavButton>
                            )}
                            renderContent={props => <SignUp {...props} />}
                        />
                    </>
                )}
            />
            <Media
                query="(max-width: 440px)"
                render={() => (
                    <>
                        <Tooltip
                            width="40rem"
                            placement="bottom"
                            offset={{ top: 8, left: -45 }}
                            renderElement={props => (
                                <S.NavButton
                                    isHome={isHome}
                                    variant="bordered-inset"
                                    color={isHome ? 'white1' : 'primary'}
                                    backgroundColor={isHome ? 'white1' : 'primary'}
                                    borderColor={isHome ? 'white1' : 'primary'}
                                    {...props}>
                                    Sign In
                                </S.NavButton>
                            )}
                            renderContent={props => <SignIn {...props} />}
                        />
                        <Tooltip
                            width="40rem"
                            placement="bottom"
                            offset={{ top: 8, left: -124 }}
                            renderElement={props => (
                                <S.NavButton backgroundColor="primary" color="white1" {...props}>
                                    Join Now
                                </S.NavButton>
                            )}
                            renderContent={props => <SignUp {...props} />}
                        />
                    </>
                )}
            />
        </>
    );

    return (
        <S.HeaderContainer isHome={isHome} isMounted={isMounted}>
            <S.NavContainer>
                <S.Logo
                    isHome={isHome}
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

export default connect(mapStateToProps, { signOut })(Header);
