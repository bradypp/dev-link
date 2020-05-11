import React, { useState, useRef, useLayoutEffect } from 'react';
import PropTypes from 'prop-types';
import { uniq } from 'lodash';
import { keyCodes } from 'shared/constants';
import * as S from './SelectStyles';

const propTypes = {
    dropdownWidth: PropTypes.string,
    value: PropTypes.any,
    searchValue: PropTypes.string.isRequired,
    setSearchValue: PropTypes.func.isRequired,
    deactivateDropdown: PropTypes.func.isRequired,
    inputPlaceholder: PropTypes.string.isRequired,
    options: PropTypes.array.isRequired,
    setOptions: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    onCreate: PropTypes.func,
    withCreate: PropTypes.bool.isRequired,
    inputId: PropTypes.string.isRequired,
    withInput: PropTypes.bool.isRequired,
    withOptions: PropTypes.bool.isRequired,
    isMulti: PropTypes.bool.isRequired,
    propsRenderOption: PropTypes.func,
    removeSelected: PropTypes.bool.isRequired,
};

const defaultProps = {
    dropdownWidth: undefined,
    value: undefined,
    onCreate: undefined,
    propsRenderOption: undefined,
};

const SelectDropdown = ({
    dropdownWidth,
    value,
    searchValue,
    setSearchValue,
    deactivateDropdown,
    inputPlaceholder,
    options,
    onChange,
    onCreate,
    withCreate,
    withInput,
    inputId,
    isMulti,
    propsRenderOption,
    setOptions,
    withOptions,
    removeSelected,
}) => {
    const [isCreatingOption, setCreatingOption] = useState(false);
    const $optionsRef = useRef();
    const $inputRef = useRef();
    const activeOptionClass = 'select-option-is-active';

    useLayoutEffect(() => {
        const setFirstOptionAsActive = () => {
            const $active = getActiveOptionNode();
            if ($active) $active.classList.remove(activeOptionClass);

            if ($optionsRef.current.firstElementChild) {
                $optionsRef.current.firstElementChild.classList.add(activeOptionClass);
            }
        };
        setFirstOptionAsActive();
    });

    const selectOptionValue = optionValue => {
        deactivateDropdown();
        if (isMulti) {
            onChange(uniq([...value, optionValue]));
        } else {
            onChange(optionValue);
        }
    };

    const createOption = newOptionLabel => {
        setCreatingOption(true);
        if (onCreate) {
            onCreate(newOptionLabel, createdOptionValue => {
                setCreatingOption(false);
                selectOptionValue(createdOptionValue);
            });
        } else {
            setOptions([...options, { label: newOptionLabel, value: newOptionLabel }]);
            setCreatingOption(false);
            selectOptionValue(newOptionLabel);
        }
    };

    const clearOptionValues = () => {
        $inputRef.current.value = '';
        $inputRef.current.focus();
        setSearchValue('');
    };

    const handleInputKeyDown = event => {
        if (event.keyCode === keyCodes.ESCAPE) {
            handleInputEscapeKeyDown(event);
        } else if (event.keyCode === keyCodes.ENTER) {
            handleInputEnterKeyDown(event);
        } else if (event.keyCode === keyCodes.ARROW_DOWN || event.keyCode === keyCodes.ARROW_UP) {
            handleInputArrowUpOrDownKeyDown(event);
        }
    };

    const handleInputEscapeKeyDown = event => {
        event.nativeEvent.stopImmediatePropagation();
        deactivateDropdown();
    };

    const handleInputEnterKeyDown = event => {
        event.preventDefault();

        const $active = getActiveOptionNode();
        if (!$active) return;

        const optionValueToSelect = $active.getAttribute('data-select-option-value');
        const optionLabelToCreate = $active.getAttribute('data-create-option-label');

        if (optionValueToSelect) {
            selectOptionValue(optionValueToSelect);
        } else if (optionLabelToCreate) {
            createOption(optionLabelToCreate);
        }
    };

    const handleInputArrowUpOrDownKeyDown = event => {
        const $active = getActiveOptionNode();
        if (!$active) return;

        const $options = $optionsRef.current;
        const $optionsHeight = $options.getBoundingClientRect().height;
        const $activeHeight = $active.getBoundingClientRect().height;

        if (event.keyCode === keyCodes.ARROW_DOWN) {
            if ($options.lastElementChild === $active) {
                $active.classList.remove(activeOptionClass);
                $options.firstElementChild.classList.add(activeOptionClass);
                $options.scrollTop = 0;
            } else {
                $active.classList.remove(activeOptionClass);
                $active.nextElementSibling.classList.add(activeOptionClass);
                if ($active.offsetTop > $options.scrollTop + $optionsHeight / 1.4) {
                    $options.scrollTop += $activeHeight;
                }
            }
        } else if (event.keyCode === keyCodes.ARROW_UP) {
            if ($options.firstElementChild === $active) {
                $active.classList.remove(activeOptionClass);
                $options.lastElementChild.classList.add(activeOptionClass);
                $options.scrollTop = $options.scrollHeight;
            } else {
                $active.classList.remove(activeOptionClass);
                $active.previousElementSibling.classList.add(activeOptionClass);
                if ($active.offsetTop < $options.scrollTop + $optionsHeight / 2.4) {
                    $options.scrollTop -= $activeHeight;
                }
            }
        }
    };

    const handleOptionMouseEnter = event => {
        const $active = getActiveOptionNode();
        if ($active) $active.classList.remove(activeOptionClass);
        event.currentTarget.classList.add(activeOptionClass);
    };

    const getActiveOptionNode = () => $optionsRef.current.querySelector(`.${activeOptionClass}`);

    const optionsFilteredBySearchValue = options.filter(option =>
        option.label
            .toString()
            .toLowerCase()
            .includes(searchValue.toLowerCase()),
    );

    const removeSelectedOptionsMulti = opts => opts.filter(option => !value.includes(option.value));
    const removeSelectedOptionsSingle = opts => opts.filter(option => value !== option.value);

    const renderedOptions = removeSelected
        ? isMulti
            ? removeSelectedOptionsMulti(optionsFilteredBySearchValue)
            : removeSelectedOptionsSingle(optionsFilteredBySearchValue)
        : optionsFilteredBySearchValue;

    const isSearchValueInOptions = options.map(option => option.label).includes(searchValue);
    const isOptionCreatable = withCreate && searchValue && !isSearchValueInOptions;

    return (
        <S.Dropdown width={dropdownWidth}>
            {withInput && (
                <S.DropdownInput
                    id={inputId}
                    type="text"
                    placeholder={inputPlaceholder}
                    ref={$inputRef}
                    autoFocus
                    onKeyDown={handleInputKeyDown}
                    onChange={event => setSearchValue(event.target.value)}
                />
            )}
            {searchValue && withInput && <S.ClearIcon onClick={clearOptionValues} />}
            <S.Options ref={$optionsRef}>
                {withOptions &&
                    renderedOptions.map(option => (
                        <S.Option
                            key={option.value}
                            data-select-option-value={option.value}
                            data-testid={`select-option:${option.label}`}
                            onMouseEnter={handleOptionMouseEnter}
                            onClick={() => selectOptionValue(option.value)}>
                            {propsRenderOption ? propsRenderOption(option) : option.label}
                        </S.Option>
                    ))}
                {isOptionCreatable && (
                    <S.Option
                        data-create-option-label={searchValue}
                        onMouseEnter={handleOptionMouseEnter}
                        onClick={() => createOption(searchValue)}>
                        {isCreatingOption ? `Adding "${searchValue}"...` : `Add "${searchValue}"`}
                    </S.Option>
                )}
            </S.Options>
            {withOptions && renderedOptions.length === 0 && (
                <S.OptionsNoResults>No options</S.OptionsNoResults>
            )}
        </S.Dropdown>
    );
};

SelectDropdown.propTypes = propTypes;
SelectDropdown.defaultProps = defaultProps;

export default SelectDropdown;
