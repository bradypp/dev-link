import styled from 'styled-components/macro';
import { mixins } from 'shared/styles';

const SimpleLink = styled.a`
    &:hover {
        ${mixins.linkHover}
    }
`;

export default SimpleLink;
