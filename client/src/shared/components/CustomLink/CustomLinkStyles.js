import styled from 'styled-components/macro';
import { Link } from 'react-router-dom';
import { baseButtonStyles } from 'shared/components/Button/ButtonStyles';

export const BaseLink = styled(Link)`
    ${baseButtonStyles};
`;
