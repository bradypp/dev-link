import styled, { css } from 'styled-components/macro';
import { Tag } from 'shared/components';
import Image from 'react-image';
import { mixins } from 'shared/styles';

export const ProfilesItemContainer = styled.div`
    ${mixins.card}
    ${mixins.flexCenterLeft}
    ${mixins.clickable}
    margin: 0.6rem 0 0.8rem 0;

    `;

const avatarContainer = css`
    height: 12rem;
    width: 12rem;
    border-radius: 50%;
`;

export const ContentContainer = styled.div`
    margin: 0 2.4rem 0 2rem;
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

export const SkillsContainer = styled.div`
    flex: 1;
    margin-right: 2.4rem;
    & > * {
        margin: ${({ theme }) => `0 ${theme.layout.tagGap} ${theme.layout.tagGap} 0`};
    }
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

export const EndContainer = styled.div``;

export const WatchersStarsContainer = styled.div`
    ${mixins.tag}
`;
