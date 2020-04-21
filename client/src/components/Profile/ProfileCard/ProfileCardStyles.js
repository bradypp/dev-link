import styled from 'styled-components/macro';
import { mixins, helpers } from 'shared/styles';

// TODO: move grid-column to a container for profile page (so it's separate )
export const StyledSection = styled.section`
    ${mixins.card}

    & > *:not(:first-child):not(:last-child) {
        border-bottom: solid 1px ${({ theme }) => theme.colors.border1};
        padding: 1.6rem 0;
    }

    & > *:last-child {
        padding: 1.6rem 0 0;
    }
`;

export const Header = styled.header`
    ${mixins.flexCenterBetween}
`;

export const Heading = styled.h2`
    font-size: 2.2rem;
    font-weight: 400;
    margin: 0;
`;

export const SubHeading = styled.h3`
    font-size: 1.6rem;
    font-style: italic;
    font-weight: 400;
    margin: 0;
`;
