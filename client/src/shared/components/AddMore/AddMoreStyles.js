import styled from 'styled-components/macro';
import { mixins } from 'shared/styles';

export const AddMoreContainer = styled.label`
    ${mixins.inlineFlexCenter};
    ${mixins.link}
    font-size: 1.2rem;

    svg {
        margin-right: 0.3rem;
        vertical-align: middle;
        font-size: 1.6rem;
    }
`;
