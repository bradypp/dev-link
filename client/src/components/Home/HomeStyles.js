import styled, { css } from 'styled-components/macro';
import { CustomLink, Button, Tag } from 'shared/components';
import { mixins, media } from 'shared/styles';

export const LandingContent = styled.div`
    ${mixins.flexCenter}
    grid-column: 1 / -1;
    padding: 2rem 0 10rem;
    height: 100%;

    ${media.bp800`
        flex-direction: column;
    `}

    ${media.bp440`
        padding: 0 0 4rem;
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
        margin-bottom: 4rem;
        align-items: center;
    `}

    ${media.bp440`
        width: 45rem;
        height: 45rem;
        min-width: 45rem;
        min-height: 45rem;
    `}

    ${media.bp384`
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
    align-self: stretch;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-direction: column;
    margin-right: 5rem;

    ${media.bp800`
        align-items: center;
        margin-right: 0;
    `}

    h1 {
        font-size: 6rem;
        font-weight: 300;
        margin-bottom: 6rem;
        color: ${({ theme }) => theme.colors.primaryDarker};

        ${media.bp800`
            font-size: 5rem;
        `}

        ${media.bp440`
            margin-bottom: 2.4rem;
        `}
    }

    p {
        font-size: 2rem;
        color: ${({ theme }) => theme.colors.primaryDarker};
        opacity: 0.9;
        font-weight: 300;
        margin-bottom: 6rem;

        ${media.bp440`
            margin-bottom: 2.4rem;
        `}
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

    ${media.bp800`
        height: 5rem;
        padding: 0 4rem;
    `}

    ${media.bp384`
        height: 4.6rem;
        padding: 0 3rem;
    `}
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

export const PopularSearchesContainer = styled.div`
    grid-column: 1 / -1;

    h2 {
        font-weight: 400;
        margin-bottom: 2rem;
        color: ${({ theme }) => theme.colors.primaryDarker};
    }
`;

export const PopularSearchesTag = styled(Tag)`
    height: 3rem;
    padding: 0 1.2rem;
    font-size: 1.5rem;
    margin: 0 1.2rem 1.2rem 0;
`;
