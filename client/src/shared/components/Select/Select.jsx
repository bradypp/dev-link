import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { IoIosAdd } from 'react-icons/io';
import { useOnOutsideClick } from 'shared/hooks';
import { keyCodes } from 'shared/constants';
import { uniqueId } from 'lodash';
import { AddMore } from 'shared/components';
import Dropdown from './Dropdown';
import * as S from './SelectStyles';

const propTypes = {
    className: PropTypes.string,
    variant: PropTypes.oneOf(['normal', 'empty']),
    dropdownWidth: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.array, PropTypes.string, PropTypes.number]),
    defaultValue: PropTypes.any,
    valuePlaceholder: PropTypes.string,
    inputPlaceholder: PropTypes.string,
    invalid: PropTypes.bool,
    options: PropTypes.arrayOf(
        PropTypes.shape({
            value: PropTypes.oneOfType([PropTypes.array, PropTypes.string, PropTypes.number])
                .isRequired,
            label: PropTypes.string.isRequired,
        }),
    ).isRequired,
    onChange: PropTypes.func.isRequired,
    onCreate: PropTypes.func,
    withCreate: PropTypes.bool,
    withInput: PropTypes.bool,
    withOptions: PropTypes.bool,
    isMulti: PropTypes.bool,
    withClearValue: PropTypes.bool,
    renderValue: PropTypes.func,
    renderOption: PropTypes.func,
};

const defaultProps = {
    className: undefined,
    variant: 'normal',
    dropdownWidth: undefined,
    name: undefined,
    value: undefined,
    defaultValue: undefined,
    valuePlaceholder: 'Select',
    inputPlaceholder: 'Search',
    invalid: false,
    onCreate: undefined,
    withCreate: false,
    withInput: true,
    withOptions: true,
    isMulti: false,
    withClearValue: true,
    renderValue: undefined,
    renderOption: undefined,
};

const Select = ({
    className,
    variant,
    dropdownWidth,
    name,
    value: propsValue,
    defaultValue,
    valuePlaceholder,
    invalid,
    options: propsOptions,
    onChange,
    onCreate,
    withCreate,
    withInput,
    withOptions,
    isMulti,
    withClearValue,
    inputPlaceholder,
    renderValue: propsRenderValue,
    renderOption: propsRenderOption,
}) => {
    const [stateValue, setStateValue] = useState(defaultValue || (isMulti ? [] : null));
    const [options, setOptions] = useState(propsOptions);
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const [searchValue, setSearchValue] = useState('');

    const isControlled = propsValue !== undefined;
    const value = isControlled ? propsValue : stateValue;

    const $selectRef = useRef();

    const activateDropdown = () => {
        if (!isDropdownOpen) {
            setDropdownOpen(true);
        }
    };

    const deactivateDropdown = () => {
        setDropdownOpen(false);
        setSearchValue('');
        $selectRef.current.focus();
    };

    useOnOutsideClick($selectRef, isDropdownOpen, deactivateDropdown);

    const preserveValueType = newValue => {
        const areOptionValuesNumbers = options.some(option => typeof option.value === 'number');

        if (areOptionValuesNumbers) {
            if (isMulti) {
                return newValue.map(Number);
            }
            if (newValue) {
                return Number(newValue);
            }
        }
        return newValue;
    };

    const handleChange = newValue => {
        if (!isControlled) {
            setStateValue(preserveValueType(newValue));
        }
        onChange(preserveValueType(newValue));
    };

    const removeOptionValue = optionValue => {
        handleChange(value.filter(val => val !== optionValue));
    };

    const handleFocusedSelectKeydown = event => {
        if (isDropdownOpen) return;

        if (event.keyCode === keyCodes.ENTER) {
            event.preventDefault();
        }
        if (
            event.keyCode !== keyCodes.ESCAPE &&
            event.keyCode !== keyCodes.TAB &&
            !event.shiftKey
        ) {
            setDropdownOpen(true);
        }
    };

    const getOption = optionValue => options.find(option => option.value === optionValue);
    const getOptionLabel = optionValue => (getOption(optionValue) || { label: '' }).label;

    const isValueEmpty = isMulti ? !value.length : !getOption(value);
    const inputId = uniqueId('select-input-');

    const addMorePadding = () => (variant === 'empty' ? '0.3rem 0' : '0.3rem 0 0 0');

    const valuePlaceholderElement = isMulti ? (
        <AddMore
            htmlFor={inputId}
            variant={variant}
            placeholder={valuePlaceholder}
            padding={addMorePadding}
        />
    ) : (
        <S.Placeholder>{valuePlaceholder}</S.Placeholder>
    );

    return (
        <S.SelectContainer
            className={className}
            variant={variant}
            ref={$selectRef}
            tabIndex="0"
            onKeyDown={handleFocusedSelectKeydown}
            invalid={invalid}>
            <S.ValueContainer
                variant={variant}
                data-testid={name ? `select:${name}` : 'select'}
                onClick={activateDropdown}>
                {isValueEmpty && valuePlaceholderElement}
                {!isValueEmpty && !isMulti && propsRenderValue
                    ? propsRenderValue({ value })
                    : getOptionLabel(value)}
                {!isValueEmpty && isMulti && (
                    <S.ValueMulti variant={variant}>
                        {value.map(optionValue =>
                            propsRenderValue ? (
                                propsRenderValue({
                                    value: optionValue,
                                    removeOptionValue: () => removeOptionValue(optionValue),
                                })
                            ) : (
                                <S.ValueMultiItem
                                    key={optionValue}
                                    variant={variant}
                                    onClick={() => removeOptionValue(optionValue)}>
                                    {getOptionLabel(optionValue)}
                                    <S.RemoveIcon />
                                </S.ValueMultiItem>
                            ),
                        )}
                        <AddMore
                            htmlFor={inputId}
                            variant={variant}
                            placeholder="Add more"
                            padding={addMorePadding}
                        />
                    </S.ValueMulti>
                )}
                {(!isMulti || isValueEmpty) && variant !== 'empty' && <S.ArrowDownIcon />}
            </S.ValueContainer>
            {isDropdownOpen && (
                <Dropdown
                    dropdownWidth={dropdownWidth}
                    value={value}
                    isValueEmpty={isValueEmpty}
                    searchValue={searchValue}
                    setSearchValue={setSearchValue}
                    $selectRef={$selectRef}
                    deactivateDropdown={deactivateDropdown}
                    inputPlaceholder={inputPlaceholder}
                    options={options}
                    setOptions={setOptions}
                    onChange={handleChange}
                    onCreate={onCreate}
                    withCreate={withCreate}
                    withInput={withInput}
                    withOptions={withOptions}
                    isMulti={isMulti}
                    inputId={inputId}
                    withClearValue={withClearValue}
                    propsRenderOption={propsRenderOption}
                />
            )}
        </S.SelectContainer>
    );
};

Select.propTypes = propTypes;
Select.defaultProps = defaultProps;

export default Select;
