import styled, { css } from 'styled-components';

export const FieldContainer = styled.div`
    margin-top: 2rem;
`;

export const FieldLabel = styled.label`
    display: block;
    padding-bottom: 0.6rem;
    color: ${({ theme }) => theme.colors.textPrimary2};
    font-size: 1.3rem;
`;

const sharedSubtitleStyles = css`
    padding-top: 0.6rem;
    font-size: 1.2rem;
    line-height: 1;
`;

export const FieldTip = styled.div`
  ${sharedSubtitleStyles}
  color: ${({ theme }) => theme.colors.textPrimary2};
  `;

export const FieldError = styled.div`
  ${sharedSubtitleStyles}
  color: ${({ theme }) => theme.colors.danger};
`;
