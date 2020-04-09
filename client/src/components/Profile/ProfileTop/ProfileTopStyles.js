import styled, { css } from 'styled-components/macro';
import { IoMdEye, IoMdStarOutline, IoMdStar } from 'react-icons/io';
import Image from 'react-image';
import { Card, PrimaryButton } from 'shared/components';
import { mixins } from 'shared/styles';

export const ProfileTopContainer = styled(Card)`
    grid-column: 1 / 12;
    padding: 0;
`;

const coverImageHeight = 20.8;

export const CoverImageContainer = styled.div`
    height: ${coverImageHeight}rem;
`;

export const CoverImage = styled(Image)`
    max-height: 100%;
`;

const topCardPadding = 2.4;

export const ContentContainer = styled.div`
    ${mixins.flexBetween}
    width: 100%;
    align-items: flex-start;
    padding: ${topCardPadding}rem ${topCardPadding}rem 2rem;
    line-height: 1.3;
`;

export const AvatarContainer = styled.div`
    margin-top: -${coverImageHeight / 2 + topCardPadding}rem;
    height: 16rem;
    width: 16rem;
    box-shadow: ${({ theme }) => theme.boxShadow.card};
    border-radius: 50%;
    border: 5px solid #fff;
`;

export const Avatar = styled(Image)`
    border-radius: 50%;
`;

export const Name = styled.h1`
    font-size: 2.4rem;
    font-weight: 400;
    margin-top: 0.8rem;
`;

export const Headline = styled.h2`
    font-size: 1.8rem;
    font-weight: 400;
    margin-top: 0.8rem;
`;

export const TopSubHeading = styled.h3`
    font-size: 1.6rem;
    font-weight: 400;
    margin-top: 0.8rem;
`;

const sharedToggleContainerStyles = css`
    font-size: 1.3rem;
    height: 3rem;
    padding: 0 0.8rem;
    border: 1px solid ${({ theme }) => theme.colors.greyLight3};
    border-radius: 2px;
`;

export const ToggleButton = styled(PrimaryButton).attrs({ color: 'white1' })`
    ${sharedToggleContainerStyles}
    margin-left: 1.6rem;

    span {
        margin-top: 4px;
    }
`;

export const CountContainer = styled.div`
    ${mixins.inlineFlexCenter}
    ${sharedToggleContainerStyles}
    border-left: none;
    padding-top: 2px;
    font-size: 1.4rem;
`;

export const ToggleButtonsContainer = styled.div`
    ${mixins.flexCenter}
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
