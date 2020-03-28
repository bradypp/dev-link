import styled from 'styled-components/macro';
import { baseButtonStyles } from 'shared/styles';
import { Spinner } from 'shared/components';

export const StyledSpinner = styled(Spinner).attrs({
    overlayActive: false,
    variant: 'button',
    size: '1.8rem',
})`
    position: absolute;
`;
export const BaseButton = styled.button`
    color: ${({ theme }) => theme.colors.greyDark1};
    ${baseButtonStyles};
`;
