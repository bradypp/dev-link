import styled, { css } from 'styled-components/macro';
import { Form } from 'formik';
import { mixins } from 'shared/styles';

const fieldMargin = '2rem';

export const FormikForm = styled(Form)`
    & > *:not(:last-child) {
        margin-bottom: ${fieldMargin};
    }
`;

export const FieldContainer = styled.div``;

export const FieldLabel = styled.label`
    display: block;
    padding-bottom: 0.6rem;
    color: ${({ theme }) => theme.colors.textPrimary2};
    font-size: 1.3rem;
    font-weight: 500;
    width: max-content;
`;

const sharedSubtitleStyles = css`
    padding-top: 0.6rem;
    font-size: 1.2rem;
    line-height: 1;
    font-weight: 400;
`;

export const FieldTip = styled.div`
  ${sharedSubtitleStyles}
  color: ${({ theme }) => theme.colors.textPrimary2};
  `;

export const FieldError = styled.div`
  ${sharedSubtitleStyles}
  color: ${({ theme }) => theme.colors.danger};
`;

export const ButtonsContainer = styled.div`
    ${mixins.flexCenterLeft}
    margin-top: ${fieldMargin};

    & > *:not(:last-child) {
      margin-right: ${({ theme }) => theme.layout.buttonGap}
    }
`;
