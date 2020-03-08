/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Redirect } from 'react-router-dom';

// redirect = [{ condition: bool, path: string, conditions: [bool], allConditions: bool }];
const WithRedirect = WrappedComponent => ({ redirect, ...otherProps }) => {
    let componentToReturn = <WrappedComponent {...otherProps} />;
    if (!redirect) return componentToReturn;

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

        if (shouldRedirect) componentToReturn = <Redirect to={path} />;
    });

    return componentToReturn;
};

export default WithRedirect;
