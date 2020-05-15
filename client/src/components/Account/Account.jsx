import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { RiLockPasswordLine, RiDeleteBin6Line, RiEditBoxLine } from 'react-icons/ri';
import { AiOutlineUserDelete, AiOutlinePoweroff } from 'react-icons/ai';
import { UpdateUser, UpdatePassword } from 'components';
import { Main, Modal, Button } from 'shared/components';
import { deleteAccount, updateActiveStatus, selectIsUserActive } from 'redux/auth';
import { deleteProfile } from 'redux/profile';
import * as S from './AccountStyles';

const propTypes = {
    deleteAccount: PropTypes.func.isRequired,
    updateActiveStatus: PropTypes.func.isRequired,
    deleteProfile: PropTypes.func.isRequired,
    isUserActive: PropTypes.bool.isRequired,
};

const mapStateToProps = createStructuredSelector({
    isUserActive: selectIsUserActive,
});

const mapDispatchToProps = {
    deleteAccount,
    updateActiveStatus,
    deleteProfile,
};
const Account = ({ deleteAccount, updateActiveStatus, deleteProfile, isUserActive }) => {
    return (
        <>
            <Helmet>
                <title>DevLink | Account</title>
            </Helmet>
            <Main>
                <S.AccountContainer>
                    <h1>Your Account</h1>
                    <S.ButtonsContainer>
                        <UpdateUser
                            renderLink={({ open }) => (
                                <S.Button onClick={open}>
                                    <S.ButtonIcon>
                                        <RiEditBoxLine />
                                    </S.ButtonIcon>
                                    <S.ButtonText>
                                        <strong>Update account details</strong>
                                        <p>Edit your name, username or email</p>
                                    </S.ButtonText>
                                </S.Button>
                            )}
                        />
                        <UpdatePassword
                            renderLink={({ open }) => (
                                <S.Button onClick={open}>
                                    <S.ButtonIcon>
                                        <RiLockPasswordLine />
                                    </S.ButtonIcon>
                                    <S.ButtonText>
                                        <strong>Update password</strong>
                                        <p>Edit your password</p>
                                    </S.ButtonText>
                                </S.Button>
                            )}
                        />
                        <Modal
                            renderLink={({ open }) => (
                                <S.Button onClick={open}>
                                    <S.ButtonIcon>
                                        <AiOutlineUserDelete />
                                    </S.ButtonIcon>
                                    <S.ButtonText>
                                        <strong>Delete profile</strong>
                                        <p>Permanently delete your profile and start over?</p>
                                    </S.ButtonText>
                                </S.Button>
                            )}
                            renderContent={({ close }) => (
                                <>
                                    <h2>Are you sure?</h2>
                                    <p>Are you sure you want to permanently delete your profile?</p>
                                    <S.StyledFormButtons
                                        withSubmit={false}
                                        withCancel
                                        onCancel={close}
                                        customButtons={
                                            <Button
                                                backgroundColor="danger"
                                                color="white1"
                                                onClick={() => {
                                                    deleteProfile();
                                                    close();
                                                }}>
                                                Delete Profile
                                            </Button>
                                        }
                                    />
                                </>
                            )}
                        />
                        <Modal
                            renderLink={({ open }) => (
                                <S.Button
                                    onClick={() =>
                                        isUserActive ? open() : updateActiveStatus({ active: true })
                                    }>
                                    <S.ButtonIcon>
                                        <AiOutlinePoweroff />
                                    </S.ButtonIcon>
                                    <S.ButtonText>
                                        <strong>
                                            {isUserActive
                                                ? 'Deactivate account'
                                                : 'Activate account'}
                                        </strong>
                                        <p>
                                            {isUserActive
                                                ? 'Deactivate your account and remove your profile from the search results'
                                                : 'Activate your account and re-add your profile to the search results'}
                                        </p>
                                    </S.ButtonText>
                                </S.Button>
                            )}
                            renderContent={({ close }) => (
                                <>
                                    <h2>Are you sure?</h2>
                                    <p>
                                        Are you sure you want to deactivate your account and hide
                                        your profile?
                                    </p>
                                    <S.StyledFormButtons
                                        withSubmit={false}
                                        withCancel
                                        onCancel={close}
                                        customButtons={
                                            <Button
                                                backgroundColor="danger"
                                                color="white1"
                                                onClick={() => {
                                                    updateActiveStatus({ active: false });
                                                    close();
                                                }}>
                                                Deactivate Account
                                            </Button>
                                        }
                                    />
                                </>
                            )}
                        />
                        <Modal
                            renderLink={({ open }) => (
                                <S.Button onClick={open}>
                                    <S.ButtonIcon>
                                        <RiDeleteBin6Line />
                                    </S.ButtonIcon>
                                    <S.ButtonText>
                                        <strong>Delete account</strong>
                                        <p>Permanently delete your account</p>
                                    </S.ButtonText>
                                </S.Button>
                            )}
                            renderContent={({ close }) => (
                                <>
                                    <h2>Are you sure?</h2>
                                    <p>Are you sure you want to permanently delete your account?</p>
                                    <S.StyledFormButtons
                                        withSubmit={false}
                                        withCancel
                                        onCancel={close}
                                        customButtons={
                                            <Button
                                                backgroundColor="danger"
                                                color="white1"
                                                onClick={() => {
                                                    deleteAccount();
                                                    close();
                                                }}>
                                                Delete Account
                                            </Button>
                                        }
                                    />
                                </>
                            )}
                        />
                    </S.ButtonsContainer>
                </S.AccountContainer>
            </Main>
        </>
    );
};

Account.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(Account);
