import styled, { css } from 'styled-components/macro';
import Image from 'react-image';
import { CustomLink, Button } from 'shared/components';
import { mixins } from 'shared/styles';

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
    padding: ${({ theme }) => theme.layout.cardPadding};
    line-height: 1.3;
    width: 100%;
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
`;
const avatarContainer = css`
    height: ${({ theme }) => theme.layout.avatarWidth};
    width: ${({ theme }) => theme.layout.avatarWidth};
    border-radius: 50%;
`;

export const AvatarContainer = styled.div`
    ${avatarContainer}
    position: relative;
    overflow: hidden;
    box-shadow: ${({ theme }) => theme.boxShadow.primary};
    border: 5px solid #fff;
    margin: -14rem 0 0.8rem;
`;

export const Avatar = styled(Image)`
    ${avatarContainer}
`;

export const AvatarUploadContainer = styled.div`
    ${avatarContainer}
    position: absolute;
`;

/* TODO: link styles (make bolder & grey background on hover?), make global button variant? */
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
    flex-direction: column;
    justify-content: space-between;
    flex: 1;

    & > * :not(:last-child) {
        margin-bottom: 1rem;
    }
`;

// TODO: Have a round icon only button that changes color/background color on hover & click?
// TODO: if keeping border, change outline color to match hover background color
export const ToggleButtonsContainer = styled.div`
    ${mixins.flexCenterRight}
    margin-bottom:auto;

    & > button :not(:first-child) {
        margin-left: 1.4rem;
    }
`;

const sharedToggleButtonStyles = css`
    font-size: 1.3rem;
    height: 3rem;
    padding: 0 0.8rem;
    border: 1px solid ${({ theme }) => theme.colors.border2};
`;

export const ToggleButton = styled(Button)`
    ${sharedToggleButtonStyles};
    border-top-right-radius: 0px;
    border-bottom-right-radius: 0px;

    &:hover {
        border: 1px solid ${({ theme }) => mixins.darken(theme.colors.border2, 0.1)};
    }

    svg {
        font-size: 1.6em;
    }
`;

export const CountContainer = styled.div`
    ${mixins.inlineFlexCenter};
    ${sharedToggleButtonStyles};
    border-left: none;
    font-size: 1.4rem;
    border-top-left-radius: 0px;
    border-bottom-left-radius: 0px;
`;

export const SkillsContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    flex-wrap: wrap-reverse;
`;

export const SkillLink = styled(CustomLink)`
    font-size: 1.3rem;
    margin-top: 0.8rem;
    margin-left: ${({ theme }) => theme.layout.tagGap};
`;
