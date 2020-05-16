import styled, { css } from 'styled-components/macro';
import { CustomLink, Button } from 'shared/components';
import { mixins, media } from 'shared/styles';

export const LandingContent = styled.div`
    grid-column: 1 / 10;
    padding-right: 5rem;
    margin-top: 10rem;
    display: flex;
    flex-direction: column;

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
    margin-top: 8rem;
    border-radius: 50%;
    overflow: hidden;
    position: relative;
    width: 50rem;
    height: 50rem;

    ${media.bp1040`
        margin-top: 15rem;
        width: 38rem;
        height: 38rem;
    `}

    ${media.bp800`
        align-self:center;
        margin: 0 0 4rem 0;
        width: 50rem;
        height: 50rem;
    `}

    ${media.bp440`
        width: 40rem;
        height: 40rem;
    `}

    img {
        position: absolute;
        display: block;
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

export const ButtonsContainer = styled.div`
    ${media.bp800`
        ${mixins.flexCenter}
    `}
`;
