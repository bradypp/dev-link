import styled, { css } from 'styled-components';
import { IoIosClose, IoIosArrowDown } from 'react-icons/io';
import { mixins } from 'shared/styles';

export const SelectContainer = styled.div`
    position: relative;
    border-radius: 0.4rem;
    cursor: pointer;
    font-size: 1.4rem;
    width: 100%;
    ${({ variant }) => variant === 'empty' && 'display: inline-block'};
    ${mixins.fieldInvalid}

    ${({ variant, disabled, theme }) =>
        variant === 'normal' &&
        disabled !== true &&
        css`
            border: 0.1rem solid ${theme.colors.border1};
            background-color: ${theme.colors.background1};
            transition: all 0.1s;
            ${mixins.fieldHover};
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
    ${({ variant }) => variant === 'empty' && 'margin: 0 0.5rem 0.5rem 0'};
    ${mixins.tag}
`;

export const AddMore = styled.div`
    display: inline-block;
    padding: 0.3rem 0;
    font-size: 1.2rem;
    ${({ variant }) => variant === 'empty' && 'margin-bottom: 0.3rem'};
    ${mixins.link}

    svg {
        margin-right: 0.3rem;
        vertical-align: middle;
        font-size: 1.4rem;
    }
`;

export const Dropdown = styled.div`
    z-index: ${({ theme }) => theme.zIndex.dropdown};
    position: absolute;
    top: 100%;
    left: 0;
    border-radius: 0 0 0.4rem 0.4rem;
    background: ${({ theme }) => theme.colors.background1};
    box-shadow: ${({ theme }) => theme.boxShadow.dropdown};
    width: ${({ width }) => width || '100%'};
`;

export const DropdownInput = styled.input`
    padding: 1rem 1.4rem 0.8rem;
    width: 100%;
    border: none;
    color: ${({ theme }) => theme.colors.textPrimary1};
    background: none;
    &:focus {
        outline: none;
    }
`;

export const ArrowDownIcon = styled(IoIosArrowDown)`
    margin-left: auto;
    color: ${({ theme }) => theme.colors.textPrimary3};
`;

export const RemoveIcon = styled(IoIosClose)`
    margin-right: -0.3rem;
    font-size: 2rem;
`;

export const ClearIcon = styled(IoIosClose)`
    position: absolute;
    top: 0.4rem;
    right: 0.7rem;
    padding: 0.5rem;
    font-size: 1.8rem;
    color: ${({ theme }) => theme.colors.textPrimary3};
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

    /* &:last-of-type {
        margin-bottom: 0.8rem;
    } */

    &.select-option-is-active {
        background: ${({ theme }) => theme.colors.activeBackground};
    }
`;

export const OptionsNoResults = styled.div`
    padding: 0.5rem 1.5rem 1.5rem;
    color: ${({ theme }) => theme.colors.textPrimary4};
`;
