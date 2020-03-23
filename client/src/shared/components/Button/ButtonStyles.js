import styled from 'styled-components/macro';
import { buttonStyles, buttonText } from 'shared/styles';
import { Spinner } from 'shared/components';

export const StyledSpinner = styled(Spinner)`
    position: relative;
    top: 1px;
`;

export const Text = styled.div`
    ${buttonText}
`;

export const StyledButton = styled.button`
    color: ${({ theme }) => theme.colors.greyDark1};
    ${buttonStyles};
`;
