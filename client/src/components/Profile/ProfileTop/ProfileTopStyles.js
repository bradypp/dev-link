import styled, { css } from 'styled-components/macro';
import { IoMdEye, IoMdStarOutline, IoMdStar } from 'react-icons/io';
import Image from 'react-image';
import { Button, Flex } from 'shared/components';
import { mixins } from 'shared/styles';

const coverImageHeight = 20;

export const CoverImageContainer = styled.div`
    height: ${coverImageHeight}rem;
`;

export const CoverImage = styled(Image)`
    max-height: 100%;
`;

const topCardPadding = 2.4;

export const ContentContainer = styled(Flex).attrs({
    justifyContent: `flex-between`,
    alignItems: 'flex-start',
    padding: `${topCardPadding}rem`,
})`
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
    padding-top: 0.8rem;
`;

export const Headline = styled.h2`
    font-size: 1.8rem;
    font-weight: 400;
    padding-top: 0.8rem;
`;

export const TopSubHeading = styled.h3`
    font-size: 1.6rem;
    font-weight: 400;
    padding-top: 0.8rem;
`;

export const ContentRightContainer = styled(Flex).attrs({
    flexDirection: 'column',
    justifyContent: `flex-start`,
    alignItems: 'flex-end',
})`
    height: 100%;

    & > * :not(:last-child) {
        margin-bottom: 1rem;
    }
`;

export const ButtonsContainer = styled(Flex).attrs({
    justifyContent: 'flex-end',
})`
    & > button :not(:first-child) {
        margin-left: 1.4rem;
    }
`;

const sharedToggleButtonStyles = css`
    font-size: 1.3rem;
    height: 3rem;
    padding: 0 0.8rem;
    border: 1px solid ${({ theme }) => theme.colors.greyLight3};
`;

// TODO: Have a round icon only button that changes color/background color on hover & click?
export const ToggleButton = styled(Button).attrs({
    color: 'white2',
    lightenDarkenPercentage: 0.05,
})`
    ${sharedToggleButtonStyles}
    color: ${({ theme }) => theme.colors.textPrimary1};
    border-top-right-radius: 0px;
    border-bottom-right-radius: 0px;
    
    &:hover {
        border: 1px solid ${({ theme }) => mixins.darken(theme.colors.greyLight3, 0.1)};
    }
`;

export const CountContainer = styled.div`
    ${mixins.inlineFlexCenter}
    ${sharedToggleButtonStyles}
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
