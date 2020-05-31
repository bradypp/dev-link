import { api, apiErrorHandler } from 'shared/utils';
import { setAlert } from 'redux/alerts';
import { userLoaded } from 'redux/auth';
import { isEmpty } from 'lodash';
import {
    PROFILE_LOADING,
    PROFILE_LOADED,
    PROFILE_ERROR,
    RESET_PROFILE,
    SET_IS_CURRENT_USER,
} from 'redux/actionTypes';
import { toastTypes } from 'shared/constants';

export const getProfileByUsername = username => async dispatch => {
    try {
        dispatch(profileLoading());

        const res = await api.get(`/api/v1/profile/?username=${username}`);

        dispatch(profileLoaded(res.data.data.profile));
    } catch (err) {
        dispatch(profileError(err));
    }
};

export const getProfileById = userId => async dispatch => {
    try {
        dispatch(profileLoading());

        const res = await api.get(`/api/v1/user/${userId}/profile`);

        dispatch(profileLoaded(res.data.data.profile));
    } catch (err) {
        dispatch(profileError(err));
    }
};

export const getCurrentUserProfile = () => async dispatch => {
    try {
        dispatch(profileLoading());

        const res = await api.get(`/api/v1/profile/me`);

        dispatch(profileLoaded(res.data.data.profile));
    } catch (err) {
        dispatch(profileError(err));
    }
};

export const createProfile = (data = {}) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const res = await api.post('/api/v1/profile/me', data, config);

        dispatch(profileLoaded(res.data.data.profile));
    } catch (err) {
        dispatch(apiErrorHandler(err));
        dispatch(profileError(err));
    }
};

export const updateProfile = data => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const res = await api.patch('/api/v1/profile/me', data, config);

        dispatch(profileLoaded(res.data.data.profile));
    } catch (err) {
        dispatch(apiErrorHandler(err));
        dispatch(profileError(err));
    }
};

const imagesFormData = (name, images) => {
    const formData = new FormData();

    images.forEach(image => formData.append(name, image));
    const config = {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    };
    return [formData, config];
};

//     await sharp(req.files.avatar[0].buffer)
//     .resize(400, 400)
//     .toFormat('jpeg')
//     .jpeg({ quality: 90 });

// avatar.small = `${filename}-small.jpeg`;
// await sharp(req.files.avatar[0].buffer)
//     .resize(200, 200)
//     .toFormat('jpeg')
//     .jpeg({ quality: 90 });

// avatar.thumbnail = `${filename}-thumbnail.jpeg`;
// await sharp(req.files.avatar[0].buffer)
//     .resize(60, 60)
//     .toFormat('jpeg')
//     .jpeg({ quality: 90 });

// const cover_image = {};
// const filename = `profile-cover_image-${req.user.id}-${Date.now()}`;

// cover_image.large = `${filename}-large.jpeg`;
// await sharp(req.files.cover_image[0].buffer)
//     .resize(1010, 253)
//     .toFormat('jpeg')
//     .jpeg({ quality: 90 });

// cover_image.medium = `${filename}-medium.jpeg`;
// await sharp(req.files.cover_image[0].buffer)
//     .resize(713, 178)
//     .toFormat('jpeg')
//     .jpeg({ quality: 90 });

// cover_image.small = `${filename}-small.jpeg`;
// await sharp(req.files.cover_image[0].buffer)
//     .resize(451, 113)
//     .toFormat('jpeg')
//     .jpeg({ quality: 90 });
// Create an array of promises to name/resize the images then fulfill them all at once using Promise.all
// await Promise.all(
//     req.files.portfolio_images.map(async (file, i) => {
//         const image = {};
//         const filename = `profile-portfolio-${i + 1}-${req.user.id}-${Date.now()}`;

//         image.large = `${filename}-large.jpeg`;
//         await sharp(file.buffer)
//             .resize(1152, 777)
//             .toFormat('jpeg')
//             .jpeg({ quality: 90 });

//         image.medium = `${filename}-medium.jpeg`;
//         await sharp(file.buffer)
//             .resize(768, 518)
//             .toFormat('jpeg')
//             .jpeg({ quality: 90 });

//         image.small = `${filename}-small.jpeg`;
//         await sharp(file.buffer)
//             .resize(480, 324)
//             .toFormat('jpeg')
//             .jpeg({ quality: 90 });

//         image.thumbnail = `${filename}-thumbnail.jpeg`;
//         await sharp(file.buffer)
//             .resize(200, 200)
//             .toFormat('jpeg')
//             .jpeg({ quality: 90 });

//         portfolio_images.push(image);
//     }),
// );

export const updateProfileImage = (image, name) => async dispatch => {
    try {
        const [formData, config] = imagesFormData(name, [image]);

        const res = await api.patch('/api/v1/profile/me', formData, config);

        dispatch(profileLoaded(res.data.data.profile));
    } catch (err) {
        dispatch(apiErrorHandler(err));
        dispatch(profileError(err));
    }
};

export const addPortfolioItem = data => async dispatch => {
    try {
        let res;

        // Create item first without image files
        const otherData = { ...data };
        delete otherData.imageFiles;

        if (!isEmpty(otherData)) {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            };
            res = await api.post(`/api/v1/profile/portfolio`, otherData, config);
        }

        const itemId = res.data.data.item_id;

        // Images upload
        if (data.imageFiles) {
            const [formData, formConfig] = imagesFormData('portfolio_images', data.imageFiles);
            res = await api.patch(`/api/v1/profile/portfolio/${itemId}`, formData, formConfig);
        }

        dispatch(profileLoaded(res.data.data.profile));
    } catch (err) {
        dispatch(apiErrorHandler(err));
        dispatch(profileError(err));
    }
};

export const updatePortfolioItem = data => async dispatch => {
    try {
        let res;

        // Other data upload
        const otherData = { ...data };
        delete otherData.imageFiles;

        if (!isEmpty(otherData)) {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            };
            res = await api.patch(`/api/v1/profile/portfolio/${data._id}`, otherData, config);
        }
        // Images upload
        if (data.imageFiles) {
            const [formData, formConfig] = imagesFormData('portfolio_images', data.imageFiles);
            res = await api.patch(`/api/v1/profile/portfolio/${data._id}`, formData, formConfig);
        }

        dispatch(profileLoaded(res.data.data.profile));
    } catch (err) {
        dispatch(apiErrorHandler(err));
        dispatch(profileError(err));
    }
};

export const deletePortfolioItem = _id => async dispatch => {
    try {
        const res = await api.delete(`/api/v1/profile/portfolio/${_id}`);
        dispatch(profileLoaded(res.data.data.profile));
    } catch (err) {
        dispatch(apiErrorHandler(err));
        dispatch(profileError(err));
    }
};

export const toggleStar = profileId => async dispatch => {
    try {
        const res = await api.patch(`/api/v1/profile/${profileId}/star`);

        dispatch(profileLoaded(res.data.data.profile));
        dispatch(userLoaded(res.data.data.user));
    } catch (err) {
        dispatch(apiErrorHandler(err));
        dispatch(profileError(err));
    }
};

export const toggleWatch = profileId => async dispatch => {
    try {
        const res = await api.patch(`/api/v1/profile/${profileId}/watch`);

        dispatch(profileLoaded(res.data.data.profile));
        dispatch(userLoaded(res.data.data.user));
    } catch (err) {
        dispatch(apiErrorHandler(err));
        dispatch(profileError(err));
    }
};

export const deleteProfile = () => async dispatch => {
    try {
        await api.delete('/api/v1/profile/me');
        dispatch(resetProfile());
        dispatch(setAlert('Your profile has successfully been deleted', toastTypes.SUCCESS));
    } catch (err) {
        dispatch(apiErrorHandler(err));
        dispatch(profileError(err));
    }
};

export const profileLoaded = payload => ({
    type: PROFILE_LOADED,
    payload,
});

export const setIsCurrentUser = payload => ({
    type: SET_IS_CURRENT_USER,
    payload,
});

export const resetProfile = () => ({
    type: RESET_PROFILE,
});

export const profileError = () => ({
    type: PROFILE_ERROR,
});

export const profileLoading = () => ({
    type: PROFILE_LOADING,
});
