import styled from 'styled-components/macro';
import { CustomLink } from 'shared/components';

const marginTop = 10;

export const LandingContent = styled.div`
    grid-column: 1 / 10;
    padding-right: 5rem;

    h1 {
        font-size: 6rem;
        font-weight: 300;
        margin: ${marginTop}rem 0 3rem 0;
        color: ${({ theme }) => theme.colors.primaryDarker};
    }

    p {
        font-size: 2rem;
        color: ${({ theme }) => theme.colors.primaryDarker};
        opacity: 0.9;
        font-weight: 300;
        margin-bottom: 4rem;
    }
`;

export const LandingImageContainer = styled.div`
    grid-column: 10 / -1;
    margin-top: ${marginTop - 2}rem;
    border-radius: 50%;
    overflow: hidden;
    position: relative;
    width: 50rem;
    height: 50rem;

    img {
        position: absolute;
        display: block;
        width: 50rem;
        height: 50rem;
        border-radius: 50%;
        object-fit: cover;
    }
`;

export const StyledLink = styled(CustomLink)`
    padding: 2rem;
    font-size: 1.6rem;
    font-weight: 500;
    border-radius: 3rem;

    &:first-of-type {
        margin-right: 2.4rem;
    }
`;
