import styled, { css } from 'styled-components/macro';
import { Form } from 'formik';
import { Divider, Button } from 'shared/components';
import { mixins } from 'shared/styles';

export const FormikForm = styled(Form)`
    width: 100%;
    & > *:not(:last-child) {
        margin-bottom: ${({ theme }) => theme.form.fieldGap};
    }

    && > h1,
    && > h2,
    && > h3 {
        margin-bottom: 0.8rem;
    }
`;

export const FlexContainer = styled.div`
    ${mixins.flexCenter};
    & > *:not(:first-child) {
        margin-left: ${({ theme }) => theme.form.fieldGap};
    }
`;

export const GridContainer = styled.div`
    margin: ${({ margin, gridGap }) => (margin || gridGap ? `0 0 ${gridGap}` : '0 0 1rem')};
    ${({ columnNumber, gridGap, columnWidth }) =>
        mixins.gridLayout(
            columnNumber || 2,
            gridGap || '1rem',
            columnWidth || 'minmax(min-content, 1fr)',
        )}
    ${({ gridColumns }) =>
        gridColumns &&
        css`
            grid-template-columns: ${gridColumns};
        `}
    ${({ gridRows }) =>
        gridRows &&
        css`
            grid-template-rows: ${gridRows};
        `}
`;

export const FieldContainer = styled.div`
    width: ${({ width }) => width || `100%`};

    ${({ margin }) =>
        margin &&
        css`
            margin: ${margin};
        `}
`;

export const FieldCollection = styled.div`
    & > *:not(:last-child) {
        margin-bottom: 1.6rem;
    }
`;

export const FieldLabel = styled.label`
    display: block;
    padding-bottom: 0.6rem;
    color: ${({ theme }) => theme.colors.textPrimary1};
    font-size: 1.3rem;
    font-weight: 500;
    width: max-content;
`;

const fieldSubtitle = css`
    font-size: 1.2rem;
    line-height: 1;
    font-weight: 400;
`;

export const FieldTip = styled.div`
  ${fieldSubtitle}
  padding: ${({ tipLocation }) => (tipLocation === 'below' ? '0.6rem 0 0' : '0 0 1rem')};
  color: ${({ theme }) => theme.colors.textPrimary2};
  `;

export const FieldError = styled.div`
    ${fieldSubtitle}
    padding-top: 0.6rem;
    color: ${({ theme }) => theme.colors.danger};
`;

export const ButtonsContainer = styled.div`
    display: flex;
    justify-content: ${({ align }) =>
        (align === 'left' && 'flex-start') ||
        (align === 'center' && 'center') ||
        (align === 'right' && 'flex-end')};
    align-items: center;

    & > *:not(:last-child) {
        margin-right: ${({ theme }) => theme.layout.buttonGap};
    }
`;

export const HorizontalDivider = styled(Divider).attrs(({ margin, theme }) => ({
    margin: margin || `0 0 ${theme.form.fieldGap}`,
    borderAlign: 'horizontal',
}))``;

export const VerticalDivider = styled(Divider).attrs(({ margin, theme }) => ({
    margin: margin || `0 0 0 ${theme.form.fieldGap}`,
    borderAlign: 'vertical',
}))``;

export const DeleteButton = styled(Button)`
    align-self: start;
    justify-self: center;

    svg {
        font-size: 1.6rem;
    }
`;
