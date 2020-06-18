import styled, { css } from 'styled-components/macro';
import Image from 'react-image';
import { Tag, Button } from 'shared/components';
import { mixins, media } from 'shared/styles';

export const ProfileTopCard = styled.section`
    ${mixins.card}
    padding: 0;
`;
const coverImageContainer = css`
    border-radius: 0.3rem 0.3rem 0 0;
    height: 20rem;
    width: 100%;
    overflow: hidden;

    ${({ isCurrentUser }) => isCurrentUser && css``}
`;

export const CoverImageContainer = styled.div`
    position: relative;
    ${coverImageContainer}
`;

export const CoverImageUploadContainer = styled.div`
    position: absolute;
    ${coverImageContainer}
`;

export const ContentContainer = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 0 ${({ theme }) => theme.layout.cardPadding} ${({ theme }) => theme.layout.cardPadding};
    line-height: 1.3;
    width: 100%;
`;

export const ContentTopContainer = styled.div`
    display: flex;
    justify-content: space-between;
    margin: -11rem 0 0.8rem;
    padding: 0 ${({ theme }) => theme.layout.cardPadding};

    ${media.bp600`
            margin: -10rem 0 0.8rem;
    `}
`;

export const ContentLeftContainer = styled.div`
    flex: 1;

    h1 {
        font-size: 2.2rem;
        font-weight: 400;
        margin-bottom: 0.8rem;
    }

    h2 {
        font-size: 1.8rem;
    }

    h2,
    h3 {
        font-weight: 400;
        margin-bottom: 0.8rem;
    }

    h3:last-of-type {
        margin-bottom: 1.2rem;
    }
`;

const avatarContainer = css`
    height: ${({ theme }) => theme.layout.avatarWidth};
    width: ${({ theme }) => theme.layout.avatarWidth};
    border-radius: 50%;

    ${media.bp600`
        height: 14rem;
        width: 14rem;
    `}
    ${media.bp440`
        height: 13rem;
        width: 13rem;
        min-width: 13rem;
    `}
    ${media.bp384`
        height: 12rem;
        width: 12rem;
        min-width: 12rem;
    `}
`;

export const AvatarContainer = styled.div`
    ${avatarContainer}
    position: relative;
    overflow: hidden;
    box-shadow: ${({ theme }) => theme.boxShadow.primary};
`;

export const Avatar = styled(Image)`
    border: 5px solid #fff;
    min-height: 100%;
    min-width: 100%;
    border-radius: 50%;
    position: absolute;
    z-index: 1;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;

export const AvatarUploadContainer = styled.div`
    ${avatarContainer}
    position: absolute;
    z-index: 2;
`;

export const InfoButtonsContainer = styled.div`
    display: flex;
    justify-content: flex-start;
    align-content: center;

    & > * :not(:first-child) {
        margin-left: 0.4rem;
    }

    & > * :not(:last-child) {
        margin-right: 0.4rem;
    }
`;

export const ContentRightContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    flex: 1;
`;

export const ToggleButtonsContainer = styled.div`
    ${mixins.flexCenterRight}
    align-self:flex-end;

    button {
        margin-left: 1.6rem;

        ${media.bp440`
            margin-left: 1.2rem;
            padding:0 0.5rem;
        `}
        ${media.bp384`
            margin-left: 0.8rem;
            padding:0 0.3rem;
        `}
    }
`;

const sharedToggleButtonStyles = css`
    font-size: 1.3rem;
    font-weight: 500;
    height: 3rem;
    padding: 0 0.8rem;
    border: 1px solid ${({ theme }) => theme.colors.border2};
`;

export const ToggleButton = styled(Button).attrs({ variant: 'no-styles' })`
    ${sharedToggleButtonStyles};
    border-top-right-radius: 0px;
    border-bottom-right-radius: 0px;
    border-top-left-radius: 0.3rem;
    border-bottom-left-radius: 0.3rem;
    background-image: ${({ theme }) =>
        `linear-gradient(-180deg, ${mixins.darken(theme.colors.white1, 0.01)}, ${mixins.darken(
            theme.colors.white2,
            0.02,
            4,
        )} 90%)`};

    &:hover {
        border: 1px solid ${({ theme }) => mixins.darken(theme.colors.border2, 0.02)};
        background-image: ${({ theme }) =>
            `linear-gradient(-180deg, ${mixins.darken(theme.colors.white1, 0.02)}, ${mixins.darken(
                theme.colors.white2,
                0.04,
            )} 90%)`};
    }

    svg {
        font-size: 1.6em;
    }
`;

export const CountContainer = styled.div`
    ${mixins.inlineFlexCenter};
    ${sharedToggleButtonStyles};
    border-left: none;
    font-size: 1.2rem;
    border-top-left-radius: 0px;
    border-bottom-left-radius: 0px;
    border-top-right-radius: 0.3rem;
    border-bottom-right-radius: 0.3rem;
`;

export const SkillsContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    flex-wrap: wrap-reverse;
    margin-top: auto;
`;

export const SkillLink = styled(Tag)`
    margin: ${({ theme }) => `${theme.layout.tagGap} 0 0 ${theme.layout.tagGap}`};
`;
