import styled from 'styled-components/macro';
import { buttonStyles } from 'shared/components/Button/ButtonStyles';
import CustomLinkWrapper from './CustomLinkWrapper';

// TODO: just import the switch from button styles
export const StyledLink = styled(CustomLinkWrapper)`
    ${buttonStyles};
`;
