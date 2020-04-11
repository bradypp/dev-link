import styled from 'styled-components/macro';
import { gridStyles, flexStyles } from 'shared/styles';

export const SectionContainer = styled.section`
    ${({ display }) => {
        switch (display) {
            case 'grid':
                return gridStyles;
            default:
                return flexStyles;
        }
    }}
    padding: ${({ padding }) => padding};
    width:100%;
`;
