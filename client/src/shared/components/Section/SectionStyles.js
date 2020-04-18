import styled from 'styled-components/macro';
import { mixins } from 'shared/styles';

export const SectionContainer = styled.section`
    display: ${({ display }) => {
        switch (display) {
            case 'grid':
                return mixins.gridStyles;
            default:
                return mixins.flexStyles;
        }
    }};
    padding: 2.4rem;
    width: 100%;

    header {
        ${mixins.flexBetween}
    }
`;
