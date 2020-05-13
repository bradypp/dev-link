import styled, { css } from 'styled-components/macro';
import Image from 'react-image';
import { mixins } from 'shared/styles';

export const ProfilesItemContainer = styled.div`
    ${mixins.card}
    ${mixins.flexCenterLeft}
    ${mixins.clickable}
    margin: 0.5rem 0;

    h2,
    h3,
    p {
        margin-bottom: 0.4rem;
    }

    h2 {
        font-size: 1.8rem;
        font-weight: 500;
    }

    h3 {
        font-weight: 400;
        font-size: 1.6rem;
    }
`;

const avatarContainer = css`
    height: 12rem;
    width: 12rem;
    border-radius: 50%;
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