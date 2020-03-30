import styled from 'styled-components/macro';
import { baseButtonStyles } from 'shared/styles';
import { Link } from 'react-router-dom';

export const BaseLink = styled(Link)`
    ${baseButtonStyles};
`;
