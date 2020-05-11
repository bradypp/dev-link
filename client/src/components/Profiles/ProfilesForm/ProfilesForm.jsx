import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useLocation, useHistory } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
// import { v4 as uuidv4 } from 'uuid';
import { Form, InputDebounced, Button } from 'shared/components';
import {
    getProfiles,
    getSearchConstants,
    selectAllSkills,
    selectAllDesiredRoles,
    getMoreProfiles,
    selectIsMoreProfilesLoading,
    selectIsNoMoreProfiles,
    selectNumberOfProfiles,
    selectIsProfilesLoading,
} from 'redux/profiles';
import * as utils from 'shared/utils';
import { formConstants } from 'shared/constants';
import * as S from './ProfilesFormStyles';

const propTypes = {
    children: PropTypes.node.isRequired,
    getProfiles: PropTypes.func.isRequired,
    getMoreProfiles: PropTypes.func.isRequired,
    getSearchConstants: PropTypes.func.isRequired,
    allSkills: PropTypes.array.isRequired,
    allDesiredRoles: PropTypes.array.isRequired,
    isMoreProfilesLoading: PropTypes.bool.isRequired,
    isNoMoreProfiles: PropTypes.bool.isRequired,
    numberOfProfiles: PropTypes.number.isRequired,
    isProfilesLoading: PropTypes.bool.isRequired,
    isFirstRender: PropTypes.bool.isRequired,
};

const mapStateToProps = createStructuredSelector({
    allSkills: selectAllSkills,
    allDesiredRoles: selectAllDesiredRoles,
    isMoreProfilesLoading: selectIsMoreProfilesLoading,
    isNoMoreProfiles: selectIsNoMoreProfiles,
    numberOfProfiles: selectNumberOfProfiles,
    isProfilesLoading: selectIsProfilesLoading,
});

const mapDispatchToProps = {
    getProfiles,
    getMoreProfiles,
    getSearchConstants,
};

const ProfilesForm = ({
    getProfiles,
    getSearchConstants,
    allSkills,
    allDesiredRoles,
    isMoreProfilesLoading,
    getMoreProfiles,
    children,
    isNoMoreProfiles,
    numberOfProfiles,
    isProfilesLoading,
    isFirstRender,
}) => {
    const history = useHistory();
    const { search: queryString, pathname } = useLocation();
    const { queryStringToObject, objectToQueryString } = utils.url;
    const queryStringObj = queryStringToObject(queryString);

    const [pageValue, setPageValue] = useState(queryStringObj.pg || 1);
    const [nameValue, setNameValue] = useState(queryStringObj.nm || '');
    const [companyValue, setCompanyValue] = useState(queryStringObj.cm || '');
    const [currentPositionValue, setCurrentPositionValue] = useState(queryStringObj.cp || '');

    const getInitialProfiles = () =>
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

    useEffect(() => {
        getInitialProfiles();
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
                    const queryObj = {
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
                    };
                    if (pageValue === 1) {
                        getProfiles(queryObj);
                    } else {
                        getMoreProfiles(queryObj);
                    }
                }}
                onReset={() => {
                    setPageValue(1);
                    history.push(pathname);
                    getInitialProfiles();
                }}>
                {form => (
                    <Form.Element>
                        <Form.Flex>
                            <Form.FieldContainer label="Name">
                                <InputDebounced
                                    value={nameValue}
                                    onChange={value => {
                                        setPageValue(1);
                                        setNameValue(value);
                                        form.submitForm();
                                    }}
                                />
                            </Form.FieldContainer>
                            <Form.FieldContainer label="Company">
                                <InputDebounced
                                    value={companyValue}
                                    onChange={value => {
                                        setPageValue(1);
                                        setCompanyValue(value);
                                        form.submitForm();
                                    }}
                                />
                            </Form.FieldContainer>
                            <Form.FieldContainer label="Current position">
                                <InputDebounced
                                    value={currentPositionValue}
                                    onChange={value => {
                                        setPageValue(1);
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
                                customOnChange={() => setPageValue(1)}
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
                                customOnChange={() => setPageValue(1)}
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
                                customOnChange={() => setPageValue(1)}
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
                                customOnChange={() => setPageValue(1)}
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
                        <S.SortByLabel>Sort By</S.SortByLabel>
                        <Form.Flex>
                            <S.SortBy
                                removeSelected={false}
                                submitOnChange
                                name="sort"
                                withInput={false}
                                customOnChange={() => setPageValue(1)}
                                options={[
                                    { label: 'Name', value: '-name' },
                                    { label: 'Total stars', value: '-total_stars' },
                                    { label: 'Total watchers', value: '-total_watchers' },
                                    { label: 'Date joined', value: '-created_at' },
                                ]}
                            />
                            <S.SortByDivider />
                            <Button type="reset" onClick={() => form.handleReset()}>
                                Clear
                            </Button>
                        </Form.Flex>
                        {children}
                        {!isFirstRender && !isProfilesLoading && (
                            <Form.Buttons
                                align="center"
                                withSubmit={false}
                                customButtons={
                                    <Button
                                        disabled={isNoMoreProfiles || numberOfProfiles === 0}
                                        isWorking={isMoreProfilesLoading}
                                        onClick={() => {
                                            setPageValue(pageValue + 1);
                                            form.submitForm();
                                        }}>
                                        {numberOfProfiles === 0
                                            ? ' No profiles found'
                                            : isNoMoreProfiles
                                            ? 'No more profiles found'
                                            : 'Load More'}
                                    </Button>
                                }
                            />
                        )}
                    </Form.Element>
                )}
            </Form>
        </S.ProfilesFormContainer>
    );
};

ProfilesForm.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(ProfilesForm);
