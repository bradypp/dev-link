import styled from 'styled-components/macro';
import { Form } from 'formik';
import { mixins } from 'shared/styles';

export const FormikForm = styled(Form)`
    & > *:not(:last-child) {
        margin-bottom: 2rem;
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
    ${({ numberOfColumns, gridGap, columnWidth }) =>
        mixins.gridLayout(
            numberOfColumns || 2,
            gridGap || '2rem',
            columnWidth || 'minmax(min-content, 1fr)',
        )}
`;

export const FieldContainer = styled.div`
    width: ${({ width }) => width || `100%`};
`;

export const FieldLabel = styled.label`
    display: block;
    padding-bottom: 0.6rem;
    color: ${({ theme }) => theme.colors.textPrimary1};
    font-size: 1.3rem;
    font-weight: 500;
    width: max-content;
`;

export const FieldTip = styled.div`
  ${mixins.fieldSubtitle}
  color: ${({ theme }) => theme.colors.textPrimary2};
  `;

export const FieldError = styled.div`
  ${mixins.fieldSubtitle}
  color: ${({ theme }) => theme.colors.danger};
`;

export const ButtonsContainer = styled.div`
    ${mixins.flexCenterLeft}

    & > *:not(:last-child) {
        margin-right: ${({ theme }) => theme.layout.buttonGap};
    }
`;
