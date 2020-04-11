import styled from 'styled-components/macro';
import { Link } from 'react-router-dom';
import { sharedButtonStyles } from 'shared/styles';

export const StyledLink = styled(Link)`
    ${sharedButtonStyles};
`;
