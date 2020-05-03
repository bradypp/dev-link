import { api, apiErrorHandler } from 'shared/utils';
import { userLoaded } from 'redux/auth';
import { isEmpty } from 'lodash';
import {
    PROFILE_LOADING,
    PROFILE_LOADED,
    PROFILE_ERROR,
    CLEAR_PROFILE,
    SET_IS_CURRENT_USER,
} from 'redux/actionTypes';

export const getProfileByUsername = username => async dispatch => {
    try {
        dispatch(profileLoading());

        const res = await api.get(`/profile/?username=${username}`);

        dispatch(profileLoaded(res.data.data.profile));
    } catch (err) {
        dispatch(apiErrorHandler(err));
        dispatch(profileError(err));
    }
};

export const getProfileById = userId => async dispatch => {
    try {
        dispatch(profileLoading());

        const res = await api.get(`/user/${userId}/profile`);

        dispatch(profileLoaded(res.data.data.profile));
    } catch (err) {
        dispatch(apiErrorHandler(err));
        dispatch(profileError(err));
    }
};

export const getCurrentUserProfile = () => async dispatch => {
    try {
        dispatch(profileLoading());

        const res = await api.get(`/profile/me`);

        dispatch(profileLoaded(res.data.data.profile));
    } catch (err) {
        dispatch(apiErrorHandler(err));
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

        const res = await api.post('/profile/me', data, config);

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

        const res = await api.patch('/profile/me', data, config);

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

export const updateProfileImage = (image, name) => async dispatch => {
    try {
        const [formData, config] = imagesFormData(name, [image]);

        const res = await api.patch('/profile/me', formData, config);

        dispatch(profileLoaded(res.data.data.profile));
    } catch (err) {
        dispatch(apiErrorHandler(err));
        dispatch(profileError(err));
    }
};

export const addPortfolioItem = data => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const res = await api.patch('/profile/portfolio', data, config);

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
            res = await api.patch(`/profile/portfolio/${data._id}`, otherData, config);
        }

        // Images upload
        if (data.imageFiles) {
            const [formData, formConfig] = imagesFormData('portfolio_images', data.imageFiles);
            res = await api.patch(`/profile/portfolio/${data._id}`, formData, formConfig);
        }

        dispatch(profileLoaded(res.data.data.profile));
    } catch (err) {
        dispatch(apiErrorHandler(err));
        dispatch(profileError(err));
    }
};

// export const updatePortfolioItem = data => async dispatch => {
//     try {
//         const config = {
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//         };

//         const res = await api.patch(`/profile/portfolio/${data._id}`, data, config);

//         dispatch(profileLoaded(res.data.data.profile));
//     } catch (err) {
//         dispatch(apiErrorHandler(err));
//         dispatch(profileError(err));
//     }
// };

// export const updatePortfolioItemImages = data => async dispatch => {
//     try {
//         const [formData, formConfig] = imagesFormData('portfolio_images', data.imageFiles);

//         const res = await api.patch(`/profile/portfolio/${data._id}`, formData, formConfig);

//         dispatch(profileLoaded(res.data.data.profile));
//     } catch (err) {
//         dispatch(apiErrorHandler(err));
//         dispatch(profileError(err));
//     }
// };

export const deletePortfolioItem = _id => async dispatch => {
    try {
        const res = await api.delete(`/profile/portfolio/${_id}`);
        dispatch(profileLoaded(res.data.data.profile));
    } catch (err) {
        dispatch(apiErrorHandler(err));
        dispatch(profileError(err));
    }
};

export const toggleStar = profileId => async dispatch => {
    try {
        const res = await api.patch(`/profile/${profileId}/star`);

        dispatch(profileLoaded(res.data.data.profile));
        dispatch(userLoaded(res.data.data.user));
    } catch (err) {
        dispatch(apiErrorHandler(err));
        dispatch(profileError(err));
    }
};

export const toggleWatch = profileId => async dispatch => {
    try {
        const res = await api.patch(`/profile/${profileId}/watch`);

        dispatch(profileLoaded(res.data.data.profile));
        dispatch(userLoaded(res.data.data.user));
    } catch (err) {
        dispatch(apiErrorHandler(err));
        dispatch(profileError(err));
    }
};

export const deleteProfile = () => async dispatch => {
    try {
        await api.delete('/profile/me');
        dispatch(clearProfile());
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

export const clearProfile = () => ({
    type: CLEAR_PROFILE,
});

export const profileError = () => ({
    type: PROFILE_ERROR,
});

export const profileLoading = () => ({
    type: PROFILE_LOADING,
});
