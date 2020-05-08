import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useLocation, useHistory } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
// import { v4 as uuidv4 } from 'uuid';
import { Form } from 'shared/components';
import {
    getProfiles,
    getSearchConstants,
    selectAllSkills,
    selectAllDesiredRoles,
} from 'redux/profiles';
import * as utils from 'shared/utils';
import { formConstants } from 'shared/constants';
import * as S from './ProfilesFormStyles';

const propTypes = {
    getProfiles: PropTypes.func.isRequired,
    getSearchConstants: PropTypes.func.isRequired,
    allSkills: PropTypes.array.isRequired,
    allDesiredRoles: PropTypes.array.isRequired,
};

const mapStateToProps = createStructuredSelector({
    allSkills: selectAllSkills,
    allDesiredRoles: selectAllDesiredRoles,
});

const mapDispatchToProps = {
    getProfiles,
    getSearchConstants,
};
// when form submits, push to new url with query string
// initial state should take from query string object if there
const ProfilesForm = ({ getProfiles, getSearchConstants, allSkills, allDesiredRoles }) => {
    const { queryStringToObject, objectToQueryString } = utils.url;
    const history = useHistory();
    const { search: queryString, pathname } = useLocation();
    const queryStringObj = queryStringToObject(queryString);

    useEffect(() => {
        getProfiles({
            [`availability[all]`]: queryStringObj.av,
            [`skills[all]`]: queryStringObj.sk,
            [`role_types[all]`]: queryStringObj.rt,
            [`desired_roles[all]`]: queryStringObj.dr,
        });
        getSearchConstants();
    }, []);

    return (
        <S.ProfilesFormContainer>
            <Form
                initialValues={{
                    availability: queryStringObj.av ? [queryStringObj.av].flat() : [],
                    skills: queryStringObj.sk ? [queryStringObj.sk].flat() : [],
                    role_types: queryStringObj.rt ? [queryStringObj.rt].flat() : [],
                    desired_roles: queryStringObj.rt ? [queryStringObj.rt].flat() : [],
                }}
                onSubmit={values => {
                    const newQueryObj = {
                        av: values.availability,
                        sk: values.skills,
                        rt: values.role_types,
                        dr: values.desired_roles,
                    };

                    history.push(`${pathname}?${objectToQueryString(newQueryObj)}`);
                    getProfiles({
                        [`availability[all]`]: newQueryObj.av,
                        [`skills[all]`]: newQueryObj.sk,
                        [`role_types[all]`]: newQueryObj.rt,
                        [`desired_roles[all]`]: newQueryObj.dr,
                    });
                }}>
                <Form.Element>
                    <Form.Flex>
                        {/* Input search (options for name, headline, job titles use regex to filter strings that include search term) */}
                        <Form.Field.Input label="Name" name="name" />
                        <Form.Field.Input label="Company" name="name" />
                    </Form.Flex>
                    <Form.Flex>
                        <Form.Field.Select
                            label="Availability"
                            isMulti
                            valuePlaceholder="Add availability"
                            name="availability"
                            variant="empty"
                            submitOnChange
                            options={formConstants.availability.map(type => ({
                                label: type,
                                value: type,
                            }))}
                        />
                        <Form.Field.Select
                            label="Skills"
                            valuePlaceholder="Add skill"
                            submitOnChange
                            name="skills"
                            variant="empty"
                            isMulti
                            options={
                                allSkills.length > 0
                                    ? allSkills.map(skill => ({ label: skill, value: skill }))
                                    : []
                            }
                        />
                        <Form.Field.Select
                            label="Role types"
                            isMulti
                            valuePlaceholder="Add role type"
                            name="role_types"
                            variant="empty"
                            submitOnChange
                            options={formConstants.roleTypes.map(type => ({
                                label: type,
                                value: type,
                            }))}
                        />
                        <Form.Field.Select
                            label="Desired roles"
                            valuePlaceholder="Add desired role"
                            submitOnChange
                            name="desired_roles"
                            variant="empty"
                            isMulti
                            options={
                                allDesiredRoles.length > 0
                                    ? allDesiredRoles.map(role => ({ label: role, value: role }))
                                    : []
                            }
                        />
                        {/* Country */}
                        {/* City */}
                    </Form.Flex>
                    <Form.Flex>
                        {/* Sort by stars */}
                        {/* Sort by watching */}
                    </Form.Flex>
                </Form.Element>
            </Form>
        </S.ProfilesFormContainer>
    );
};

ProfilesForm.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(ProfilesForm);
