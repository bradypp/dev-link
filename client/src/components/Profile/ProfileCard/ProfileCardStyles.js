import styled from 'styled-components/macro';
import { mixins } from 'shared/styles';

// TODO: move grid-column to a container for profile page (so it's separate )
export const StyledSection = styled.section`
    ${mixins.card}

    h3 {
        font-size: 1.6rem;
    }
`;

// TODO: move grid-column to a container for profile page (so it's separate )
export const Header = styled.header`
    ${mixins.flexCenterBetween}
    margin-bottom: 1.6rem;
`;

// TODO: move grid-column to a container for profile page (so it's separate )
export const Heading = styled.h2`
    font-size: 2.2rem;
    font-weight: 400;
    margin: 0;
`;
// TODO: move grid-column to a container for profile page (so it's separate )
export const SubHeading = styled.h3`
    font-size: 1.6rem;
    font-style: italic;
    font-weight: 400;
    margin: 0;
`;
