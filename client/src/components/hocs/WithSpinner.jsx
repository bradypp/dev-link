/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Spinner } from 'components';

const WithSpinner = WrappedComponent => ({ isLoading, ...otherProps }) => {
    return isLoading ? <Spinner /> : <WrappedComponent {...otherProps} />;
};

export default WithSpinner;
