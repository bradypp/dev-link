import styled, { css } from 'styled-components/macro';
import { CustomLink, Button } from 'shared/components';
import { media } from 'shared/styles';

const marginTop = 10;

export const LandingContent = styled.div`
    grid-column: 1 / 10;
    padding-right: 5rem;
    margin-top: ${marginTop}rem;

    h1 {
        font-size: 6rem;
        font-weight: 300;
        margin: 0 0 3rem 0;
        color: ${({ theme }) => theme.colors.primaryDarker};
    }

    p {
        font-size: 2rem;
        color: ${({ theme }) => theme.colors.primaryDarker};
        opacity: 0.9;
        font-weight: 300;
        margin-bottom: 4rem;
    }

    ${media.bp800`
        grid-column: 1 / -1;
        padding:0;
        margin:0;
    `}
`;

export const LandingImageContainer = styled.div`
    grid-column: 10 / -1;
    margin-top: ${marginTop - 2}rem;
    border-radius: 50%;
    overflow: hidden;
    position: relative;
    width: 50rem;
    height: 50rem;

    ${media.bp800`
        display:none;
    `}

    img {
        position: absolute;
        display: block;
        width: 50rem;
        height: 50rem;
        object-fit: cover;
    }
`;

const buttonStyles = css`
    padding: 0 2rem;
    height: 4.2rem;
    font-size: 1.6rem;
    font-weight: 500;
    border-radius: 3rem;
`;

export const StyledLink = styled(CustomLink)`
    ${buttonStyles}
    &:first-of-type {
        margin-right: 2.4rem;
    }
`;

export const StyledButton = styled(Button)`
    ${buttonStyles}
`;
