import styled, { css } from 'styled-components/macro';
import Image from 'react-image';
import { mixins } from 'shared/styles';
import { Card } from 'shared/components';

const sharedCardStyles = css`
    grid-column: 1 / 12;
`;

export const TopCardContainer = styled(Card)`
    ${sharedCardStyles};
    padding: 0;
`;

export const CardContainer = styled(Card)`
    ${sharedCardStyles};
`;

const coverImageHeight = 20.4;
export const CoverImageContainer = styled.div`
    height: ${coverImageHeight}rem;
`;

export const CoverImage = styled(Image)`
    max-height: 100%;
`;

export const TopCardContentContainer = styled.div`
    display: flex;
    padding: 2.4rem;
`;

export const AvatarContainer = styled.div`
    margin-top: -${coverImageHeight / 2 + 2.4}rem;
    height: 16rem;
    width: 16rem;
    ${mixins.boxShadowPrimary};
    border-radius: 50%;
    border: 5px solid #fff;
`;

export const Avatar = styled(Image)`
    border-radius: 50%;
    width: 16rem;
`;

export const Name = styled.h1`
    font-size: 2.4rem;
    font-weight: 700;
`;

export const Headline = styled.h2`
    font-size: 2rem;
    font-weight: 400;
`;

export const Location = styled.h3`
    font-size: 1.6rem;
    font-weight: 400;
`;
