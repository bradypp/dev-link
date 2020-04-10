import styled from 'styled-components/macro';
import { Link } from 'react-router-dom';
import { baseButtonStyles } from 'shared/styles';

export const CustomLinkWrapper = styled(Link)`
    ${baseButtonStyles};
`;
