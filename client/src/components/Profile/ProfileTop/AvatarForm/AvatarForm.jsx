import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Image from 'react-image';
import { Form, ImageUpload, Modal } from 'shared/components';
import { EditModal } from 'components';
import { updateAvatar, selectProfileAvatar } from 'redux/profile';
import * as S from './AvatarFormStyles';

const propTypes = {
    currentAvatar: PropTypes.object.isRequired,
    updateAvatar: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
    currentAvatar: selectProfileAvatar,
});

const mapDispatchToProps = {
    updateAvatar,
};

// TODO: split name into first name and last name?
const AvatarForm = ({ updateAvatar, currentAvatar }) => {
    const [avatar, setAvatar] = useState([]);
    const [renderModal, setRenderModal] = useState(false);

    useEffect(() => {
        if (avatar.length > 0) setRenderModal(true);
    }, [avatar]);

    return avatar.length > 0 ? (
        <S.AvatarModal
            withCloseButton={false}
            shouldRender={renderModal}
            renderContent={({ close }) => (
                <form
                    onSubmit={event => {
                        event.preventDefault();
                        updateAvatar(avatar[0]);
                        setRenderModal(false);
                        setAvatar([]);
                    }}>
                    <Image src={avatar[0].preview} />
                    <S.ButtonsContainer
                        withCancel
                        onCancel={() => {
                            close();
                            setAvatar([]);
                        }}
                    />
                </form>
            )}
        />
    ) : (
        <S.AvatarUpload files={avatar} setFiles={setAvatar} variant="edit" maxFiles={1} />
    );
};

AvatarForm.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(AvatarForm);

// FIXME
// import React, { useState } from 'react';
// import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
// import { createStructuredSelector } from 'reselect';
// // import Image from 'react-image';
// import { Form, ImageUpload } from 'shared/components';
// import { EditModal } from 'components';
// import { updateAvatar, selectProfileAvatar } from 'redux/profile';

// const propTypes = {
//     currentAvatar: PropTypes.string.isRequired,
//     updateAvatar: PropTypes.func.isRequired,
// };

// const mapStateToProps = createStructuredSelector({
//     currentAvatar: selectProfileAvatar,
// });

// const mapDispatchToProps = {
//     updateAvatar,
// };

// // TODO: split name into first name and last name?
// const AvatarForm = ({ updateAvatar, currentAvatar }) => {
//     const [avatar, setAvatar] = useState([]);
//     return (
//         <EditModal
//             renderContent={({ close }) => (
//                 <>
//                     <h2>Edit Avatar</h2>
//                     <form
//                         onSubmit={avatar => {
//                             console.log(avatar);
//                             // TODO
//                             // updateAvatar(values);
//                             // close();
//                         }}>
//                         <ImageUpload images={avatar} setImages={setAvatar} />
//                         <Form.Buttons withCancel onCancel={close} />
//                     </form>
//                 </>
//             )}
//         />
//     );
// };

// AvatarForm.propTypes = propTypes;

// export default connect(mapStateToProps, mapDispatchToProps)(AvatarForm);
