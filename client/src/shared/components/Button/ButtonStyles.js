import styled, { css } from 'styled-components/macro';
import { baseButtonStyles, primaryButtonStyles, borderedButtonStyles } from 'shared/styles';
import { Spinner } from 'shared/components';

export const StyledSpinner = styled(Spinner)`
    position: relative;
    top: 1px;
`;

const sharedButtonStyles = css`
    color: ${({ theme }) => theme.colors.greyDark1};
`;

export const BaseButton = styled.button`
    ${sharedButtonStyles}
    ${baseButtonStyles};
`;

export const PrimaryButton = styled.button`
    ${sharedButtonStyles}
    ${baseButtonStyles};
    ${primaryButtonStyles};
`;

export const BorderedButton = styled.button`
    ${sharedButtonStyles}
    ${baseButtonStyles};
    ${borderedButtonStyles};
`;
