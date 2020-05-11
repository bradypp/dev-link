import styled, { css } from 'styled-components/macro';
import { IoIosArrowDown, IoIosClose } from 'react-icons/io';
import { mixins } from 'shared/styles';

export const SelectContainer = styled.div`
    position: relative;
    cursor: pointer;
    width: 100%;
    border-radius: ${({ theme }) => theme.form.fieldBorderRadius};
    font-size: ${({ theme }) => theme.form.fontSize};
    ${({ variant }) => variant === 'empty' && 'display: inline-block'};
    ${mixins.fieldInvalid}

    ${({ variant, disabled, theme }) =>
        variant === 'normal' &&
        disabled !== true &&
        css`
            border: 1px solid ${theme.colors.border1};
            background-color: ${theme.colors.fieldBackground};
            ${mixins.fieldFocus};
        `}
`;

export const ValueContainer = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    ${({ variant }) =>
        variant === 'normal' &&
        css`
            min-height: 3.2rem;
            padding: 0.5rem 0.5rem 0.5rem 1rem;
        `}
`;

export const Placeholder = styled.div`
    color: ${({ theme }) => theme.colors.textPrimary4};
`;

export const ValueMulti = styled.div`
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    ${({ variant }) =>
        ({ variant } === 'normal' &&
        css`
            padding-top: 0.5rem;
        `)}
`;

export const ValueMultiItem = styled.div`
    display: inline-flex;
    align-items: center;
    height: 2.4rem;
    padding: 0 0.8rem;
    border-radius: 0.4rem;
    cursor: pointer;
    user-select: none;
    font-weight: 500;
    font-size: 1.2rem;
    color: ${({ theme }) => theme.colors.textPrimary1};
    background-color: ${({ theme }) => theme.colors.background3};
    ${({ variant }) => variant === 'empty' && 'margin: 0 0.5rem 0.5rem 0'};

    &:hover {
        background-color: ${({ theme }) => mixins.darken(theme.colors.background3)};
    }

    svg {
        margin-right: -0.3rem;
        font-size: 2rem;
    }
`;

export const AddMoreContainer = styled.div`
    padding: ${({ variant }) => (variant === 'empty' ? '0.4rem 0 0.3rem' : '0.3rem 0 0 0')};
`;

export const Dropdown = styled.div`
    z-index: ${({ theme }) => theme.zIndex.dropdown};
    position: absolute;
    top: 100%;
    left: 0;
    border-radius: ${({ theme }) =>
        `0 0 ${theme.form.fieldBorderRadius} ${theme.form.fieldBorderRadius}`};
    background-color: ${({ theme }) => theme.colors.fieldBackground};
    box-shadow: ${({ theme }) => theme.boxShadow.dropdown};
    width: ${({ width }) => width || '100%'};
    overflow: hidden;
    ${({ variant }) =>
        variant === 'empty' &&
        css`
            margin: 0.8rem 0 0;
        `}
`;

export const DropdownInput = styled.input`
    padding: 1rem 1.4rem 0.8rem;
    width: 100%;
    border: none;
    color: ${({ theme }) => theme.colors.fieldText};
    background: none;
    &:focus {
        outline: none;
    }
`;

export const ArrowDownIcon = styled(IoIosArrowDown)`
    margin-left: auto;
`;

export const ClearIcon = styled(IoIosClose)`
    position: absolute;
    top: 0.8rem;
    right: 0.8rem;
    font-size: 2.2rem;
    color: ${({ theme }) => theme.colors.textPrimary2};
    ${mixins.clickable}
`;

export const Options = styled.div`
    max-height: 20rem;
    ${mixins.scrollableY};
    ${mixins.customScrollbar()};
`;

export const Option = styled.div`
    padding: 0.8rem 1.4rem;
    word-break: break-word;
    cursor: pointer;

    &:last-of-type {
        border-radius: ${({ theme }) =>
            `0 0 ${theme.form.fieldBorderRadius} ${theme.form.fieldBorderRadius}`};
    }

    &.select-option-is-active {
        background-color: ${({ theme }) => theme.colors.activeBackground};
    }
`;

export const OptionsNoResults = styled.div`
    padding: 0.5rem 1.5rem 1.5rem;
    color: ${({ theme }) => theme.colors.textPrimary4};
`;
