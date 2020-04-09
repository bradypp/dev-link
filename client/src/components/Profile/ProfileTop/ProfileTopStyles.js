import styled from 'styled-components/macro';
import Image from 'react-image';
import { Card, Button } from 'shared/components';

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

export const ContentContainerLeft = styled.div`
    display: inline-block;
    width: 50%;
    padding: ${topCardPadding}rem 0 2rem ${topCardPadding}rem;
    line-height: 1.3;
`;

export const ContentContainerRight = styled.div`
    display: inline-block;
    float: right;
    width: 50%;
    padding: ${topCardPadding}rem ${topCardPadding}rem 2rem 0;
    line-height: 1.3;
    text-align: right;
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

// TODO: Styling
export const ToggleButton = styled(Button)`
    ${'' /* font-size: 1.4rem;
    height: 3rem;
    padding: 0 1rem;
    border: 1px solid ${({ theme }) => theme.colors.greyDark1};
    margin-left: 1rem; */}
    .starIcon {
        margin-bottom: 3px;
    }
    .watchIcon {
        margin-bottom: 1px;
    }
    .watchIcon--watching {
        margin-bottom: 0px;
    }
`;
