import styled, { css } from 'styled-components/macro';
import Image from 'react-image';
import { Card } from 'shared/components';

const sharedCardStyles = css`
    grid-column: 1 / 12;
`;

export const TopCardContainer = styled(Card)`
    ${sharedCardStyles};
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

export const TopCardContentContainer = styled.div`
    display: flex;
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

export const SectionHeading = styled.h2`
    font-size: 2rem;
    font-weight: 400;
`;

export const SectionSubHeading = styled.h3`
    font-size: 1.6rem;
    font-weight: 400;
`;

export const CardContainer = styled(Card)`
    ${sharedCardStyles};
`;
