import styled, { css } from 'styled-components/macro';
import { CustomLink, Button, Tag } from 'shared/components';
import { mixins, media } from 'shared/styles';

export const LandingContent = styled.div`
    ${mixins.flexCenter}
    grid-column: 1 / -1;
    padding: 4rem 0 12rem;
    height: 100%;

    ${media.bp1040`
        padding: 4rem 0 10rem;
    `}

    ${media.bp1040`
        padding: 4rem 0 14rem;
    `}

    ${media.bp600`
        padding: 3rem 0 15rem;
    `}

    ${media.bp440`
        padding: 3rem 0 10rem;
    `}
`;
export const BackgroundImageContainer = styled.div`
    ${mixins.engulf}
    object-fit: cover;
    height: 100vh;
    clip-path: polygon(0% 0%, 100% 0%, 100% 68rem, 0% 68rem);
    overflow: hidden;

    ${media.bp1040`
    clip-path: polygon(0% 0%, 100% 0%, 100% 60rem, 0% 60rem);
    `}
`;
export const BackgroundImage = styled.div`
    ${mixins.engulf}
    object-fit: cover;
    background-image: radial-gradient(
            circle at 17% 77%,
            rgba(17, 17, 17, 0.04) 0%,
            rgba(17, 17, 17, 0.04) 50%,
            rgba(197, 197, 197, 0.04) 50%,
            rgba(197, 197, 197, 0.04) 100%
        ),
        radial-gradient(
            circle at 26% 17%,
            rgba(64, 64, 64, 0.04) 0%,
            rgba(64, 64, 64, 0.04) 50%,
            rgba(244, 244, 244, 0.04) 50%,
            rgba(244, 244, 244, 0.04) 100%
        ),
        radial-gradient(
            circle at 44% 60%,
            rgba(177, 177, 177, 0.04) 0%,
            rgba(177, 177, 177, 0.04) 50%,
            rgba(187, 187, 187, 0.04) 50%,
            rgba(187, 187, 187, 0.04) 100%
        ),
        linear-gradient(19deg, rgb(28, 117, 250), rgb(4, 33, 190));
`;
export const LandingImageContainer = styled.div`
    border-radius: 50%;
    overflow: hidden;
    position: relative;
    width: 46rem;
    height: 46rem;
    min-width: 46rem;
    min-height: 46rem;
    z-index: 2;
    box-shadow: ${({ theme }) => theme.boxShadow.medium};
    transition: opacity 1s ease 300ms;
    opacity: ${({ isMounted }) => (isMounted ? 1 : 0)};
    

    ${media.bp1040`
        width: 36rem;
        height: 36rem;
        min-width: 36rem;
        min-height: 36rem;
    `}

    ${media.bp800`
        width: 28rem;
        height: 28rem;
        min-width: 28rem;
        min-height: 28rem;
    `}

    ${media.bp600`
        display:none;
    `}

    img {
        ${mixins.engulf};
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
    z-index: 2;
    transition: all 1s ease 100ms;
    opacity: ${({ isMounted }) => (isMounted ? 1 : 0)};
    transform: ${({ isMounted }) => (isMounted ? 'translateX(0)' : 'translateX(-50px)')};

    ${media.bp600`
        margin-right: 0;
    `}

    h1 {
        font-size: 5.6rem;
        font-weight: 600;
        margin-bottom: 4.5rem;
        color: ${({ theme }) => theme.colors.white1};
        line-height: 1.3;

        ${media.bp800`
            font-size: 4.8rem;
        `}
    }

    p {
        font-size: 1.8rem;
        color: ${({ theme }) => theme.colors.white1};
        opacity: 0.9;
        font-weight: 300;
        margin-bottom: 6rem;
        line-height: 1.5;
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

    ${media.bp600`
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
    margin-bottom: 1rem;
    ${media.bp800`
        ${mixins.flexCenter}
    `}
`;
export const GuestSignIn = styled(CustomLink).attrs({ variant: 'no-styles' })`
    color: white;

    &:hover {
        text-decoration: underline;
    }
`;
export const PopularSearchesContainer = styled.div`
    grid-column: 1 / -1;
    z-index: 2;
    transition: all 0.8s ease 500ms;
    opacity: ${({ isMounted }) => (isMounted ? 1 : 0)};
    transform: ${({ isMounted }) => (isMounted ? 'translateY(0)' : 'translateY(20px)')};

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
