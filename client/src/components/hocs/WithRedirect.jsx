/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Redirect } from 'react-router-dom';

// Redirect prop should be in the following format:
// redirect = [{ condition: bool, path: string, conditions: [bool], allConditions: bool }];

const WithRedirect = WrappedComponent => ({ redirect, ...otherProps }) => {
    let componentToRender = <WrappedComponent {...otherProps} />;
    if (!redirect) return componentToRender;

    redirect.forEach(({ condition, conditionsArr, path, allConditions }) => {
        const shouldRedirect = conditionsArr
            ? allConditions
                ? conditionsArr.reduce((acc, condition) => {
                      if (!acc) return acc;
                      return condition;
                  }, true)
                : conditionsArr.reduce((acc, condition) => {
                      if (acc) return acc;
                      return condition;
                  }, false)
            : condition;

        if (shouldRedirect) componentToRender = <Redirect to={path} />;
    });

    return componentToRender;
};

export default WithRedirect;
