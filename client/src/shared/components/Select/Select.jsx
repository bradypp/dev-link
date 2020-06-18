import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import { useOnOutsideClick } from 'shared/hooks';
import { keyCodes } from 'shared/constants';
import { uniqueId } from 'lodash';
import { IoIosClose } from 'react-icons/io';
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
    renderValue: PropTypes.func,
    renderOption: PropTypes.func,
    removeSelected: PropTypes.bool,
    id: PropTypes.string,
    renderValuePlaceholder: PropTypes.bool,
    allowNonExistentOptions: PropTypes.bool,
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
    renderValue: undefined,
    renderOption: undefined,
    removeSelected: true,
    id: undefined,
    renderValuePlaceholder: undefined,
    allowNonExistentOptions: false,
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
    inputPlaceholder,
    renderValue: propsRenderValue,
    renderOption: propsRenderOption,
    removeSelected,
    id: propsId,
    renderValuePlaceholder,
    allowNonExistentOptions,
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

    useEffect(() => {
        if (propsOptions.length > 0) {
            setOptions(propsOptions);
        }
    }, [propsOptions]);
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
    const inputId = propsId || uniqueId('select-input-');

    const valuePlaceholderElement = isMulti ? (
        <S.AddMoreContainer variant={variant}>
            <AddMore htmlFor={inputId} placeholder={valuePlaceholder} />
        </S.AddMoreContainer>
    ) : (
        <S.Placeholder renderValuePlaceholder={renderValuePlaceholder}>
            {valuePlaceholder}
        </S.Placeholder>
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
                {(isValueEmpty || renderValuePlaceholder) && valuePlaceholderElement}
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
                                    key={uuidv4()}
                                    variant={variant}
                                    onClick={() => removeOptionValue(optionValue)}>
                                    {!allowNonExistentOptions
                                        ? getOptionLabel(optionValue)
                                        : optionValue}
                                    <IoIosClose />
                                </S.ValueMultiItem>
                            ),
                        )}
                        <S.AddMoreContainer variant={variant}>
                            <AddMore htmlFor={inputId} placeholder={valuePlaceholder} />
                        </S.AddMoreContainer>
                    </S.ValueMulti>
                )}
                {(!isMulti || isValueEmpty) && variant !== 'empty' && <S.ArrowDownIcon />}
            </S.ValueContainer>
            {isDropdownOpen && (
                <Dropdown
                    dropdownWidth={dropdownWidth}
                    value={value}
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
                    propsRenderOption={propsRenderOption}
                    removeSelected={removeSelected}
                />
            )}
        </S.SelectContainer>
    );
};

Select.propTypes = propTypes;
Select.defaultProps = defaultProps;

export default Select;
