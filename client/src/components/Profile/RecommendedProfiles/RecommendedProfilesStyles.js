import styled, { css } from 'styled-components/macro';
import Image from 'react-image';
import { mixins } from 'shared/styles';

export const RecommendedProfilesContainer = styled.section`
    h2 {
        font-size: 2rem;
        font-weight: 400;
        margin-bottom: 0.8rem;
    }
`;

export const RecommendedProfileContainer = styled.div`
    ${mixins.card}
    ${mixins.clickable}
    ${mixins.cardHover}
    display:flex;
    justify-content: flex-start;
    align-items: flex-start;
    margin: 0 0 0.5rem 0;
    padding: 1.2rem;
    border: 1px solid transparent;

    h3,
    p {
        margin-bottom: 0.3rem;
    }

    h3 {
        font-size: 1.6rem;
        font-weight: 500;
    }

    p {
        font-size: 1.4rem;
    }
`;

const avatarContainer = css`
    height: 5rem;
    width: 5rem;
    border-radius: 50%;
    margin-right: 1.4rem;
`;

export const AvatarContainer = styled.div`
    ${avatarContainer}
    position: relative;
    overflow: hidden;
    box-shadow: ${({ theme }) => theme.boxShadow.primary};
`;

export const Avatar = styled(Image)`
    ${avatarContainer}
`;
