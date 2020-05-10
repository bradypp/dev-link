import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useLocation, useHistory } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
// import { v4 as uuidv4 } from 'uuid';
import { Form, InputDebounced } from 'shared/components';
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

const ProfilesForm = ({ getProfiles, getSearchConstants, allSkills, allDesiredRoles }) => {
    const history = useHistory();
    const { search: queryString, pathname } = useLocation();
    const { queryStringToObject, objectToQueryString } = utils.url;
    const queryStringObj = queryStringToObject(queryString);

    const [pageValue, setPageValue] = useState(queryStringObj.pg || 1);
    const [nameValue, setNameValue] = useState(queryStringObj.nm || '');
    const [companyValue, setCompanyValue] = useState(queryStringObj.cm || '');
    const [currentPositionValue, setCurrentPositionValue] = useState(queryStringObj.cp || '');

    useEffect(() => {
        getProfiles({
            page: pageValue,
            [`name[regex]`]: nameValue,
            [`company[regex]`]: companyValue,
            [`current_position[regex]`]: currentPositionValue,
            [`availability[all]`]: queryStringObj.av,
            [`skills[all]`]: queryStringObj.sk,
            [`role_types[all]`]: queryStringObj.rt,
            [`desired_roles[all]`]: queryStringObj.dr,
            sort: queryStringObj.s || '-total_stars',
            limit: 20,
        });
        getSearchConstants();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <S.ProfilesFormContainer>
            <Form
                initialValues={{
                    availability: queryStringObj.av ? [queryStringObj.av].flat() : [],
                    skills: queryStringObj.sk ? [queryStringObj.sk].flat() : [],
                    role_types: queryStringObj.rt ? [queryStringObj.rt].flat() : [],
                    desired_roles: queryStringObj.dr ? [queryStringObj.dr].flat() : [],
                    sort: queryStringObj.s || '-total_stars',
                }}
                onSubmit={values => {
                    history.push(
                        `${pathname}?${objectToQueryString({
                            pg: pageValue,
                            nm: nameValue,
                            cm: companyValue,
                            cp: currentPositionValue,
                            av: values.availability,
                            sk: values.skills,
                            rt: values.role_types,
                            dr: values.desired_roles,
                            s: values.sort,
                        })}`,
                    );
                    getProfiles({
                        page: pageValue,
                        [`name[regex]`]: nameValue,
                        [`company[regex]`]: companyValue,
                        [`current_position[regex]`]: currentPositionValue,
                        [`availability[all]`]: values.availability,
                        [`skills[all]`]: values.skills,
                        [`role_types[all]`]: values.role_types,
                        [`desired_roles[all]`]: values.desired_roles,
                        [`sort`]: values.sort,
                        limit: 20,
                    });
                }}>
                {form => (
                    <Form.Element>
                        <Form.Flex>
                            <Form.FieldContainer label="Name">
                                <InputDebounced
                                    value={nameValue}
                                    onChange={value => {
                                        setNameValue(value);
                                        form.submitForm();
                                    }}
                                />
                            </Form.FieldContainer>
                            <Form.FieldContainer label="Company">
                                <InputDebounced
                                    value={companyValue}
                                    onChange={value => {
                                        setCompanyValue(value);
                                        form.submitForm();
                                    }}
                                />
                            </Form.FieldContainer>
                            <Form.FieldContainer label="Current position">
                                <InputDebounced
                                    value={currentPositionValue}
                                    onChange={value => {
                                        setCurrentPositionValue(value);
                                        form.submitForm();
                                    }}
                                />
                            </Form.FieldContainer>
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
                                        ? allDesiredRoles.map(role => ({
                                              label: role,
                                              value: role,
                                          }))
                                        : []
                                }
                            />
                        </Form.Flex>
                        <Form.Flex>
                            <Form.Field.Select
                                label="Sort by"
                                submitOnChange
                                name="sort"
                                options={[
                                    { label: 'Name', value: '-name' },
                                    { label: 'Total stars', value: '-total_stars' },
                                    { label: 'Total watchers', value: '-total_watchers' },
                                    { label: 'Date joined', value: '-created_at' },
                                ]}
                            />
                        </Form.Flex>
                    </Form.Element>
                )}
            </Form>
        </S.ProfilesFormContainer>
    );
};

ProfilesForm.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(ProfilesForm);
