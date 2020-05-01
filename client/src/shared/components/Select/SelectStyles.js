import styled, { css } from 'styled-components/macro';
import { IoIosClose, IoIosArrowDown } from 'react-icons/io';
import { RiDeleteBack2Line } from 'react-icons/ri';
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
    color: ${({ theme }) => theme.colors.textPrimary1};
    background-color: ${({ theme }) => theme.colors.background3};
`;

export const AddMore = styled.label`
    ${mixins.inlineFlexCenter};
    ${mixins.link}
    padding: 0.3rem 0;
    font-size: 1.2rem;
    ${({ variant }) => variant === 'empty' && 'margin-bottom: 0.3rem'};

    svg {
        margin-right: 0.3rem;
        vertical-align: middle;
        font-size: 1.6rem;
    }
`;

export const Dropdown = styled.div`
    z-index: ${({ theme }) => theme.zIndex.dropdown};
    position: absolute;
    top: 100%;
    left: 0;
    border-radius: ${({ theme }) =>
        `0 0 ${theme.layout.fieldBorderRadius} ${theme.layout.fieldBorderRadius}`};
    background-color: ${({ theme }) => theme.colors.fieldBackground};
    box-shadow: ${({ theme }) => theme.boxShadow.dropdown};
    width: ${({ width }) => width || '100%'};
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
    color: ${({ theme }) => theme.colors.textPrimary3};
`;

export const RemoveIcon = styled(IoIosClose)`
    margin-right: -0.3rem;
    font-size: 2rem;
`;

export const ClearIcon = styled(RiDeleteBack2Line)`
    position: absolute;
    top: 0.8rem;
    right: 0.8rem;
    font-size: 1.8rem;
    color: ${({ theme }) => theme.colors.textPrimary1};
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

    &.select-option-is-active {
        background-color: ${({ theme }) => theme.colors.activeBackground};
    }
`;

export const OptionsNoResults = styled.div`
    padding: 0.5rem 1.5rem 1.5rem;
    color: ${({ theme }) => theme.colors.textPrimary4};
`;
