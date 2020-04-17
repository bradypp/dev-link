import styled, { css } from 'styled-components/macro';
import { IoMdEye, IoMdStarOutline, IoMdStar } from 'react-icons/io';
import Image from 'react-image';
import { Button, CustomLink } from 'shared/components';
import { helpers, mixins } from 'shared/styles';

const coverImageHeight = 18;

export const CoverImageContainer = styled.div`
    height: ${coverImageHeight}rem;
    overflow: hidden;
`;

export const CoverImage = styled(Image)`
    width-height: 100%;
`;

const topCardPadding = 2.4;

export const ContentContainer = styled.div`
    display: flex;
    justify-content: flex-between;
    align-items: flex-start;
    padding: ${topCardPadding}rem;
    width: 100%;
    line-height: 1.3;
`;

export const AvatarContainer = styled.div`
    margin-top: -14rem;
    height: 16rem;
    width: 16rem;
    box-shadow: ${({ theme }) => theme.boxShadow.primary};
    border-radius: 50%;
    border: 5px solid #fff;
`;

export const Avatar = styled(Image)`
    border-radius: 50%;
`;

const lineMargin = '0.8rem';

export const Name = styled.h1`
    font-size: 2.4rem;
    font-weight: 400;
    margin-top: ${lineMargin};
`;

export const Headline = styled.h2`
    font-size: 1.8rem;
    font-weight: 400;
    margin-top: ${lineMargin};
`;

export const TopSubHeading = styled.h3`
    font-size: 1.6rem;
    font-weight: 400;
    margin-top: ${lineMargin};
`;

// TODO: link styles (make bolder & grey background on hover?), make global button variant?
export const ContactSocialContainer = styled.div`
    display: flex;
    justify-content: 'flex-start';
    height: max-content;
    margin-top: ${lineMargin};

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
    align-items: 'flex-end';
    height: 100%;
    width: 100%;

    & > * :not(:last-child) {
        margin-bottom: 1rem;
    }
`;

export const ButtonsContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    & > button :not(:first-child) {
        margin-left: 1.4rem;
    }
`;

const sharedWatchStarStyles = css`
    font-size: 1.3rem;
    height: 3rem;
    padding: 0 0.8rem;
    border: 1px solid ${({ theme }) => theme.colors.border2};
`;

// TODO: Have a round icon only button that changes color/background color on hover & click?
// TODO: if keeping border, change outline color to match hover background color
export const ToggleButton = styled(Button)`
    ${sharedWatchStarStyles}
    border-top-right-radius: 0px;
    border-bottom-right-radius: 0px;

    &:hover {
        border: 1px solid ${({ theme }) => helpers.darken(theme.colors.border2, 0.1)};
    }
`;

export const CountContainer = styled.div`
    ${mixins.inlineFlexCenter}
    ${sharedWatchStarStyles}
    border-left: none;
    font-size: 1.4rem;
    border-top-left-radius: 0px;
    border-bottom-left-radius: 0px;
`;

export const StarIcon = styled(IoMdStarOutline)`
    font-size: 1.6em;
    margin-bottom: 2px;
`;

export const StarredIcon = styled(IoMdStar)`
    font-size: 1.6em;
    margin-bottom: 2px;
`;

export const WatchIcon = styled(IoMdEye)`
    font-size: 1.6em;
`;

export const SkillsLink = styled(CustomLink)`
    border-radius: 50px;
    font-size: 1.3rem;
    padding: 0 1rem;
    height: 2.8rem;
    margin-top: 0.8rem;
    margin-left: 0.8rem;
`;
