import styled from 'styled-components/macro';
import { mixins } from 'shared/styles';

export const SectionContainer = styled.section`
    ${({ display }) => {
        switch (display) {
            case 'grid':
                return mixins.gridStyles;
            default:
                return mixins.flexStyles;
        }
    }}
    padding: ${({ padding }) => padding};
    width:100%;
`;
