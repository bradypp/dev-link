import styled, { css } from 'styled-components/macro';
import { CustomLink, Button } from 'shared/components';
import { mixins, media } from 'shared/styles';

export const LandingContent = styled.div`
    grid-column: 1 / -1;
    ${mixins.flexCenter}
    margin-top: 4rem;

    ${media.bp800`
        margin-top: 2rem;
        flex-direction: column;
    `}
`;

export const LandingImageContainer = styled.div`
    border-radius: 50%;
    overflow: hidden;
    position: relative;
    width: 50rem;
    height: 50rem;
    min-width: 50rem;
    min-height: 50rem;

    ${media.bp1040`
        width: 38rem;
        height: 38rem;
        min-width: 38rem;
        min-height: 38rem;
    `}

    ${media.bp800`
        width: 50rem;
        height: 50rem;
        min-width: 50rem;
        min-height: 50rem;
        margin-bottom: 2rem;
        align-items: center;
    `}

    ${media.bp440`
        width: 40rem;
        height: 40rem;
        min-width: 40rem;
        min-height: 40rem;
    `}

    img {
        position: absolute;
        display: block;
        object-fit: cover;
    }
`;

export const ContentLeft = styled.div`
    height: 100%;
    display: flex;
    justify-content: space-around;
    align-items: flex-start;
    flex-direction: column;
    margin-right: 5rem;

    ${media.bp800`
        align-items: center;
    `}

    h1 {
        font-size: 6rem;
        font-weight: 300;
        margin-bottom: 2rem;
        color: ${({ theme }) => theme.colors.primaryDarker};

        ${media.bp800`
            font-size: 5rem;
        `}
    }

    p {
        font-size: 2rem;
        color: ${({ theme }) => theme.colors.primaryDarker};
        opacity: 0.9;
        font-weight: 300;
        margin-bottom: 2rem;
    }
`;

const buttonStyles = css`
    padding: 0 2.4rem;
    height: 4.6rem;
    font-size: 1.6rem;
    font-weight: 500;
    border-radius: 3rem;

    span {
        width: max-content;
    }
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
