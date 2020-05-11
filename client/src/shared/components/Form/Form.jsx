import React from 'react';
import PropTypes from 'prop-types';
import { Formik, FieldArray } from 'formik';
import { AiOutlineEdit } from 'react-icons/ai';
import { RiDeleteBinLine } from 'react-icons/ri';
import { FiPlus } from 'react-icons/fi';
import { AddMore, Button } from 'shared/components';
import Field from './Field';
import FieldContainer from './FieldContainer';
import FormButtons from './FormButtons';
import {
    FormikForm,
    FlexContainer,
    GridContainer,
    FieldLabel,
    FieldTip,
    HorizontalDivider,
    VerticalDivider,
    DeleteButton,
} from './FormStyles';

const propTypes = {
    validateOnBlur: PropTypes.bool,
};

const defaultProps = {
    validateOnBlur: false,
};

const Form = props => <Formik {...props} />;

Form.Element = props => <FormikForm noValidate {...props} />;
Form.DeleteButton = props => <DeleteButton icon={<RiDeleteBinLine />} {...props} />;
Form.EditButton = props => <Button icon={<AiOutlineEdit />} {...props} />;
Form.AddButton = props => <Button icon={<FiPlus />} {...props} />;
Form.Field = Field;
Form.FieldArray = FieldArray;
Form.FieldContainer = FieldContainer;
Form.Buttons = FormButtons;
Form.AddMore = AddMore;
Form.FieldLabel = FieldLabel;
Form.FieldTip = FieldTip;
Form.Flex = FlexContainer;
Form.Grid = GridContainer;
Form.HorizontalDivider = HorizontalDivider;
Form.VerticalDivider = VerticalDivider;

Form.propTypes = propTypes;
Form.defaultProps = defaultProps;

export default Form;
