import styled from 'styled-components/macro';
import { baseButtonStyles } from 'shared/styles';
import { Spinner } from 'shared/components';

export const StyledSpinner = styled(Spinner)`
    position: relative;
    top: 1px;
`;
export const BaseButton = styled.button`
    color: ${({ theme }) => theme.colors.greyDark1};
    ${baseButtonStyles};
`;
